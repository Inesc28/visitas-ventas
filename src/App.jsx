import React, { useState, useEffect, useMemo } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import initialData from "../Data/data.json";
import { OPCIONES_ESTATUS } from "./constants/estatusOptions";
import { Header } from "./components/Header";
import { LugarCard } from "./components/LugarCard";
import { EstadisticasView } from "./components/EstadisticasView";
import { AgregarLugarModal } from "./components/AgregarLugarModal";
import { CargaMasivaModal } from "./components/CargaMasivaModal";
import { Buscador } from "./components/Buscador";

const App = () => {
  const [vista, setVista] = useState("tarjetas");
  const [lugares, setLugares] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCargaMasivaOpen, setIsCargaMasivaOpen] = useState(false);
  
  const [filtroZona, setFiltroZona] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const docRef = doc(db, "promotoras_app", "general");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && Array.isArray(data.items)) {
            setLugares(data.items);
          } else {
            await setDoc(docRef, { items: initialData });
            setLugares(initialData);
          }
        } else {
          await setDoc(docRef, { items: initialData });
          setLugares(initialData);
        }
      } catch (error) {
        console.error("Error al cargar:", error);
        alert(`Error al conectar con Firestore: ${error.message}`);
        setLugares(initialData);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const zonasUnicas = useMemo(() => {
    return [...new Set(lugares.map(l => l.zona).filter(Boolean))].sort();
  }, [lugares]);

  const actualizarEnNube = async (nuevosLugares) => {
    setLugares(nuevosLugares);
    try {
      const docRef = doc(db, "promotoras_app", "general");
      await setDoc(docRef, { items: nuevosLugares });
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleAgregarLugar = (datosNuevoLugar) => {
    const nuevoId = lugares.length > 0 ? Math.max(...lugares.map((l) => Number(l.id) || 0)) + 1 : 1;
    actualizarEnNube([{ id: nuevoId, ...datosNuevoLugar }, ...lugares]);
  };

  const handleImportarMasivo = (listaNuevos) => {
    let ultimoId = lugares.length > 0 ? Math.max(...lugares.map((l) => Number(l.id) || 0)) : 0;
    const nuevosFormateados = listaNuevos.map((item) => {
      ultimoId += 1;
      return {
        id: ultimoId,
        lugar: item.lugar,
        encargado: item.encargado || "",
        promotora: item.promotora || "",
        estatus: item.estatus || "",
        zona: item.zona || "",
        tipo: item.tipo || "",
        direccionCompleta: item.direccionCompleta || "",
        latitud: item.latitud || null,
        longitud: item.longitud || null
      };
    });
    actualizarEnNube([...nuevosFormateados, ...lugares]);
  };

  const handleBorrarLugar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este lugar?")) {
      actualizarEnNube(lugares.filter((lugar) => String(lugar.id) !== String(id)));
    }
  };

  const handleEstatusSelect = (id, nuevoEstatus) => {
    actualizarEnNube(lugares.map(l => String(l.id) === String(id) ? { ...l, estatus: l.estatus === nuevoEstatus ? "" : nuevoEstatus } : l));
  };

  const handlePromotoraChange = (id, nombre) => {
    actualizarEnNube(lugares.map(l => String(l.id) === String(id) ? { ...l, promotora: nombre } : l));
  };

  const handleEncargadoChange = (id, nombre) => {
    actualizarEnNube(lugares.map(l => String(l.id) === String(id) ? { ...l, encargado: nombre } : l));
  };

  const handleZonaChange = (id, valor) => {
    actualizarEnNube(lugares.map(l => String(l.id) === String(id) ? { ...l, zona: valor } : l));
  };

  const handleTipoChange = (id, valor) => {
    actualizarEnNube(lugares.map(l => String(l.id) === String(id) ? { ...l, tipo: valor } : l));
  };

  // 👈 NUEVO: Manejador para actualizar ubicación de Geoapify desde la tarjeta
  const handleUbicacionExactaChange = (id, datosUbicacion) => {
    if (!datosUbicacion) return;
    actualizarEnNube(
      lugares.map((l) =>
        String(l.id) === String(id)
          ? {
              ...l,
              latitud: datosUbicacion.latitud,
              longitud: datosUbicacion.longitud,
              direccionCompleta: datosUbicacion.direccionCompleta,
              zona: datosUbicacion.zona || l.zona
            }
          : l
      )
    );
  };

  const lugaresFiltrados = lugares.filter((item) => {
    const query = busqueda.toLowerCase().trim();
    const matchBusqueda = !query || 
      item.lugar?.toLowerCase().includes(query) ||
      item.encargado?.toLowerCase().includes(query) ||
      item.promotora?.toLowerCase().includes(query) ||
      item.direccionCompleta?.toLowerCase().includes(query);

    const matchZona = filtroZona ? item.zona === filtroZona : true;

    return matchBusqueda && matchZona;
  });

  if (cargando) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">Cargando...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased p-4 sm:p-8 border-t-2 border-red-600">
      <div className="max-w-4xl mx-auto space-y-6">
        <Header vistaActual={vista} onCambiarVista={setVista} total={lugares.length} gestionados={lugares.filter(l => l.estatus).length} />

        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-slate-900/80 backdrop-blur-md p-3 px-4 rounded-2xl border border-slate-800/80 shadow-lg shadow-black/40">
          <div className="flex flex-col sm:flex-row gap-2 flex-grow">
            <div className="flex-grow min-w-[200px]">
              <Buscador busqueda={busqueda} onBusquedaChange={setBusqueda} />
            </div>
            
            <div className="flex gap-2">
              <select value={filtroZona} onChange={(e) => setFiltroZona(e.target.value)} className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-red-600 cursor-pointer">
                <option value="">📍 Todas las Zonas</option>
                {zonasUnicas.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsCargaMasivaOpen(true)} className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700">
              Carga Masiva
            </button>
            <button onClick={() => setIsModalOpen(true)} className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl">
              + Agregar
            </button>
          </div>
        </div>

        <main>
          {vista === "tarjetas" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lugaresFiltrados.map((item) => (
                <LugarCard
                  key={item.id}
                  item={item}
                  opcionesEstatus={OPCIONES_ESTATUS}
                  onEstatusChange={handleEstatusSelect}
                  onPromotoraChange={handlePromotoraChange}
                  onEncargadoChange={handleEncargadoChange}
                  onBorrarLugar={handleBorrarLugar}
                  onZonaChange={handleZonaChange}
                  onTipoChange={handleTipoChange}
                  onUbicacionExactaChange={handleUbicacionExactaChange} 
                />
              ))}
            </div>
          ) : (
            <EstadisticasView lugares={lugares} />
          )}
        </main>
      </div>

      <AgregarLugarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAgregar={handleAgregarLugar} />
      <CargaMasivaModal isOpen={isCargaMasivaOpen} onClose={() => setIsCargaMasivaOpen(false)} onImportarMasivo={handleImportarMasivo} />
    </div>
  );
};

export default App;
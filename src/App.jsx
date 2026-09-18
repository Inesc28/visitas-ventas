import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import initialData from "../Data/data.json";
import { OPCIONES_ESTATUS } from "./constants/estatusOptions";
import { Header } from "./components/Header";
import { LugarCard } from "./components/LugarCard";
import { EstadisticasView } from "./components/EstadisticasView";
import { AgregarLugarModal } from "./components/AgregarLugarModal";

const App = () => {
  const [vista, setVista] = useState("tarjetas");
  const [lugares, setLugares] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const docRef = doc(db, "promotoras_app", "general");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && Array.isArray(data.items) && data.items.length > 0) {
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

  const actualizarEnNube = async (nuevosLugares) => {
    setLugares(nuevosLugares);

    try {
      const docRef = doc(db, "promotoras_app", "general");
      await setDoc(docRef, { items: nuevosLugares });
      console.log(" Guardado con éxito en Firestore");
    } catch (error) {
      console.error(" Error al guardar:", error);
      alert(`⚠️ Error al guardar en la nube:\n\n${error.message}`);
    }
  };

  const handleAgregarLugar = (datosNuevoLugar) => {
    const nuevoId =
      lugares.length > 0
        ? Math.max(...lugares.map((l) => Number(l.id) || 0)) + 1
        : 1;

    const nuevoLugar = {
      id: nuevoId,
      ...datosNuevoLugar,
    };

    const listaActualizada = [nuevoLugar, ...lugares];
    actualizarEnNube(listaActualizada);
  };

  const handleEstatusSelect = (id, nuevoEstatus) => {
    const nuevos = lugares.map((lugar) => {
      if (lugar.id === id) {
        const estatusFinal = lugar.estatus === nuevoEstatus ? "" : nuevoEstatus;
        return { ...lugar, estatus: estatusFinal };
      }
      return lugar;
    });
    actualizarEnNube(nuevos);
  };

  const handlePromotoraChange = (id, nombre) => {
    const nuevos = lugares.map((lugar) =>
      lugar.id === id ? { ...lugar, promotora: nombre } : lugar
    );
    actualizarEnNube(nuevos);
  };

  const handleEncargadoChange = (id, nombre) => {
    const nuevos = lugares.map((lugar) =>
      lugar.id === id ? { ...lugar, encargado: nombre } : lugar
    );
    actualizarEnNube(nuevos);
  };

  const gestionadosCount = lugares.filter((l) => l.estatus).length;

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300 text-sm font-semibold">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></span>
          Cargando datos desde Firestore...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased p-4 sm:p-8 border-t-2 border-red-600">
      <div className="max-w-4xl mx-auto space-y-6">
        <Header
          vistaActual={vista}
          onCambiarVista={setVista}
          total={lugares.length}
          gestionados={gestionadosCount}
        />

        <div className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-3 px-4 rounded-2xl border border-slate-800/80 shadow-lg shadow-black/40">
          <span className="text-xs font-semibold text-slate-400">
            {lugares.length} establecimientos en lista
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-xl transition-all cursor-pointer shadow-md shadow-red-950/50 flex items-center gap-1.5 border border-red-500/30"
          >
            <span className="text-sm font-bold leading-none">+</span>
            <span>Agregar Lugar</span>
          </button>
        </div>

        <main>
          {vista === "tarjetas" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lugares.map((item) => (
                <LugarCard
                  key={item.id}
                  item={item}
                  opcionesEstatus={OPCIONES_ESTATUS}
                  onEstatusChange={handleEstatusSelect}
                  onPromotoraChange={handlePromotoraChange}
                  onEncargadoChange={handleEncargadoChange}
                />
              ))}
            </div>
          ) : (
            <EstadisticasView lugares={lugares} />
          )}
        </main>
      </div>

      <AgregarLugarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAgregar={handleAgregarLugar}
      />
    </div>
  );
};

export default App;
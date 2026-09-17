import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
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

  const docRef = doc(db, "promotoras_app", "general");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setLugares(docSnap.data().items || []);
        } else {
          setDoc(docRef, { items: initialData });
          setLugares(initialData);
        }
        setCargando(false);
      },
      (error) => {
        console.error("Error en Firebase:", error);
        setCargando(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const actualizarEnNube = async (nuevosLugares) => {
    setLugares(nuevosLugares); 
    try {
      await setDoc(docRef, { items: nuevosLugares });
    } catch (error) {
      console.error("Error al actualizar la nube:", error);
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
      <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-600 text-sm font-semibold">
        Cargando datos en tiempo real...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-50/40 to-slate-200/80 text-slate-800 antialiased p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Header
          vistaActual={vista}
          onCambiarVista={setVista}
          total={lugares.length}
          gestionados={gestionadosCount}
        />

        <div className="flex justify-between items-center bg-white/70 backdrop-blur-md p-3 px-4 rounded-2xl border border-white/90 shadow-2xs">
          <span className="text-xs font-semibold text-slate-600">
            {lugares.length} establecimientos en lista
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
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
import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import initialData from "../Data/data.json";
import { OPCIONES_ESTATUS } from "./constants/estatusOptions";
import { Header } from "./components/Header";
import { LugarCard } from "./components/LugarCard";
import { EstadisticasView } from "./components/EstadisticasView";

const App = () => {
  const [vista, setVista] = useState("tarjetas");
  const [lugares, setLugares] = useState([]);
  const [cargando, setCargando] = useState(true);

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
    </div>
  );
};

export default App;
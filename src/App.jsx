import React, { useState, useEffect } from "react";
import initialData from "../Data/data.json";
import { OPCIONES_ESTATUS } from "./constants/estatusOptions";
import { Header } from "./components/Header";
import { LugarCard } from "./components/LugarCard";
import { EstadisticasView } from "./components/EstadisticasView";

const STORAGE_KEY = "promotoras_lugares_v2";

const App = () => {
  const [vista, setVista] = useState("tarjetas");

  const [lugares, setLugares] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lugares));
  }, [lugares]);

  const handleEstatusSelect = (id, nuevoEstatus) => {
    setLugares((prev) =>
      prev.map((lugar) => {
        if (lugar.id === id) {
          const estatusFinal =
            lugar.estatus === nuevoEstatus ? "" : nuevoEstatus;
          return { ...lugar, estatus: estatusFinal };
        }
        return lugar;
      }),
    );
  };

  const handlePromotoraChange = (id, nombre) => {
    setLugares((prev) =>
      prev.map((lugar) =>
        lugar.id === id ? { ...lugar, promotora: nombre } : lugar,
      ),
    );
  };

  const handleEncargadoChange = (id, nombre) => {
    setLugares((prev) =>
      prev.map((lugar) =>
        lugar.id === id ? { ...lugar, encargado: nombre } : lugar,
      ),
    );
  };

  const gestionadosCount = lugares.filter((l) => l.estatus).length;

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

import React, { useState, useEffect } from 'react';
import initialData from '../Data/data.json';
import { OPCIONES_ESTATUS } from './constants/estatusOptions';
import { Header } from './components/Header';
import { LugarCard } from './components/LugarCard';

const App = () => {
  const [lugares, setLugares] = useState(() => {
    const savedData = localStorage.getItem('promotoras_lugares_data');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('promotoras_lugares_data', JSON.stringify(lugares));
  }, [lugares]);

  const handleEstatusSelect = (id, nuevoEstatus) => {
    setLugares(prev => prev.map(lugar => {
      if (lugar.id === id) {
        const estatusFinal = lugar.estatus === nuevoEstatus ? "" : nuevoEstatus;
        return { ...lugar, estatus: estatusFinal };
      }
      return lugar;
    }));
  };

  const handlePromotoraChange = (id, nombre) => {
    setLugares(prev => prev.map(lugar => 
      lugar.id === id ? { ...lugar, promotora: nombre } : lugar
    ));
  };

  const descargarJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(lugares, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `reporte_promotoras_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const gestionadosCount = lugares.filter(l => l.estatus).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200/80 text-slate-800 antialiased p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Header 
          total={lugares.length} 
          gestionados={gestionadosCount} 
          onDescargar={descargarJSON} 
        />

        <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lugares.map((item) => (
            <LugarCard
              key={item.id}
              item={item}
              opcionesEstatus={OPCIONES_ESTATUS}
              onEstatusChange={handleEstatusSelect}
              onPromotoraChange={handlePromotoraChange}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default App;
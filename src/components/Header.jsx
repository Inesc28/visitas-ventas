import React from 'react';

export const Header = ({ total, gestionados, onDescargar }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-white/75 backdrop-blur-md border border-white/80 rounded-2xl shadow-sm shadow-slate-200/50">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
          Lista de Establecimientos a Visitar
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          <span className="font-semibold text-indigo-600">{gestionados}</span> de {total} establecimientos gestionados
        </p>
      </div>

      <button
        onClick={onDescargar}
        className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 rounded-xl shadow-xs transition-all active:scale-98 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
      >
        Exportar JSON
      </button>
    </header>
  );
};
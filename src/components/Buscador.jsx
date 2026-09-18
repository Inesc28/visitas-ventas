import React from "react";

export const Buscador = ({ busqueda, onBusquedaChange }) => {
  return (
    <div className="relative flex-1 max-w-md">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 text-sm">
        🔍
      </span>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        placeholder="Buscar por lugar, encargado o promotora..."
        className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
      />
      {busqueda && (
        <button
          type="button"
          onClick={() => onBusquedaChange("")}
          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-500 hover:text-slate-300 text-xs font-bold cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  );
};
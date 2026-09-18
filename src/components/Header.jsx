import React from "react";

export const Header = ({ vistaActual, onCambiarVista, total, gestionados }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-lg shadow-black/40">
      <div>
        <h1 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          Control de Visitas
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          <span className="font-semibold text-red-500">{gestionados}</span> de{" "}
          {total} establecimientos gestionados
        </p>
      </div>

      <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 w-full sm:w-auto">
        <button
          onClick={() => onCambiarVista("tarjetas")}
          className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            vistaActual === "tarjetas"
              ? "bg-red-600 text-white shadow-md shadow-red-950/50 border border-red-500/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Visitas
        </button>
        <button
          onClick={() => onCambiarVista("estadisticas")}
          className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            vistaActual === "estadisticas"
              ? "bg-red-600 text-white shadow-md shadow-red-950/50 border border-red-500/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Estadísticas
        </button>
      </div>
    </header>
  );
};
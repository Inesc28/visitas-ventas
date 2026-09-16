import React from "react";

export const Header = ({ vistaActual, onCambiarVista, total, gestionados }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-white/75 backdrop-blur-md border border-white/80 rounded-2xl shadow-sm shadow-slate-200/50">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
          Control de Visitas
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          <span className="font-semibold text-indigo-600">{gestionados}</span>{" "}
          de {total} establecimientos gestionados
        </p>
      </div>

      <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 w-full sm:w-auto">
        <button
          onClick={() => onCambiarVista("tarjetas")}
          className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            vistaActual === "tarjetas"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Visitas
        </button>
        <button
          onClick={() => onCambiarVista("estadisticas")}
          className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            vistaActual === "estadisticas"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Estadísticas
        </button>
      </div>
    </header>
  );
};

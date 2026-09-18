import React from "react";

export const EstatusSelector = ({ estatusActual, opciones, onSelect }) => {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
        Resultado
      </label>
      <div className="grid grid-cols-1 gap-1.5">
        {opciones.map((opcion) => {
          const isSelected = estatusActual === opcion.label;
          return (
            <button
              key={opcion.id}
              type="button"
              onClick={() => onSelect(opcion.label)}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                isSelected
                  ? opcion.activeClass
                  : "bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${opcion.dotColor}`}
                />
                {opcion.label}
              </span>
              {isSelected && (
                <span className="text-[10px] font-bold text-slate-300">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
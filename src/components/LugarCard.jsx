import React from "react";
import { EstatusSelector } from "./EstatusSelector";

export const LugarCard = ({
  item,
  opcionesEstatus,
  onEstatusChange,
  onPromotoraChange,
  onEncargadoChange,
  onBorrarLugar,
}) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-lg shadow-black/40 flex flex-col justify-between gap-4 transition-all hover:border-red-600/40 hover:shadow-red-950/20">
      <div>
        <div className="flex items-start justify-between gap-3 mb-1">
          <h2 className="text-base font-semibold text-white leading-snug">
            {item.lugar}
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            {item.estatus && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-950/80 text-red-400 border border-red-800/60">
                Gestionado
              </span>
            )}
            <button
              type="button"
              onClick={() => onBorrarLugar(item.id)}
              title="Eliminar lugar"
              className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-800/50 rounded-lg transition-all cursor-pointer text-xs"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-800">
        <div className="space-y-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Persona con la que se habló
          </label>
          <input
            type="text"
            placeholder="Ej. Gerente, dueño, nombre..."
            value={item.encargado || ""}
            onChange={(e) => onEncargadoChange(item.id, e.target.value)}
            className="w-full px-3 py-1.5 text-xs text-slate-100 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all placeholder:text-slate-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Promotora que asistió
          </label>
          <input
            type="text"
            placeholder="Tu nombre..."
            value={item.promotora || ""}
            onChange={(e) => onPromotoraChange(item.id, e.target.value)}
            className="w-full px-3 py-1.5 text-xs text-slate-100 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all placeholder:text-slate-500"
          />
        </div>

        <EstatusSelector
          estatusActual={item.estatus}
          opciones={opcionesEstatus}
          onSelect={(nuevoEstatus) => onEstatusChange(item.id, nuevoEstatus)}
        />
      </div>
    </div>
  );
};
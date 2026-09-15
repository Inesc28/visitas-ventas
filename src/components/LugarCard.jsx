import React from 'react';
import { EstatusSelector } from './EstatusSelector';

export const LugarCard = ({ item, opcionesEstatus, onEstatusChange, onPromotoraChange }) => {
  return (
    <div className="bg-white/85 backdrop-blur-md border border-white/90 rounded-2xl p-5 shadow-sm shadow-slate-200/60 flex flex-col justify-between gap-4 transition-all hover:shadow-md hover:border-indigo-200/60">
      <div>
        <div className="flex items-start justify-between gap-3 mb-1">
          <h2 className="text-sm font-semibold text-slate-900 leading-snug">{item.lugar}</h2>
          {item.estatus && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              Gestionado
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Encargado: <span className="text-slate-700 font-medium">{item.encargado}</span>
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="space-y-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Promotora
          </label>
          <input
            type="text"
            placeholder="Tu nombre..."
            value={item.promotora || ''}
            onChange={(e) => onPromotoraChange(item.id, e.target.value)}
            className="w-full px-3 py-1.5 text-xs text-slate-800 bg-white/80 border border-slate-200/80 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
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
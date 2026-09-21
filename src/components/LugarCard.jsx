import React from "react";
import { EstatusSelector } from "./EstatusSelector";
import { UbicacionSelector } from "./UbicacionSelector";

export const LugarCard = ({
  item,
  opcionesEstatus,
  onEstatusChange,
  onPromotoraChange,
  onEncargadoChange,
  onBorrarLugar,
  onZonaChange,
  onTipoChange,
  onUbicacionExactaChange
}) => {
  const tieneCoordenadas = item.latitud && item.longitud;
  const urlGoogleMaps = tieneCoordenadas 
    ? `https://www.google.com/maps?q=${item.latitud},${item.longitud}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.lugar + " " + (item.zona || ""))}`;

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-lg shadow-black/40 flex flex-col justify-between gap-4 transition-all hover:border-red-600/40">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 className="text-base font-semibold text-white leading-snug">
            {item.lugar}
          </h2>

          <div className="flex items-center gap-2 shrink-0">
            {/* Abrir mapa directamente */}
            <a
              href={urlGoogleMaps}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir en Google Maps"
              className="p-1 text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-800/50 rounded-lg transition-all text-xs flex items-center gap-1"
            >
              📍
            </a>
            {item.estatus && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-950/80 text-red-400 border border-red-800/60">
                Gestionado
              </span>
            )}
            <button
              type="button"
              onClick={() => onBorrarLugar(item.id)}
              className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-800/50 rounded-lg transition-all text-xs"
            >
              🗑️
            </button>
          </div>
        </div>


        <div className="space-y-1 mt-2">
          <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Ubicación Exacta (Geoapify)
          </label>
          <UbicacionSelector
            value={item.direccionCompleta || ""}
            placeholder="Seleccionar o cambiar dirección exacta..."
            onSeleccionar={(datos) => onUbicacionExactaChange(item.id, datos)}
          />
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-800">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Tipo
            </label>
            <input
              type="text"
              placeholder="Ej. Bodegón"
              value={item.tipo || ""}
              onChange={(e) => onTipoChange(item.id, e.target.value)}
              className="w-full px-3 py-1.5 text-xs text-slate-100 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Zona
            </label>
            <input
              type="text"
              placeholder="Ej. Alta Vista"
              value={item.zona || ""}
              onChange={(e) => onZonaChange(item.id, e.target.value)}
              className="w-full px-3 py-1.5 text-xs text-slate-100 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Persona con la que se habló
          </label>
          <input
            type="text"
            placeholder="Ej. Gerente, dueño..."
            value={item.encargado || ""}
            onChange={(e) => onEncargadoChange(item.id, e.target.value)}
            className="w-full px-3 py-1.5 text-xs text-slate-100 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 transition-all"
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
            className="w-full px-3 py-1.5 text-xs text-slate-100 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 transition-all"
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
import React, { useState } from "react";
import { UbicacionSelector } from "./UbicacionSelector";

export const AgregarLugarModal = ({ isOpen, onClose, onAgregar }) => {
  const [nombre, setNombre] = useState("");
  const [encargado, setEncargado] = useState("");
  const [promotora, setPromotora] = useState("");
  const [tipo, setTipo] = useState("");
  const [ubicacionData, setUbicacionData] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    onAgregar({
      lugar: nombre.trim(),
      encargado: encargado.trim(),
      promotora: promotora.trim(),
      tipo: tipo.trim(),
      zona: ubicacionData?.zona || "",
      direccionCompleta: ubicacionData?.direccionCompleta || "",
      latitud: ubicacionData?.latitud || null,
      longitud: ubicacionData?.longitud || null,
      estatus: "",
    });

    setNombre("");
    setEncargado("");
    setPromotora("");
    setTipo("");
    setUbicacionData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-800 space-y-4 my-auto">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            Agregar Nuevo Establecimiento
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 font-bold cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Nombre del Establecimiento *</label>
            <input
              type="text"
              required
              placeholder="Ej: Bakery & Cafe"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-600 transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Ubicación Geoapify / Dirección</label>
            <UbicacionSelector 
              value={ubicacionData?.direccionCompleta}
              onSeleccionar={(datos) => setUbicacionData(datos)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Tipo</label>
              <input
                type="text"
                placeholder="Ej: Bodegón"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-600 transition-all"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Zona (Auto o Manual)</label>
              <input
                type="text"
                placeholder="Ej: Alta Vista"
                value={ubicacionData?.zona || ""}
                onChange={(e) => setUbicacionData(prev => ({ ...prev, zona: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Atendió / Persona (Opcional)</label>
            <input
              type="text"
              placeholder="Ej: Pedro Pérez"
              value={encargado}
              onChange={(e) => setEncargado(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-600 transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Promotora Asignada (Opcional)</label>
            <input
              type="text"
              placeholder="Ej: Inés"
              value={promotora}
              onChange={(e) => setPromotora(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-600 transition-all"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-slate-400 font-semibold hover:bg-slate-800 transition-colors">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-xl text-white bg-red-600 font-semibold hover:bg-red-700 transition-colors">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
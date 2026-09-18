import React, { useState } from "react";

export const AgregarLugarModal = ({ isOpen, onClose, onAgregar }) => {
  const [nombre, setNombre] = useState("");
  const [encargado, setEncargado] = useState("");
  const [promotora, setPromotora] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    onAgregar({
      lugar: nombre.trim(),
      encargado: encargado.trim(),
      promotora: promotora.trim(),
      estatus: "",
    });

    setNombre("");
    setEncargado("");
    setPromotora("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-800 space-y-4 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            Agregar Nuevo Establecimiento
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 font-bold text-base cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Nombre del Establecimiento *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Bakery & Cafe"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Atendió / Persona (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: Pedro Pérez"
              value={encargado}
              onChange={(e) => setEncargado(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Promotora Asignada (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: Inés"
              value={promotora}
              onChange={(e) => setPromotora(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 font-semibold hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-white bg-red-600 font-semibold hover:bg-red-700 transition-colors shadow-md shadow-red-950/50 cursor-pointer border border-red-500/30"
            >
              Guardar Establecimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
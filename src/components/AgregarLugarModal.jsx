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
      estatus: ""
    });

    setNombre("");
    setEncargado("");
    setPromotora("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            Agregar Nuevo Establecimiento
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nombre del Establecimiento *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Bakery & Cafe"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Atendió / Persona (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: Pedro Pérez"
              value={encargado}
              onChange={(e) => setEncargado(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Promotora Asignada (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: Inés"
              value={promotora}
              onChange={(e) => setPromotora(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-white bg-indigo-600 font-semibold hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
            >
              Guardar Establecimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
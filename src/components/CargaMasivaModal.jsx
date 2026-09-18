import React, { useState } from "react";

export const CargaMasivaModal = ({ isOpen, onClose, onImportarMasivo }) => {
  const [textoLista, setTextoLista] = useState("");
  const [modo, setModo] = useState("texto"); 

  if (!isOpen) return null;

  const handleProcesarTexto = () => {
    if (!textoLista.trim()) return;

    const lineas = textoLista
      .split("\n")
      .map((linea) => linea.trim())
      .filter((linea) => linea.length > 0);

    if (lineas.length === 0) return;

    const nuevosLugares = lineas.map((nombreLugar) => ({
      lugar: nombreLugar,
      encargado: "",
      promotora: "",
      estatus: "",
    }));

    onImportarMasivo(nuevosLugares);
    setTextoLista("");
    onClose();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          const estructurados = parsed.map((item) => ({
            lugar: typeof item === "string" ? item : item.lugar || item.nombre || "Sin nombre",
            encargado: item.encargado || "",
            promotora: item.promotora || "",
            estatus: item.estatus || "",
          }));
          onImportarMasivo(estructurados);
          onClose();
        } else {
          alert("El archivo JSON debe contener una lista ([ ... ])");
        }
      } catch (err) {
        alert("El archivo seleccionado no tiene un formato JSON válido.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            Carga Masiva de Establecimientos
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setModo("texto")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              modo === "texto"
                ? "bg-red-600 text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Pegar lista (Excel / Texto)
          </button>
          <button
            onClick={() => setModo("json")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              modo === "json"
                ? "bg-red-600 text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Subir archivo JSON
          </button>
        </div>

        {modo === "texto" ? (
          <div className="space-y-2">
            <label className="text-xs text-slate-400 block">
              Pega la lista de lugares (un lugar por cada línea):
            </label>
            <textarea
              rows={8}
              value={textoLista}
              onChange={(e) => setTextoLista(e.target.value)}
              placeholder={`Ejemplo:\nPanadería La Rosa\nFarmacia Central\nBodegón El Rey\nAbasto Las Mercedes`}
              className="w-full p-3 text-xs text-slate-100 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all placeholder:text-slate-600 font-mono"
            />
            <p className="text-[10px] text-slate-500">
              💡 Tip: Puedes copiar directamente una columna entera desde Excel o Google Sheets.
            </p>
          </div>
        ) : (
          <div className="space-y-3 py-4">
            <label className="text-xs text-slate-400 block">
              Selecciona un archivo `.json` con los registros:
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-950/80 file:text-red-400 hover:file:bg-red-900 border border-slate-800 rounded-xl p-2 bg-slate-950 cursor-pointer"
            />
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white font-medium"
          >
            Cancelar
          </button>
          {modo === "texto" && (
            <button
              onClick={handleProcesarTexto}
              className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-950/50 transition-all border border-red-500/30"
            >
              Agregar todos
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
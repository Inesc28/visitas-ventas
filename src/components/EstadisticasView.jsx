import React from "react";

export const EstadisticasView = ({ lugares = [] }) => {
  const esVendido = (e) =>
    e === "vendido" ||
    String(e || "").toLowerCase().includes("vend") ||
    String(e || "").toLowerCase().includes("invitac");

  const esRechazado = (e) =>
    e === "rechazado" ||
    String(e || "").toLowerCase().includes("no");

  const esRevisitar = (e) =>
    e === "revisitar" ||
    String(e || "").toLowerCase().includes("volver") ||
    String(e || "").toLowerCase().includes("ir");

  const renderBadgeEstatus = (estatus) => {
    if (!estatus) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800/80 text-slate-400 border border-slate-700">
          Pendiente
        </span>
      );
    }

    if (esVendido(estatus)) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
          Vendió / Invitación
        </span>
      );
    }

    if (esRechazado(estatus)) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-red-950/80 text-red-400 border border-red-800/60">
          Dijeron que No / Ausente
        </span>
      );
    }

    if (esRevisitar(estatus)) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-950/80 text-amber-400 border border-amber-800/60">
          Volver a ir
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-red-950/50 text-red-300 border border-red-800/50">
        {estatus}
      </span>
    );
  };

  const totalVendidos = lugares.filter((l) => esVendido(l.estatus)).length;
  const totalRechazados = lugares.filter((l) => esRechazado(l.estatus)).length;
  const totalRevisitar = lugares.filter((l) => esRevisitar(l.estatus)).length;
  const totalPendientes = lugares.filter((l) => !l.estatus).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-end print:hidden">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-xl transition-all cursor-pointer shadow-md shadow-red-950/50 border border-red-500/30"
        >
          Imprimir PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-emerald-900/40 shadow-lg shadow-black/30 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Se Vendió la App
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white">
              {totalVendidos}
            </span>
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/90 border border-emerald-800/50 px-2 py-0.5 rounded-full">
              ¡Éxito!
            </span>
          </div>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-red-900/40 shadow-lg shadow-black/30 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
            Dijeron que No
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white">
              {totalRechazados}
            </span>
            <span className="text-[11px] font-semibold text-red-300 bg-red-950/90 border border-red-800/50 px-2 py-0.5 rounded-full">
              Rechazados
            </span>
          </div>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-amber-900/40 shadow-lg shadow-black/30 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Hay que Volver a Ir
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white">
              {totalRevisitar}
            </span>
            <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/90 border border-amber-800/50 px-2 py-0.5 rounded-full">
              Pendientes
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl shadow-black/40 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            Resumen General de Visitas
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Sin gestionar:{" "}
            <strong className="text-red-400">{totalPendientes}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <th className="py-3.5 px-4">Establecimiento</th>
                <th className="py-3.5 px-4">Tipo</th>
                <th className="py-3.5 px-4">Zona</th>
                <th className="py-3.5 px-4">Atendió / Persona</th>
                <th className="py-3.5 px-4">Promotora</th>
                <th className="py-3.5 px-4">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {lugares.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {item.lugar}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.tipo ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {item.tipo}
                      </span>
                    ) : (
                      <span className="text-slate-600 italic">N/A</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.zona ? (
                      <span>{item.zona}</span>
                    ) : (
                      <span className="text-slate-600 italic">N/A</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.encargado || (
                      <span className="text-slate-500 italic">
                        No especificado
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.promotora || (
                      <span className="text-slate-500 italic">Sin asignar</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {renderBadgeEstatus(item.estatus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
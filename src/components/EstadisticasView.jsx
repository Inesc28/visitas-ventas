import React from "react";
import { OPCIONES_ESTATUS } from "../constants/estatusOptions";

export const EstadisticasView = ({ lugares }) => {
  const totalVendidos = lugares.filter(
    (l) => l.estatus === "Fuimos y se vendió la app",
  ).length;
  const totalRechazados = lugares.filter(
    (l) => l.estatus === "Fuimos y dijeron que no",
  ).length;
  const totalRevisitar = lugares.filter(
    (l) => l.estatus === "Hay que volver a ir",
  ).length;
  const totalPendientes = lugares.filter((l) => !l.estatus).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-end print:hidden">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all cursor-pointer shadow-xs"
        >
          Imprimir PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-200/60 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Se Vendió la App
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-emerald-900">
              {totalVendidos}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              ¡Éxito!
            </span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-rose-200/60 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">
            Dijeron que No
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-rose-900">
              {totalRechazados}
            </span>
            <span className="text-[11px] font-semibold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-full">
              Rechazados
            </span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-amber-200/60 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            Hay que Volver a Ir
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-amber-900">
              {totalRevisitar}
            </span>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
              Pendientes
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white/85 backdrop-blur-md border border-white/90 rounded-2xl shadow-sm shadow-slate-200/60 overflow-hidden print:border-slate-200 print:shadow-none">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-slate-900">
            Resumen General de Visitas
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Sin gestionar:{" "}
            <strong className="text-slate-700">{totalPendientes}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <th className="py-3.5 px-4">Establecimiento</th>
                <th className="py-3.5 px-4">Atendió / Persona</th>
                <th className="py-3.5 px-4">Promotora</th>
                <th className="py-3.5 px-4">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {lugares.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {item.lugar}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.encargado || (
                      <span className="text-slate-400 italic">
                        No especificado
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.promotora || (
                      <span className="text-slate-400 italic">Sin asignar</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.estatus === "Fuimos y se vendió la app" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Se vendió la app
                      </span>
                    )}
                    {item.estatus === "Fuimos y dijeron que no" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-100 text-rose-800 border border-rose-200">
                        Dijeron que no
                      </span>
                    )}
                    {item.estatus === "Hay que volver a ir" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800 border border-amber-200">
                        Volver a ir
                      </span>
                    )}
                    {!item.estatus && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200">
                        Pendiente
                      </span>
                    )}
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

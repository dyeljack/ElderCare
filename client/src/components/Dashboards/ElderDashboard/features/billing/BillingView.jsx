import React from 'react';
import { CreditCard, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { useElderCare } from '../../context/ElderCareContext.jsx';

export default function BillingView() {
  const { showToast } = useElderCare();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-serif font-bold theme-text-heading">
          Care Plan & Billing
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Medicare coverage, insurance claims, and active subscription statement
        </p>
      </div>

      <div className="theme-bg-card border theme-border rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b theme-border">
          <div>
            <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100 px-3 py-1 rounded-full uppercase">
              Active Plan
            </span>
            <h3 className="text-2xl font-serif font-bold theme-text-heading mt-2">
              Premium ElderCare Concierge
            </h3>
            <p className="text-sm text-slate-500">Includes 24/7 Nurse Hotline, In-home Visits, and Family Sync</p>
          </div>

          <button
            onClick={() => showToast('Invoiced downloaded to PDF.')}
            className="flex items-center gap-2 border theme-border px-4 py-2.5 rounded-xl text-sm font-semibold theme-text-heading hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Download className="w-9 h-9" />
            <span>Download Invoice</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400">Monthly Coverage</span>
            <p className="text-xl font-bold theme-text-heading">$350.00 / mo</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400">Medicare Copay</span>
            <p className="text-xl font-bold text-teal-600">$0.00 (Covered 100%)</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400">Next Renewal</span>
            <p className="text-xl font-bold theme-text-heading">Sept 1, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

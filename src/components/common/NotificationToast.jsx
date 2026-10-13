import React from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast() {
  const { toasts, removeToast } = useFoodApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <Info className="w-5 h-5 text-indigo-500 shrink-0" />;
        let borderColor = 'border-indigo-200 bg-white';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
          borderColor = 'border-emerald-200 bg-emerald-50/90';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
          borderColor = 'border-rose-200 bg-rose-50/90';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-slide-in ${borderColor}`}
          >
            {icon}
            <div className="flex-1 text-xs">
              <h4 className="font-bold text-slate-900">{toast.title}</h4>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

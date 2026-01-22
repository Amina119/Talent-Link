import { useEffect } from "react";
import { uiStore } from "../../store/uiStore";
import { UI } from "../../lib/constants";

export default function ToastHost() {
  const toasts = uiStore((s) => s.toasts);
  const removeToast = uiStore((s) => s.removeToast);

  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map((t) =>
      setTimeout(() => removeToast(t.id), UI.toast.durationMs
)
    );

    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="w-[320px] rounded-2xl border border-white/10 bg-white/10 p-3 text-sm text-white backdrop-blur"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-xs text-white/60">
                {(t.type ?? "info").toUpperCase()}
              </div>
              <div className="mt-1">{t.message}</div>
            </div>

            <button
              type="button"
              className="text-white/60 hover:text-white"
              onClick={() => removeToast(t.id)}
              aria-label="Fermer"
              title="Fermer"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

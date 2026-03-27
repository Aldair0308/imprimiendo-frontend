import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, FileText, ChevronRight, Coins } from 'lucide-react';

interface KioskPaymentProps {
  session?: any;
  onRefresh?: () => void;
}

export function KioskPayment({ session }: KioskPaymentProps) {
  const files = session?.files || [];
  const totalCost = session?.total_cost || 0;
  const [inserted, setInserted] = useState(0);

  useEffect(() => {
    if (session?.payments?.[0]?.amount_inserted) {
      setInserted(session.payments[0].amount_inserted);
    }
  }, [session]);

  const TOTAL = totalCost;
  const pct = Math.min((inserted / TOTAL) * 100, 100);
  const remaining = Math.max(TOTAL - inserted, 0);

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: '#04091A', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#2563EB' }}>
            <Zap size={18} color="white" fill="white" />
          </div>
          <span style={{ color: '#F1F5F9', fontWeight: 900, letterSpacing: '0.22em', fontSize: '1.3rem' }}>
            IMPRIMIENDO
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl" style={{ background: '#0A1628', border: '1px solid #1E3A6E' }}>
          <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Sesión</span>
          <span style={{ color: '#60A5FA', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
            IMP-2847
          </span>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex gap-8 px-10 pb-4">
        {/* Left - file summary */}
        <div className="flex flex-col gap-3 flex-1">
          <h2 style={{ color: '#94A3B8', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
            RESUMEN DE ARCHIVOS
          </h2>
          {files.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4 rounded-xl"
              style={{ background: '#0A1628', border: '1px solid #1E3A6E' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: f.color ? 'rgba(37,99,235,0.15)' : '#0F1E3D' }}
              >
                <FileText size={18} color={f.color ? '#60A5FA' : '#64748B'} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ color: '#E2E8F0', fontSize: '1rem', fontWeight: 600 }} className="truncate">
                  {f.name}
                </div>
                <div style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                  {f.pages} págs · {f.copies} {f.copies > 1 ? 'copias' : 'copia'} ·{' '}
                  {f.color ? 'Color' : 'B&N'}
                </div>
              </div>
              <div style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'JetBrains Mono, monospace' }}>
                ${f.price.toFixed(2)}
              </div>
            </div>
          ))}

          {/* Total row */}
          <div
            className="flex items-center justify-between px-5 py-4 rounded-xl mt-1"
            style={{ background: '#0F1E3D', border: '1px solid rgba(37,99,235,0.4)' }}
          >
            <span style={{ color: '#94A3B8', fontSize: '1rem' }}>Total a pagar</span>
            <span style={{ color: '#60A5FA', fontWeight: 900, fontSize: '1.8rem', fontFamily: 'JetBrains Mono, monospace' }}>
              ${TOTAL.toFixed(2)}&nbsp;<span style={{ fontSize: '1rem', fontWeight: 400 }}>MXN</span>
            </span>
          </div>
        </div>

        {/* Right - payment panel */}
        <div className="w-80 flex flex-col gap-5">
          <h2 style={{ color: '#94A3B8', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            INSERTAR MONEDAS / BILLETES
          </h2>

          {/* Coin slot visual */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center gap-4"
            style={{ background: '#0A1628', border: '1px solid #1E3A6E' }}
          >
            {/* Coin slot indicator */}
            <div className="relative w-full flex justify-center">
              <div
                className="w-20 h-8 rounded-lg flex items-center justify-center"
                style={{ background: '#1E3A6E', border: '2px solid #2563EB' }}
              >
                <div className="w-12 h-1.5 rounded-full" style={{ background: '#2563EB', opacity: 0.7 }} />
              </div>
              <motion.div
                className="absolute -bottom-2 w-6 h-6 rounded-full"
                style={{ background: '#F59E0B' }}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: [null, 0, 10], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeIn' }}
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Coins size={18} color="#F59E0B" />
              <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Ranura de pago</span>
            </div>
          </div>

          {/* Amount display */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: '#0A1628', border: '1px solid #1E3A6E' }}
          >
            <div className="flex justify-between">
              <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Insertado</span>
              <motion.span
                key={inserted}
                style={{ color: '#10B981', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', fontSize: '1.4rem' }}
                initial={{ scale: 1.15, color: '#34D399' }}
                animate={{ scale: 1, color: '#10B981' }}
                transition={{ duration: 0.3 }}
              >
                ${inserted.toFixed(2)}
              </motion.span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Restante</span>
              <span style={{ color: remaining > 0 ? '#F59E0B' : '#10B981', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', fontSize: '1.4rem' }}>
                ${remaining.toFixed(2)}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-2">
              <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: '#1E3A6E' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: pct >= 100 ? '#10B981' : 'linear-gradient(90deg, #1D4ED8, #3B82F6)',
                    width: `${pct}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span style={{ color: '#64748B', fontSize: '0.75rem' }}>$0.00</span>
                <span style={{ color: '#64748B', fontSize: '0.75rem' }}>${TOTAL.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Accepted bills */}
          <div className="rounded-xl px-4 py-3" style={{ background: '#0A1628', border: '1px solid #1E3A6E' }}>
            <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Aceptamos</p>
            <div className="flex flex-wrap gap-2">
              {['$1', '$2', '$5', '$10', '$20', '$50', '$100', '$200'].map((d) => (
                <span
                  key={d}
                  className="px-2 py-1 rounded"
                  style={{ background: '#1E3A6E', color: '#94A3B8', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {pct >= 100 && (
            <motion.div
              className="rounded-2xl px-6 py-4 flex items-center justify-center gap-3"
              style={{ background: '#059669' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>¡Pago completado!</span>
              <ChevronRight size={20} color="white" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-10 py-4" style={{ borderTop: '1px solid #0A1628' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
          <span style={{ color: '#475569', fontSize: '0.8rem' }}>Pago seguro · Sin comisión</span>
        </div>
        <span style={{ color: '#334155', fontSize: '0.8rem' }}>Toca CANCELAR para abortar la sesión</span>
        <button
          className="px-5 py-2 rounded-xl"
          style={{ background: 'transparent', border: '1px solid #EF4444', color: '#EF4444', fontSize: '0.9rem', cursor: 'pointer' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

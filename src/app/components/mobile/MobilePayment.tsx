import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Monitor, Coins, CheckCircle, Clock, AlertCircle } from 'lucide-react';

type Stage = 'waiting' | 'inserting' | 'complete';

interface MobilePaymentProps {
  session?: any;
  onRefresh?: () => void;
}

export function MobilePayment({ session, onRefresh }: MobilePaymentProps) {
  const [stage, setStage] = useState<Stage>('waiting');
  const totalRequired = session?.payments?.[0]?.amount_required || 0;
  const inserted = session?.payments?.[0]?.amount_inserted || 0;
  const paymentStatus = session?.payments?.[0]?.status || 'pending';
  
  useEffect(() => {
    if (paymentStatus === 'paid') {
      setStage('complete');
    } else if (inserted > 0) {
      setStage('inserting');
    }
  }, [paymentStatus, inserted]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (onRefresh) onRefresh();
    }, 3000);
    return () => clearInterval(interval);
  }, [onRefresh]);

  useEffect(() => {
    if (stage !== 'inserting') return;
    const t = setInterval(() => {
      setInserted((v) => {
        if (v >= TOTAL) {
          setStage('complete');
          return TOTAL;
        }
        return v + 15;
      });
    }, 600);
    return () => clearInterval(t);
  }, [stage]);

  const pct = Math.min((inserted / TOTAL) * 100, 100);

  const stageConfig = {
    waiting: {
      icon: Clock,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.3)',
      label: 'Esperando pago',
      sub: 'Dirígete al kiosk e inserta el pago',
    },
    inserting: {
      icon: Coins,
      color: '#2563EB',
      bg: 'rgba(37,99,235,0.08)',
      border: 'rgba(37,99,235,0.25)',
      label: 'Pago en progreso',
      sub: 'Detectando monedas y billetes…',
    },
    complete: {
      icon: CheckCircle,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.3)',
      label: '¡Pago completado!',
      sub: 'Tu impresión comenzará en instantes',
    },
  };

  const cfg = stageConfig[stage];
  const Icon = cfg.icon;

  return (
    <div
      className="w-full h-full flex flex-col overflow-auto"
      style={{ background: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Status bar */}
      <div style={{ height: 44, background: '#1E293B' }} />

      {/* Nav */}
      <div className="flex items-center gap-3 px-5 py-4" style={{ background: '#1E293B' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#2563EB' }}>
          <Zap size={14} color="white" fill="white" />
        </div>
        <div className="flex-1">
          <p style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '0.95rem' }}>Estado del pago</p>
          <p style={{ color: '#64748B', fontSize: '0.75rem' }}>Sesión IMP-2847</p>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-5 flex-1">
        {/* Main instruction card */}
        <motion.div
          layout
          className="rounded-2xl overflow-hidden"
          style={{ background: '#FFFFFF', border: `1.5px solid ${cfg.border}` }}
        >
          {/* Status header */}
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: cfg.bg }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
              >
                <Icon size={22} color={cfg.color} />
              </motion.div>
            </AnimatePresence>
            <div>
              <p style={{ color: cfg.color, fontWeight: 700, fontSize: '0.95rem' }}>{cfg.label}</p>
              <p style={{ color: '#64748B', fontSize: '0.78rem' }}>{cfg.sub}</p>
            </div>
          </div>

          {/* Kiosk visual */}
          <div className="px-5 py-6 flex flex-col items-center gap-4">
            <motion.div
              className="relative flex items-center justify-center"
              animate={stage === 'inserting' ? { scale: [1, 1.02, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {/* Kiosk icon */}
              <div
                className="w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-2"
                style={{ background: '#0F172A', border: `2px solid ${cfg.border}` }}
              >
                <Monitor size={24} color="#60A5FA" />
                <div
                  className="w-12 h-1 rounded-full"
                  style={{ background: stage === 'complete' ? '#10B981' : '#1E3A6E' }}
                />
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: '#1E3A6E' }}
                />
              </div>
              {/* Coin insertion indicator */}
              {stage === 'inserting' && (
                <motion.div
                  className="absolute -right-3 top-1/2 -translate-y-1/2"
                  animate={{ x: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                >
                  <Coins size={18} color="#F59E0B" />
                </motion.div>
              )}
              {stage === 'complete' && (
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <CheckCircle size={20} color="#10B981" fill="#10B981" style={{ background: 'white', borderRadius: '50%' }} />
                </motion.div>
              )}
            </motion.div>

            <p
              style={{
                color: '#0F172A',
                fontWeight: 700,
                fontSize: '1.05rem',
                textAlign: 'center',
              }}
            >
              {stage === 'waiting'
                ? 'Acércate al kiosk e inserta tu pago'
                : stage === 'inserting'
                ? 'Insertando monedas en el kiosk…'
                : '¡Pago recibido con éxito!'}
            </p>
            <p style={{ color: '#94A3B8', fontSize: '0.82rem', textAlign: 'center' }}>
              Kiosk KIOSK-001 · Piso 1
            </p>
          </div>
        </motion.div>

        {/* Amount breakdown */}
        <div
          className="rounded-2xl px-5 py-4 flex flex-col gap-3"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
        >
          <div className="flex justify-between">
            <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Total a pagar</span>
            <span style={{ color: '#0F172A', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
              ${TOTAL.toFixed(2)} MXN
            </span>
          </div>
          {stage !== 'waiting' && (
            <div className="flex justify-between">
              <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Insertado</span>
              <span style={{ color: '#10B981', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                ${inserted.toFixed(2)} MXN
              </span>
            </div>
          )}
          {stage === 'inserting' && (
            <div>
              <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #1D4ED8, #3B82F6)', width: `${pct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span style={{ color: '#94A3B8', fontSize: '0.72rem' }}>$0.00</span>
                <span style={{ color: '#94A3B8', fontSize: '0.72rem' }}>${TOTAL.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Live status feed */}
        <div className="rounded-2xl px-4 py-3" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <p style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            ACTIVIDAD EN TIEMPO REAL
          </p>
          <div className="flex flex-col gap-2">
            {[
              { time: '14:31:05', msg: 'Sesión confirmada en kiosk', ok: true },
              ...(stage !== 'waiting'
                ? [{ time: '14:31:22', msg: '$50 detectados en la ranura', ok: true }]
                : []),
              ...(stage === 'inserting' || stage === 'complete'
                ? [{ time: '14:31:45', msg: `$${inserted.toFixed(0)} acumulados de $${TOTAL}`, ok: true }]
                : []),
              ...(stage === 'complete'
                ? [{ time: '14:32:10', msg: 'Pago completado. Iniciando impresión', ok: true }]
                : []),
            ].map((entry, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  style={{
                    color: '#94A3B8',
                    fontSize: '0.7rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    flexShrink: 0,
                    marginTop: '0.1rem',
                  }}
                >
                  {entry.time}
                </span>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5"
                    style={{ background: entry.ok ? '#10B981' : '#EF4444' }}
                  />
                  <span style={{ color: '#475569', fontSize: '0.78rem' }}>{entry.msg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help note */}
        <div
          className="flex items-start gap-2 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <AlertCircle size={14} color="#D97706" className="flex-shrink-0 mt-0.5" />
          <p style={{ color: '#92400E', fontSize: '0.78rem', lineHeight: 1.5 }}>
            ¿Problemas con el pago? Toca el botón de asistencia en el kiosk o llama al <strong>800-IMP-PRINT</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

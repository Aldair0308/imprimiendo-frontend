import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Clock, ChevronRight, Wifi, Circle } from 'lucide-react';

export function MobileSession() {
  const [seconds, setSeconds] = useState(287);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 300)), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const progress = (seconds / 300) * 100;

  return (
    <div
      className="w-full h-full flex flex-col overflow-auto"
      style={{ background: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Status bar area */}
      <div style={{ height: 44, background: '#1E293B' }} />

      {/* Nav */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ background: '#1E293B' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#2563EB' }}>
            <Zap size={14} color="white" fill="white" />
          </div>
          <span style={{ color: '#F1F5F9', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.1em' }}>
            IMPRIMIENDO
          </span>
        </div>
        <div className="flex items-center gap-1" style={{ color: '#94A3B8' }}>
          <Wifi size={14} />
        </div>
      </div>

      {/* Session hero */}
      <div
        className="px-5 py-6 flex flex-col gap-3"
        style={{ background: 'linear-gradient(135deg, #1E293B, #0F172A)' }}
      >
        <div className="flex items-center justify-between">
          <span style={{ color: '#94A3B8', fontSize: '0.8rem', letterSpacing: '0.08em' }}>TU SESIÓN ACTIVA</span>
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
          >
            <Circle size={6} style={{ color: '#10B981', fill: '#10B981' }} className="animate-pulse" />
            <span style={{ color: '#10B981', fontSize: '0.75rem', fontWeight: 600 }}>ACTIVA</span>
          </div>
        </div>
        <div
          style={{
            color: '#F1F5F9',
            fontWeight: 800,
            fontSize: '2.2rem',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.05em',
          }}
        >
          IMP-2847
        </div>

        {/* Timer */}
        <div className="mt-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Clock size={13} color="#64748B" />
              <span style={{ color: '#64748B', fontSize: '0.8rem' }}>Tiempo restante</span>
            </div>
            <span
              style={{
                color: seconds < 60 ? '#EF4444' : '#60A5FA',
                fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.2rem',
              }}
            >
              {timeStr}
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: '#334155' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: seconds < 60 ? '#EF4444' : '#2563EB', width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="px-5 py-4 flex flex-col gap-3">
        {[
          { n: 1, label: 'Subir archivos', status: 'active', detail: 'PDF únicamente' },
          { n: 2, label: 'Configurar impresión', status: 'pending', detail: 'Color, copias, tamaño…' },
          { n: 3, label: 'Pago en kiosk', status: 'pending', detail: 'Monedas y billetes' },
          { n: 4, label: 'Recoger impresiones', status: 'pending', detail: 'Bandeja de salida' },
        ].map(({ n, label, status, detail }) => (
          <motion.div
            key={n}
            className="flex items-center gap-4 px-4 py-4 rounded-2xl"
            style={{
              background: status === 'active' ? 'rgba(37,99,235,0.08)' : '#FFFFFF',
              border: `1.5px solid ${status === 'active' ? 'rgba(37,99,235,0.3)' : '#E2E8F0'}`,
            }}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: n * 0.08 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: status === 'active' ? '#2563EB' : status === 'done' ? '#059669' : '#E2E8F0',
                color: status === 'pending' ? '#94A3B8' : 'white',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
            >
              {n}
            </div>
            <div className="flex-1">
              <div style={{ color: '#0F172A', fontWeight: 600, fontSize: '0.95rem' }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{detail}</div>
            </div>
            {status === 'active' && (
              <div
                className="px-2.5 py-1 rounded-full"
                style={{ background: '#2563EB', color: 'white', fontSize: '0.7rem', fontWeight: 600 }}
              >
                AHORA
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 py-2 mt-auto">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl"
          style={{ background: '#2563EB', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Subir archivos</span>
          <ChevronRight size={18} color="white" />
        </motion.button>
        <button
          className="w-full py-3 mt-2 rounded-2xl"
          style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '0.85rem', cursor: 'pointer' }}
        >
          Cancelar sesión
        </button>
      </div>
    </div>
  );
}

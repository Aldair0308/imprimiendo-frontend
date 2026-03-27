import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, CheckCircle, ArrowDown, RotateCcw } from 'lucide-react';

interface KioskDoneProps {
  session?: any;
  onNewSession?: () => void;
}

export function KioskDone({ session, onNewSession }: KioskDoneProps) {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 30)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: '#04091A', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Green ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(16,185,129,0.13) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#2563EB' }}>
            <Zap size={18} color="white" fill="white" />
          </div>
          <span style={{ color: '#F1F5F9', fontWeight: 900, letterSpacing: '0.22em', fontSize: '1.3rem' }}>
            IMPRIMIENDO
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#0A1628', border: '1px solid rgba(16,185,129,0.2)' }}>
          <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Sesión</span>
          <span style={{ color: '#60A5FA', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>IMP-2847</span>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex gap-16 items-center px-16">
        {/* Left – success message */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Check icon */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)' }}
            >
              <CheckCircle size={52} color="#10B981" />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
              <span style={{ color: '#10B981', fontSize: '1rem', letterSpacing: '0.08em' }}>
                IMPRESIÓN COMPLETADA
              </span>
            </div>
            <h1 style={{ color: '#F1F5F9', fontWeight: 800, fontSize: '3.2rem', lineHeight: 1.1 }}>
              ¡Recoge tus
              <br />
              <span style={{ color: '#10B981' }}>impresiones!</span>
            </h1>
            <p style={{ color: '#64748B', fontSize: '1.2rem', marginTop: '1rem' }}>
              Tus documentos están listos en la bandeja de salida
            </p>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-2xl p-6"
            style={{ background: '#0A1628', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <div className="flex gap-8">
              {[
                { label: 'Archivos impresos', value: '3' },
                { label: 'Hojas totales', value: '105' },
                { label: 'Total pagado', value: '$310.50' },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span style={{ color: '#64748B', fontSize: '0.85rem' }}>{label}</span>
                  <span style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '1.6rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-10 py-5 rounded-2xl w-fit"
            style={{ background: '#2563EB', cursor: 'pointer', border: 'none' }}
          >
            <RotateCcw size={22} color="white" />
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>
              Nueva sesión
            </span>
            <span
              className="ml-2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.85rem', color: 'white', fontFamily: 'JetBrains Mono, monospace' }}
            >
              {countdown}
            </span>
          </motion.button>
        </div>

        {/* Right – tray indicator */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {/* Printer illustration */}
          <div
            className="relative w-56 h-44 rounded-3xl flex flex-col items-center justify-center gap-3"
            style={{ background: '#0A1628', border: '2px solid rgba(16,185,129,0.3)' }}
          >
            {/* Printer body */}
            <div
              className="w-36 h-16 rounded-xl flex items-center justify-center"
              style={{ background: '#0F1E3D', border: '1px solid #1E3A6E' }}
            >
              <div className="w-20 h-2 rounded-full" style={{ background: '#1E3A6E' }} />
            </div>
            {/* Paper tray with arrow */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-1"
            >
              <ArrowDown size={20} color="#10B981" />
              <div
                className="w-28 rounded-lg flex items-center justify-center"
                style={{ background: '#F1F5F9', height: 6 }}
              />
              <div
                className="w-24 rounded-lg flex items-center justify-center"
                style={{ background: '#E2E8F0', height: 6 }}
              />
              <div
                className="w-20 rounded-lg"
                style={{ background: '#CBD5E1', height: 6 }}
              />
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className="px-5 py-2 rounded-full"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              <span style={{ color: '#10B981', fontSize: '0.9rem', letterSpacing: '0.06em' }}>
                BANDEJA INFERIOR
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: '0.9rem', textAlign: 'center' }}>
              Retira tus documentos<br />de la bandeja de salida
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 flex items-center justify-between px-10 py-5"
        style={{ borderTop: '1px solid #0A1628' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
          <span style={{ color: '#475569', fontSize: '0.85rem' }}>Impresión completada · Gracias por usar IMPRIMIENDO</span>
        </div>
        <span style={{ color: '#334155', fontSize: '0.85rem' }}>
          Nueva sesión automática en{' '}
          <span style={{ color: '#60A5FA', fontFamily: 'JetBrains Mono, monospace' }}>{countdown}s</span>
        </span>
      </div>
    </div>
  );
}

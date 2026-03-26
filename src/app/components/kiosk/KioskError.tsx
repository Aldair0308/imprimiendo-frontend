import { motion } from 'motion/react';
import { Zap, AlertTriangle, RefreshCw, X } from 'lucide-react';

interface KioskErrorProps {
  errorCode?: string;
  errorMessage?: string;
  errorDetail?: string;
}

export function KioskError({
  errorCode = 'ERR-0x4A2',
  errorMessage = 'Sin papel en la impresora',
  errorDetail = 'La impresora ha quedado sin papel. Por favor contacta al personal para recargar la bandeja de alimentación.',
}: KioskErrorProps) {
  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: '#04091A', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Red ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 50% at 50% 45%, rgba(239,68,68,0.1) 0%, transparent 70%)',
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
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#EF4444' }} />
          <span style={{ color: '#EF4444', fontSize: '0.85rem', letterSpacing: '0.06em' }}>SISTEMA EN ERROR</span>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center px-16 gap-20">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Error icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 12 }}
          >
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(239,68,68,0.12)', border: '2px solid rgba(239,68,68,0.4)' }}
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
              >
                <AlertTriangle size={60} color="#EF4444" />
              </motion.div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              <span style={{ color: '#EF4444', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                CÓDIGO DE ERROR: {errorCode}
              </span>
            </div>
            <h1 style={{ color: '#F1F5F9', fontWeight: 800, fontSize: '3rem', lineHeight: 1.15, marginBottom: '1rem' }}>
              {errorMessage}
            </h1>
            <p style={{ color: '#64748B', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '520px' }}>
              {errorDetail}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex gap-5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-10 py-5 rounded-2xl"
              style={{ background: '#2563EB', border: 'none', cursor: 'pointer' }}
            >
              <RefreshCw size={22} color="white" />
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>Reintentar</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-10 py-5 rounded-2xl"
              style={{ background: 'transparent', border: '2px solid #EF4444', cursor: 'pointer' }}
            >
              <X size={22} color="#EF4444" />
              <span style={{ color: '#EF4444', fontWeight: 700, fontSize: '1.2rem' }}>Cancelar sesión</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right - Error detail panel */}
        <motion.div
          className="w-96 flex flex-col gap-5"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Error card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(239,68,68,0.2)' }}
          >
            <div
              className="px-6 py-4 flex items-center gap-3"
              style={{ background: 'rgba(239,68,68,0.1)' }}
            >
              <AlertTriangle size={18} color="#EF4444" />
              <span style={{ color: '#EF4444', fontWeight: 600, fontSize: '0.9rem' }}>
                Detalles del error
              </span>
            </div>
            <div className="px-6 py-5" style={{ background: '#07111F' }}>
              {[
                { label: 'Código', value: errorCode },
                { label: 'Categoría', value: 'Hardware · Impresora' },
                { label: 'Componente', value: 'Bandeja principal' },
                { label: 'Timestamp', value: '14:32:17' },
                { label: 'Sesión afectada', value: 'IMP-2847' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #0A1628' }}>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>{label}</span>
                  <span style={{ color: '#94A3B8', fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Help callout */}
          <div
            className="rounded-xl px-5 py-4"
            style={{ background: '#0A1628', border: '1px solid #1E3A6E' }}
          >
            <p style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: 1.6 }}>
              ¿Necesitas ayuda? Llama al servicio técnico o contacta a un operador en la tienda.
            </p>
            <p style={{ color: '#60A5FA', fontSize: '1rem', fontWeight: 600, marginTop: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>
              800-IMP-PRINT
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between px-10 py-5" style={{ borderTop: '1px solid #0A1628' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#EF4444' }} />
          <span style={{ color: '#475569', fontSize: '0.85rem' }}>KIOSK-001 · Sistema en estado de error</span>
        </div>
        <span style={{ color: '#334155', fontSize: '0.85rem' }}>No se ha realizado ningún cargo a tu cuenta</span>
      </div>
    </div>
  );
}

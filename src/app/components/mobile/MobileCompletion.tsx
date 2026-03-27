import { motion } from 'motion/react';
import { Zap, CheckCircle, Printer, Star, RotateCcw, LogOut } from 'lucide-react';

interface MobileCompletionProps {
  session?: any;
  onNew?: () => void;
  onClose?: () => void;
}

export function MobileCompletion({ session, onNew, onClose }: MobileCompletionProps) {
  return (
    <div
      className="w-full h-full flex flex-col overflow-auto"
      style={{ background: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Status bar */}
      <div style={{ height: 44, background: '#0F172A' }} />

      {/* Nav */}
      <div className="flex items-center gap-3 px-5 py-4" style={{ background: '#0F172A' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#2563EB' }}>
          <Zap size={14} color="white" fill="white" />
        </div>
        <span style={{ color: '#F1F5F9', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.08em' }}>
          IMPRIMIENDO
        </span>
      </div>

      {/* Success hero */}
      <div
        className="flex flex-col items-center px-6 py-8 gap-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)' }}
      >
        {/* Confetti dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][i % 5],
              left: `${(i * 37 + 10) % 90}%`,
              top: `${(i * 23 + 5) % 80}%`,
            }}
            initial={{ y: 0, opacity: 0, scale: 0 }}
            animate={{
              y: [0, -20, 10, -5, 0],
              opacity: [0, 1, 1, 0.5, 0],
              scale: [0, 1, 0.8, 0.5, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        ))}

        {/* Check icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)' }}
          >
            <CheckCircle size={44} color="#10B981" />
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
            IMPRESIÓN EXITOSA
          </p>
          <h1 style={{ color: '#F1F5F9', fontWeight: 800, fontSize: '1.7rem', lineHeight: 1.2 }}>
            ¡Tus documentos
            <br />están listos!
          </h1>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex gap-5 mt-2"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          {[
            { value: '3', label: 'archivos' },
            { value: '105', label: 'hojas' },
            { value: '$310.50', label: 'total' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span style={{ color: '#F1F5F9', fontWeight: 800, fontSize: '1.3rem', fontFamily: 'JetBrains Mono, monospace' }}>
                {value}
              </span>
              <span style={{ color: '#64748B', fontSize: '0.72rem' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Collection card */}
      <div className="px-4 py-5 flex flex-col gap-4">
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl px-5 py-4 flex items-center gap-4"
          style={{ background: '#FFFFFF', border: '1.5px solid rgba(16,185,129,0.25)' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(16,185,129,0.1)' }}
          >
            <Printer size={24} color="#10B981" />
          </div>
          <div>
            <p style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.95rem' }}>
              Recoge en la bandeja de salida
            </p>
            <p style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              Kiosk KIOSK-001 · Bandeja inferior
            </p>
          </div>
        </motion.div>

        {/* Rating prompt */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl px-5 py-4"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
        >
          <p style={{ color: '#64748B', fontSize: '0.82rem', marginBottom: '0.75rem', textAlign: 'center' }}>
            ¿Cómo fue tu experiencia?
          </p>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
              >
                <Star size={26} color="#F59E0B" fill={star <= 4 ? '#F59E0B' : 'none'} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* File summary */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="rounded-2xl px-5 py-4"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
        >
          <p style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
            ARCHIVOS IMPRESOS
          </p>
          {[
            { name: 'Tesis_Final.pdf', detail: '90 hojas · Color' },
            { name: 'CV_2024.pdf', detail: '3 hojas · B&N' },
            { name: 'Presentacion.pdf', detail: '12 hojas · Color' },
          ].map(({ name, detail }) => (
            <div key={name} className="flex items-center gap-2 py-2" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <CheckCircle size={13} color="#10B981" />
              <span style={{ color: '#475569', fontSize: '0.82rem', flex: 1 }}>{name}</span>
              <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>{detail}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl"
            style={{ background: '#2563EB', border: 'none', cursor: 'pointer' }}
          >
            <RotateCcw size={18} color="white" />
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Nueva impresión</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl"
            style={{ background: 'transparent', border: '1.5px solid #E2E8F0', cursor: 'pointer' }}
          >
            <LogOut size={16} color="#64748B" />
            <span style={{ color: '#64748B', fontWeight: 600, fontSize: '0.95rem' }}>Cerrar sesión</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

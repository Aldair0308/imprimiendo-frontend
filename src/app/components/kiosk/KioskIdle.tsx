import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Wifi, Circle } from 'lucide-react';
import { QRCodeSVG } from '../QRCodeSVG';

export function KioskIdle() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const dateStr = time.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: '#04091A', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-12 py-7">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: '#2563EB' }}
          >
            <Zap size={20} color="white" fill="white" />
          </div>
          <span
            style={{ color: '#F1F5F9', fontWeight: 900, letterSpacing: '0.22em', fontSize: '1.5rem' }}
          >
            IMPRIMIENDO
          </span>
        </div>
        <div className="flex items-center gap-2" style={{ color: '#475569' }}>
          <Wifi size={16} />
          <span style={{ fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace' }}>
            KIOSK-001
          </span>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6">
        {/* Animated rings + QR */}
        <div className="relative flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ border: '1.5px solid rgba(59,130,246,0.25)', width: 300, height: 300 }}
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1 + i * 0.55, opacity: 0 }}
              transition={{
                repeat: Infinity,
                duration: 2.8,
                delay: i * 0.75,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* QR Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div
              className="relative rounded-3xl p-5"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 0 80px rgba(37,99,235,0.35), 0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              <QRCodeSVG size={210} darkColor="#0F172A" lightColor="#FFFFFF" />
              {/* Corner accents */}
              {[
                'top-0 left-0 border-t-2 border-l-2 rounded-tl-lg',
                'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg',
                'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg',
                'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg',
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute -m-2 w-5 h-5 ${cls}`}
                  style={{ borderColor: '#2563EB' }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h1
            style={{
              color: '#F1F5F9',
              fontWeight: 800,
              fontSize: '2.6rem',
              letterSpacing: '0.02em',
            }}
          >
            Escanea para comenzar
          </h1>
          <p style={{ color: '#64748B', fontSize: '1.2rem', letterSpacing: '0.06em' }}>
            Apunta la cámara de tu celular al código QR
          </p>
        </motion.div>

        {/* Step pills */}
        <motion.div
          className="flex gap-4 mt-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { n: '01', label: 'Escanea el QR' },
            { n: '02', label: 'Sube tus archivos' },
            { n: '03', label: 'Paga e imprime' },
          ].map(({ n, label }) => (
            <div
              key={n}
              className="flex items-center gap-3 px-6 py-3 rounded-full"
              style={{ background: '#0A1628', border: '1px solid #1E3A6E' }}
            >
              <span style={{ color: '#2563EB', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}>
                {n}
              </span>
              <span style={{ color: '#94A3B8', fontSize: '1rem' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 flex items-center justify-between px-12 py-5"
        style={{ borderTop: '1px solid #0A1628' }}
      >
        <div className="flex items-center gap-2">
          <Circle size={8} style={{ color: '#10B981', fill: '#10B981' }} className="animate-pulse" />
          <span style={{ color: '#475569', fontSize: '0.85rem' }}>Sistema listo</span>
        </div>
        <span style={{ color: '#334155', fontSize: '0.85rem', textTransform: 'capitalize' }}>
          {dateStr}
        </span>
        <span
          style={{
            color: '#94A3B8',
            fontSize: '1.6rem',
            fontWeight: 300,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {timeStr}
        </span>
      </div>
    </div>
  );
}

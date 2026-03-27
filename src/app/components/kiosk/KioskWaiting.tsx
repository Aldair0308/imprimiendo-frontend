import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Clock, FileText, Smartphone, Wifi } from 'lucide-react';
import { QRCodeSVG } from '../QRCodeSVG';

interface KioskWaitingProps {
  session?: any;
  onRefresh?: () => void;
}

export function KioskWaiting({ session }: KioskWaitingProps) {
  const [seconds, setSeconds] = useState(287);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 300)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? '' : d + '.')), 550);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const progress = (seconds / 300) * 100;

  const statuses = [
    { icon: Smartphone, label: 'Dispositivo conectado', active: true, color: '#10B981' },
    { icon: FileText, label: 'Archivos recibidos', active: false, color: '#64748B' },
    { icon: Wifi, label: 'Conexión estable', active: true, color: '#10B981' },
  ];

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: '#04091A', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-12 py-7">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#2563EB' }}>
            <Zap size={20} color="white" fill="white" />
          </div>
          <span style={{ color: '#F1F5F9', fontWeight: 900, letterSpacing: '0.22em', fontSize: '1.5rem' }}>
            IMPRIMIENDO
          </span>
        </div>
        {/* Session ID badge */}
        <div
          className="flex items-center gap-3 px-5 py-2.5 rounded-xl"
          style={{ background: '#0A1628', border: '1px solid #1E3A6E' }}
        >
          <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Sesión activa</span>
          <span
            style={{
              color: '#60A5FA',
              fontWeight: 700,
              fontSize: '1.3rem',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            IMP-2847
          </span>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center px-12 gap-16">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Status heading */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className="w-3.5 h-3.5 rounded-full"
                style={{ background: '#2563EB' }}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              />
              <span style={{ color: '#60A5FA', fontSize: '1.1rem', letterSpacing: '0.08em' }}>
                EN ESPERA
              </span>
            </div>
            <h1 style={{ color: '#F1F5F9', fontWeight: 800, fontSize: '3rem', lineHeight: 1.1 }}>
              Esperando
              <br />
              <span style={{ color: '#60A5FA' }}>archivos{dots}</span>
            </h1>
            <p style={{ color: '#64748B', fontSize: '1.2rem', marginTop: '0.75rem' }}>
              Usa tu dispositivo móvil para subir los documentos que deseas imprimir
            </p>
          </div>

          {/* Status checklist */}
          <div className="flex flex-col gap-3">
            {statuses.map(({ icon: Icon, label, active, color }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 rounded-xl"
                style={{ background: '#0A1628', border: `1px solid ${active ? 'rgba(16,185,129,0.2)' : '#1E3A6E'}` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: active ? 'rgba(16,185,129,0.15)' : '#0F1E3D' }}
                >
                  <Icon size={18} color={color} />
                </div>
                <span style={{ color: active ? '#E2E8F0' : '#475569', fontSize: '1.05rem', flex: 1 }}>
                  {label}
                </span>
                {active && (
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: '#10B981' }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div
            className="rounded-2xl p-6"
            style={{ background: '#0A1628', border: '1px solid #1E3A6E' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} color="#64748B" />
              <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Tiempo de sesión restante</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span
                style={{
                  color: seconds < 60 ? '#EF4444' : '#F1F5F9',
                  fontSize: '4rem',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  lineHeight: 1,
                }}
              >
                {timeStr}
              </span>
              <span style={{ color: '#475569', fontSize: '1rem' }}>min</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: '#1E3A6E' }}>
              <motion.div
                className="h-2 rounded-full"
                style={{ background: seconds < 60 ? '#EF4444' : '#2563EB', width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Right column - QR reminder */}
        <div className="flex flex-col items-center gap-5">
          <p style={{ color: '#475569', fontSize: '0.9rem', letterSpacing: '0.06em' }}>
            CÓDIGO DE ACCESO MÓVIL
          </p>
          <div className="rounded-2xl p-4" style={{ background: '#FFFFFF', boxShadow: '0 0 40px rgba(37,99,235,0.2)' }}>
            <QRCodeSVG size={170} darkColor="#0F172A" lightColor="#FFFFFF" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span style={{ color: '#64748B', fontSize: '0.9rem' }}>ID de sesión</span>
            <span
              style={{
                color: '#60A5FA',
                fontWeight: 700,
                fontSize: '1.5rem',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              IMP-2847
            </span>
          </div>
          <AnimatePresence>
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)' }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: '#2563EB' }} />
              <span style={{ color: '#60A5FA', fontSize: '0.85rem' }}>Esperando conexión...</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-12 py-5" style={{ borderTop: '1px solid #0A1628' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
          <span style={{ color: '#475569', fontSize: '0.85rem' }}>KIOSK-001 · Sistema listo</span>
        </div>
        <span style={{ color: '#334155', fontSize: '0.85rem' }}>Toca en cualquier lugar para cancelar la sesión</span>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Smartphone, ChevronRight } from 'lucide-react';

// Kiosk screens
import { KioskIdle } from './components/kiosk/KioskIdle';
import { KioskWaiting } from './components/kiosk/KioskWaiting';
import { KioskPayment } from './components/kiosk/KioskPayment';
import { KioskPrinting } from './components/kiosk/KioskPrinting';
import { KioskDone } from './components/kiosk/KioskDone';
import { KioskError } from './components/kiosk/KioskError';

// Mobile screens
import { MobileSession } from './components/mobile/MobileSession';
import { MobileUpload } from './components/mobile/MobileUpload';
import { MobileConfig } from './components/mobile/MobileConfig';
import { MobileSummary } from './components/mobile/MobileSummary';
import { MobilePayment } from './components/mobile/MobilePayment';
import { MobileProgress } from './components/mobile/MobileProgress';
import { MobileCompletion } from './components/mobile/MobileCompletion';

const kioskScreens = [
  { id: 'kiosk-idle', label: 'Pantalla Idle', sub: 'QR · Animación loop', Component: KioskIdle },
  { id: 'kiosk-waiting', label: 'En espera', sub: 'Sesión activa · Countdown', Component: KioskWaiting },
  { id: 'kiosk-payment', label: 'Pago', sub: 'Inserción de monedas', Component: KioskPayment },
  { id: 'kiosk-printing', label: 'Imprimiendo', sub: 'Progreso · Archivo actual', Component: KioskPrinting },
  { id: 'kiosk-done', label: 'Listo', sub: 'Bandeja · Nueva sesión', Component: KioskDone },
  { id: 'kiosk-error', label: 'Error', sub: 'Código · Retry / Cancel', Component: KioskError },
];

const mobileScreens = [
  { id: 'mob-session', label: 'Sesión', sub: 'ID · Timer · Pasos', Component: MobileSession },
  { id: 'mob-upload', label: 'Subir archivos', sub: 'Drag & drop · PDF', Component: MobileUpload },
  { id: 'mob-config', label: 'Configuración', sub: 'Color · Copias · Tamaño', Component: MobileConfig },
  { id: 'mob-summary', label: 'Resumen', sub: 'Precios · Total MXN', Component: MobileSummary },
  { id: 'mob-payment', label: 'Estado de pago', sub: 'Live feedback · Kiosk', Component: MobilePayment },
  { id: 'mob-progress', label: 'Progreso', sub: 'Checklist · Estado real-time', Component: MobileProgress },
  { id: 'mob-completion', label: 'Completado', sub: 'Éxito · Nueva impresión', Component: MobileCompletion },
];

export default function App() {
  const [activeId, setActiveId] = useState('kiosk-idle');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const allScreens = [...kioskScreens, ...mobileScreens];
  const active = allScreens.find((s) => s.id === activeId)!;
  const isKiosk = activeId.startsWith('kiosk-');
  const ActiveComponent = active.Component;

  const currentKioskIdx = kioskScreens.findIndex((s) => s.id === activeId);
  const currentMobileIdx = mobileScreens.findIndex((s) => s.id === activeId);

  const handleNext = () => {
    if (isKiosk && currentKioskIdx < kioskScreens.length - 1) {
      setActiveId(kioskScreens[currentKioskIdx + 1].id);
    } else if (!isKiosk && currentMobileIdx < mobileScreens.length - 1) {
      setActiveId(mobileScreens[currentMobileIdx + 1].id);
    }
  };

  const handlePrev = () => {
    if (isKiosk && currentKioskIdx > 0) {
      setActiveId(kioskScreens[currentKioskIdx - 1].id);
    } else if (!isKiosk && currentMobileIdx > 0) {
      setActiveId(mobileScreens[currentMobileIdx - 1].id);
    }
  };

  const hasNext = isKiosk
    ? currentKioskIdx < kioskScreens.length - 1
    : currentMobileIdx < mobileScreens.length - 1;
  const hasPrev = isKiosk ? currentKioskIdx > 0 : currentMobileIdx > 0;

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif', background: '#09090B' }}
    >
      {/* Sidebar */}
      <div
        className="flex flex-col h-full flex-shrink-0 overflow-hidden"
        style={{
          width: sidebarOpen ? 260 : 0,
          transition: 'width 0.25s ease',
          background: '#0C0C0E',
          borderRight: '1px solid #1C1C1F',
        }}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex-shrink-0" style={{ borderBottom: '1px solid #1C1C1F' }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: '#2563EB' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                <path d="M2 3h10v2H2V3zm2 4h6v2H4V7zm-2 4h10v1H2v-1z" />
              </svg>
            </div>
            <div>
              <p style={{ color: '#F4F4F5', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                IMPRIMIENDO
              </p>
              <p style={{ color: '#52525B', fontSize: '0.65rem' }}>UI Kit v1.0</p>
            </div>
          </div>
        </div>

        {/* Screen list */}
        <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-4">
          {/* Kiosk section */}
          <div>
            <div className="flex items-center gap-2 px-2 py-2 mb-1">
              <Monitor size={12} color="#52525B" />
              <span style={{ color: '#52525B', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                KIOSCO
              </span>
              <span
                className="ml-auto px-1.5 py-0.5 rounded-full"
                style={{ background: '#1C1C1F', color: '#71717A', fontSize: '0.6rem' }}
              >
                {kioskScreens.length}
              </span>
            </div>
            {kioskScreens.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left"
                style={{
                  background: activeId === s.id ? 'rgba(37,99,235,0.12)' : 'transparent',
                  border: `1px solid ${activeId === s.id ? 'rgba(37,99,235,0.25)' : 'transparent'}`,
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    color: activeId === s.id ? '#60A5FA' : '#52525B',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    minWidth: 16,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      color: activeId === s.id ? '#F4F4F5' : '#A1A1AA',
                      fontWeight: activeId === s.id ? 600 : 400,
                      fontSize: '0.82rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.label}
                  </p>
                  <p style={{ color: '#3F3F46', fontSize: '0.65rem', marginTop: '0.05rem' }}>{s.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#1C1C1F', margin: '0 4px' }} />

          {/* Mobile section */}
          <div>
            <div className="flex items-center gap-2 px-2 py-2 mb-1">
              <Smartphone size={12} color="#52525B" />
              <span style={{ color: '#52525B', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                MÓVIL
              </span>
              <span
                className="ml-auto px-1.5 py-0.5 rounded-full"
                style={{ background: '#1C1C1F', color: '#71717A', fontSize: '0.6rem' }}
              >
                {mobileScreens.length}
              </span>
            </div>
            {mobileScreens.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left"
                style={{
                  background: activeId === s.id ? 'rgba(37,99,235,0.12)' : 'transparent',
                  border: `1px solid ${activeId === s.id ? 'rgba(37,99,235,0.25)' : 'transparent'}`,
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    color: activeId === s.id ? '#60A5FA' : '#52525B',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    minWidth: 16,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      color: activeId === s.id ? '#F4F4F5' : '#A1A1AA',
                      fontWeight: activeId === s.id ? 600 : 400,
                      fontSize: '0.82rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.label}
                  </p>
                  <p style={{ color: '#3F3F46', fontSize: '0.65rem', marginTop: '0.05rem' }}>{s.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 flex-shrink-0" style={{ borderTop: '1px solid #1C1C1F' }}>
          <p style={{ color: '#3F3F46', fontSize: '0.65rem', textAlign: 'center' }}>
            {kioskScreens.length + mobileScreens.length} pantallas · 2 superficies
          </p>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div
          className="flex items-center gap-4 px-5 py-3 flex-shrink-0"
          style={{ background: '#0C0C0E', borderBottom: '1px solid #1C1C1F' }}
        >
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="w-7 h-7 flex flex-col items-center justify-center gap-1 rounded-lg"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div style={{ width: 14, height: 1.5, background: '#52525B', borderRadius: 2 }} />
            <div style={{ width: 14, height: 1.5, background: '#52525B', borderRadius: 2 }} />
            <div style={{ width: 14, height: 1.5, background: '#52525B', borderRadius: 2 }} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <span style={{ color: '#52525B', fontSize: '0.82rem' }}>
              {isKiosk ? 'Kiosco' : 'Móvil'}
            </span>
            <ChevronRight size={12} color="#3F3F46" />
            <span style={{ color: '#A1A1AA', fontSize: '0.82rem', fontWeight: 500 }}>
              {active.label}
            </span>
          </div>

          {/* Surface badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: isKiosk ? 'rgba(37,99,235,0.1)' : 'rgba(16,185,129,0.1)',
              border: `1px solid ${isKiosk ? 'rgba(37,99,235,0.25)' : 'rgba(16,185,129,0.25)'}`,
            }}
          >
            {isKiosk ? (
              <Monitor size={11} color="#60A5FA" />
            ) : (
              <Smartphone size={11} color="#34D399" />
            )}
            <span
              style={{
                color: isKiosk ? '#60A5FA' : '#34D399',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}
            >
              {isKiosk ? 'Kiosco · 1920×1080' : 'Móvil · 390×844'}
            </span>
          </div>

          {/* Nav arrows */}
          <div className="ml-auto flex gap-2">
            <button
              onClick={handlePrev}
              disabled={!hasPrev}
              className="px-3 py-1.5 rounded-lg"
              style={{
                background: hasPrev ? '#1C1C1F' : 'transparent',
                border: '1px solid #27272A',
                color: hasPrev ? '#A1A1AA' : '#3F3F46',
                cursor: hasPrev ? 'pointer' : 'not-allowed',
                fontSize: '0.75rem',
              }}
            >
              ← Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={!hasNext}
              className="px-3 py-1.5 rounded-lg"
              style={{
                background: hasNext ? '#2563EB' : '#1C1C1F',
                border: `1px solid ${hasNext ? '#2563EB' : '#27272A'}`,
                color: hasNext ? 'white' : '#3F3F46',
                cursor: hasNext ? 'pointer' : 'not-allowed',
                fontSize: '0.75rem',
              }}
            >
              Siguiente →
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div
          className="flex-1 flex items-center justify-center overflow-hidden relative"
          style={{ background: isKiosk ? '#141416' : '#1A1A1D' }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #27272A 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
              opacity: 0.4,
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative z-10 overflow-hidden"
              style={
                isKiosk
                  ? {
                      // 16:9 kiosk display
                      width: 'min(90%, calc((100vh - 120px) * 16/9))',
                      aspectRatio: '16/9',
                      borderRadius: 12,
                      boxShadow: '0 0 0 1px #27272A, 0 24px 60px rgba(0,0,0,0.8)',
                    }
                  : {
                      // Phone frame
                      width: 375,
                      height: 'min(780px, calc(100vh - 100px))',
                      borderRadius: 40,
                      boxShadow: '0 0 0 12px #27272A, 0 0 0 13px #1C1C1F, 0 24px 60px rgba(0,0,0,0.8)',
                      overflow: 'hidden',
                    }
              }
            >
              {/* Kiosk bezel notch (top) */}
              {isKiosk && (
                <div
                  className="absolute top-0 left-0 right-0 z-50 pointer-events-none"
                  style={{ height: 3, background: 'rgba(255,255,255,0.04)', borderRadius: '12px 12px 0 0' }}
                />
              )}

              {/* Screen content */}
              <div className="w-full h-full">
                <ActiveComponent />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Screen type label */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full pointer-events-none"
            style={{ background: 'rgba(9,9,11,0.8)', border: '1px solid #27272A', backdropFilter: 'blur(8px)' }}
          >
            {isKiosk ? <Monitor size={12} color="#52525B" /> : <Smartphone size={12} color="#52525B" />}
            <span style={{ color: '#52525B', fontSize: '0.72rem' }}>{active.sub}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Printer, FileText } from 'lucide-react';

interface KioskPrintingProps {
  session?: any;
  onRefresh?: () => void;
}

export function KioskPrinting({ session }: KioskPrintingProps) {
  const files = session?.files || [];
  const totalPages = session?.total_pages || 0;
  const [fileIdx, setFileIdx] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);

  const currentFile = files[fileIdx] || { filename: 'Archivo', page_range: 'all' };
  const estimatedPages = currentFile.page_range === 'all' ? 10 : (currentFile.page_range.split('-').length || 1);
  const currentPage = Math.ceil((pageProgress / 100) * estimatedPages * (currentFile.copies || 1));

  useEffect(() => {
    setPageProgress(0);
    const t = setInterval(() => {
      setPageProgress((p) => {
        if (p >= 100) {
          setFileIdx((i) => (i + 1 < files.length ? i + 1 : i));
          return 0;
        }
        return p + 2.2;
      });
    }, 120);
    return () => clearInterval(t);
  }, [fileIdx]);

  const overallPct =
    ((fileIdx * 100 + pageProgress) / (files.length * 100)) * 100;

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: '#04091A', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 80%, rgba(16,185,129,0.08) 0%, transparent 70%)',
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
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#0A1628', border: '1px solid #1E3A6E' }}>
          <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Sesión</span>
          <span style={{ color: '#60A5FA', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
            IMP-2847
          </span>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-16 gap-8">
        {/* Printer animation */}
        <div className="relative">
          <div
            className="w-32 h-24 rounded-2xl flex items-center justify-center"
            style={{ background: '#0A1628', border: '2px solid #10B981' }}
          >
            <Printer size={48} color="#10B981" />
          </div>
          {/* Paper coming out */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-b-lg"
            style={{ width: 60, background: '#F1F5F9', originY: 0 }}
            animate={{ height: [0, 24, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          />
          {/* Status ring */}
          <motion.div
            className="absolute -inset-3 rounded-3xl"
            style={{ border: '1.5px solid rgba(16,185,129,0.3)' }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>

        {/* Current file info */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
            <span style={{ color: '#10B981', fontSize: '0.85rem', letterSpacing: '0.06em' }}>IMPRIMIENDO</span>
          </div>
          <h1 style={{ color: '#F1F5F9', fontWeight: 800, fontSize: '2.4rem' }}>
            {currentFile.name}
          </h1>
          <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
            Hoja{' '}
            <span style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
              {currentPage}
            </span>{' '}
            de{' '}
            <span style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
              {currentFile.totalPages}
            </span>
            {' '}· {currentFile.color ? 'Color' : 'Blanco y Negro'}
          </p>
        </div>

        {/* Per-file progress */}
        <div className="w-full max-w-2xl">
          <div className="flex justify-between mb-2">
            <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Progreso del archivo</span>
            <span style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem' }}>
              {Math.round(pageProgress)}%
            </span>
          </div>
          <div className="w-full h-5 rounded-full overflow-hidden" style={{ background: '#0A1628' }}>
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #059669, #10B981)',
                width: `${pageProgress}%`,
              }}
              transition={{ duration: 0.1 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 1.5s infinite',
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* File queue */}
        <div className="w-full max-w-2xl">
          <div className="flex justify-between mb-2">
            <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Progreso general</span>
            <span style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem' }}>
              {Math.round(overallPct)}%
            </span>
          </div>
          <div className="flex gap-2">
            {files.map((f, i) => (
              <div key={i} className="flex-1 flex flex-col gap-1.5">
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                  style={{
                    background: i < fileIdx ? 'rgba(16,185,129,0.1)' : i === fileIdx ? '#0F1E3D' : '#07111F',
                    border: `1px solid ${i < fileIdx ? 'rgba(16,185,129,0.3)' : i === fileIdx ? 'rgba(37,99,235,0.4)' : '#1E3A6E'}`,
                  }}
                >
                  <FileText
                    size={14}
                    color={i < fileIdx ? '#10B981' : i === fileIdx ? '#60A5FA' : '#334155'}
                  />
                  <span
                    style={{
                      color: i < fileIdx ? '#10B981' : i === fileIdx ? '#E2E8F0' : '#475569',
                      fontSize: '0.75rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {f.name}
                  </span>
                  {i < fileIdx && (
                    <span style={{ color: '#10B981', fontSize: '0.7rem' }}>✓</span>
                  )}
                </div>
                <div className="w-full h-1 rounded-full" style={{ background: '#0A1628' }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      background: i < fileIdx ? '#10B981' : i === fileIdx ? '#2563EB' : 'transparent',
                      width: i < fileIdx ? '100%' : i === fileIdx ? `${pageProgress}%` : '0%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#475569', fontSize: '0.95rem' }}>
          Por favor, no retire los documentos hasta que se complete la impresión
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center px-10 py-5" style={{ borderTop: '1px solid #0A1628' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
          <span style={{ color: '#475569', fontSize: '0.85rem' }}>No apague ni mueva el equipo durante la impresión</span>
        </div>
      </div>
    </div>
  );
}

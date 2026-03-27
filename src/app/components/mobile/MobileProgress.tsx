import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, FileText, CheckCircle, Loader, Clock } from 'lucide-react';

interface MobileProgressProps {
  session?: any;
  onRefresh?: () => void;
}

export function MobileProgress({ session, onRefresh }: MobileProgressProps) {
  const files = session?.files || [];
  const [statuses, setStatuses] = useState<string[]>(files.map(() => 'pending'));
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (onRefresh) {
      const interval = setInterval(onRefresh, 3000);
      return () => clearInterval(interval);
    }
  }, [onRefresh]);

  useEffect(() => {
    const currentIdx = statuses.findIndex((s) => s === 'printing');
    if (currentIdx === -1) return;
    const totalPages = files[currentIdx].pages;

    setCurrentPage(0);
    setProgress(0);

    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + 3;
        setCurrentPage(Math.ceil((next / 100) * totalPages));
        if (next >= 100) {
          setStatuses((prev) => {
            const copy = [...prev];
            copy[currentIdx] = 'done';
            if (currentIdx + 1 < files.length) copy[currentIdx + 1] = 'printing';
            return copy;
          });
        }
        return next >= 100 ? 0 : next;
      });
    }, 150);
    return () => clearInterval(t);
  }, [statuses]);

  const doneCount = statuses.filter((s) => s === 'done').length;
  const printingIdx = statuses.findIndex((s) => s === 'printing');
  const totalPages = files.reduce((s, f) => s + f.pages, 0);
  const donePages = files
    .filter((_, i) => statuses[i] === 'done')
    .reduce((s, f) => s + f.pages, 0);
  const overallPct = Math.round(((donePages + (printingIdx >= 0 ? (progress / 100) * files[printingIdx].pages : 0)) / totalPages) * 100);

  const allDone = statuses.every((s) => s === 'done');

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
          <p style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '0.95rem' }}>Progreso de impresión</p>
          <p style={{ color: '#64748B', fontSize: '0.75rem' }}>Sesión IMP-2847</p>
        </div>
        <span
          style={{
            color: allDone ? '#10B981' : '#60A5FA',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.85rem',
            fontWeight: 700,
          }}
        >
          {doneCount}/{files.length}
        </span>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4 flex-1">
        {/* Overall progress */}
        <div
          className="rounded-2xl px-5 py-4"
          style={{ background: allDone ? 'rgba(16,185,129,0.08)' : '#FFFFFF', border: `1.5px solid ${allDone ? 'rgba(16,185,129,0.3)' : '#E2E8F0'}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {allDone ? (
                <CheckCircle size={16} color="#10B981" />
              ) : (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}>
                  <Loader size={16} color="#2563EB" />
                </motion.div>
              )}
              <span style={{ color: '#0F172A', fontWeight: 600, fontSize: '0.9rem' }}>
                {allDone ? 'Impresión completada' : 'Imprimiendo…'}
              </span>
            </div>
            <span
              style={{
                color: allDone ? '#10B981' : '#2563EB',
                fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {overallPct}%
            </span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: allDone
                  ? '#10B981'
                  : 'linear-gradient(90deg, #1D4ED8, #3B82F6)',
                width: `${overallPct}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span style={{ color: '#94A3B8', fontSize: '0.72rem' }}>
              {donePages} hojas completadas
            </span>
            <span style={{ color: '#94A3B8', fontSize: '0.72rem' }}>
              {totalPages} hojas totales
            </span>
          </div>
        </div>

        {/* File checklist */}
        <div className="flex flex-col gap-3">
          {files.map((f, i) => {
            const status = statuses[i];
            const isPrinting = status === 'printing';
            const isDone = status === 'done';
            const isPending = status === 'pending';

            return (
              <motion.div
                key={f.id}
                layout
                className="rounded-2xl overflow-hidden"
                style={{
                  background: '#FFFFFF',
                  border: `1.5px solid ${isDone ? 'rgba(16,185,129,0.25)' : isPrinting ? 'rgba(37,99,235,0.3)' : '#E2E8F0'}`,
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isDone
                        ? 'rgba(16,185,129,0.1)'
                        : isPrinting
                        ? 'rgba(37,99,235,0.08)'
                        : '#F1F5F9',
                    }}
                  >
                    {isDone ? (
                      <CheckCircle size={16} color="#10B981" />
                    ) : isPrinting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                      >
                        <Loader size={16} color="#2563EB" />
                      </motion.div>
                    ) : (
                      <Clock size={16} color="#94A3B8" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        color: isPending ? '#94A3B8' : '#0F172A',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {f.name}
                    </p>
                    <p style={{ color: '#94A3B8', fontSize: '0.73rem' }}>
                      {f.pages} págs · {f.color ? 'Color' : 'B&N'}
                    </p>
                  </div>
                  <AnimatePresence mode="wait">
                    {isDone && (
                      <motion.span
                        key="done"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', fontSize: '0.72rem', fontWeight: 700 }}
                      >
                        LISTO
                      </motion.span>
                    )}
                    {isPrinting && (
                      <motion.span
                        key="printing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB', fontSize: '0.72rem', fontWeight: 700 }}
                      >
                        IMPRIMIENDO
                      </motion.span>
                    )}
                    {isPending && (
                      <motion.span
                        key="pending"
                        className="px-2.5 py-1 rounded-full"
                        style={{ background: '#F1F5F9', color: '#94A3B8', fontSize: '0.72rem', fontWeight: 600 }}
                      >
                        EN ESPERA
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Per-file progress bar */}
                {isPrinting && (
                  <div className="px-4 pb-3">
                    <div className="flex justify-between mb-1">
                      <span style={{ color: '#64748B', fontSize: '0.72rem' }}>
                        Hoja {currentPage} de {f.pages}
                      </span>
                      <span style={{ color: '#2563EB', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace' }}>
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: '#2563EB', width: `${progress}%` }}
                        transition={{ duration: 0.15 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Info note */}
        {!allDone && (
          <div
            className="flex items-start gap-2 px-4 py-3 rounded-xl"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
          >
            <FileText size={14} color="#94A3B8" className="flex-shrink-0 mt-0.5" />
            <p style={{ color: '#64748B', fontSize: '0.78rem', lineHeight: 1.5 }}>
              Permanece cerca del kiosk. Recoge tus impresiones en la bandeja de salida al finalizar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

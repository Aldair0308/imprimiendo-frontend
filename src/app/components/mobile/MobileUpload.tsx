import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Upload, FileText, X, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';

interface MobileUploadProps {
  session?: any;
  onUpload?: (file: File) => void;
  onBack?: () => void;
}

export function MobileUpload({ session, onUpload, onBack }: MobileUploadProps) {
  const [files, setFiles] = useState<any[]>(session?.files || []);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFakeUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setFiles((f) => [
        ...f,
        { id: 3, name: 'Presentacion.pdf', size: '1.8 MB', pages: 12, status: 'done' },
      ]);
      setUploading(false);
    }, 1800);
  };

  const removeFile = (id: number) => setFiles((f) => f.filter((x) => x.id !== id));

  return (
    <div
      className="w-full h-full flex flex-col overflow-auto"
      style={{ background: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Status bar */}
      <div style={{ height: 44, background: '#1E293B' }} />

      {/* Nav */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: '#1E293B' }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#2563EB' }}>
          <Zap size={14} color="white" fill="white" />
        </div>
        <div className="flex-1">
          <p style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '0.95rem' }}>Subir archivos</p>
          <p style={{ color: '#64748B', fontSize: '0.75rem' }}>Sesión IMP-2847</p>
        </div>
        <span style={{ color: '#60A5FA', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>2/3 archivos</span>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4 flex-1">
        {/* Upload zone */}
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFakeUpload(); }}
          animate={{ borderColor: dragging ? '#2563EB' : '#CBD5E1', scale: dragging ? 1.01 : 1 }}
          className="flex flex-col items-center justify-center gap-3 py-8 rounded-2xl"
          style={{
            border: '2px dashed #CBD5E1',
            background: dragging ? 'rgba(37,99,235,0.05)' : '#FFFFFF',
            cursor: 'pointer',
          }}
          onClick={!uploading ? handleFakeUpload : undefined}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-10 h-10 rounded-full"
                style={{ border: '3px solid #E2E8F0', borderTopColor: '#2563EB' }}
              />
              <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Subiendo archivo…</span>
            </div>
          ) : (
            <>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(37,99,235,0.08)' }}
              >
                <Upload size={26} color="#2563EB" />
              </div>
              <div className="text-center">
                <p style={{ color: '#0F172A', fontWeight: 600, fontSize: '0.95rem' }}>
                  Arrastra tu PDF aquí
                </p>
                <p style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                  o toca para seleccionar archivos
                </p>
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}
              >
                <AlertCircle size={12} color="#2563EB" />
                <span style={{ color: '#2563EB', fontSize: '0.75rem', fontWeight: 500 }}>Solo archivos PDF</span>
              </div>
            </>
          )}
        </motion.div>

        {/* File limit info */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
        >
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
            <div
              className="h-full rounded-full"
              style={{ background: '#2563EB', width: `${(files.length / 5) * 100}%` }}
            />
          </div>
          <span style={{ color: '#64748B', fontSize: '0.78rem' }}>
            {files.length}/5 archivos · máx 20 MB c/u
          </span>
        </div>

        {/* Uploaded files */}
        <div className="flex flex-col gap-2">
          <span style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em' }}>
            ARCHIVOS SUBIDOS
          </span>
          <AnimatePresence>
            {files.map((f) => (
              <motion.div
                key={f.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(37,99,235,0.08)' }}
                >
                  <FileText size={18} color="#2563EB" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    style={{ color: '#0F172A', fontWeight: 600, fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {f.name}
                  </p>
                  <p style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                    {f.size} · {f.pages} págs
                  </p>
                </div>
                <CheckCircle size={16} color="#10B981" className="flex-shrink-0" />
                <button
                  onClick={() => removeFile(f.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                >
                  <X size={14} color="#CBD5E1" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={files.length === 0}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl"
          style={{
            background: files.length > 0 ? '#2563EB' : '#E2E8F0',
            border: 'none',
            cursor: files.length > 0 ? 'pointer' : 'not-allowed',
          }}
        >
          <span style={{ color: files.length > 0 ? 'white' : '#94A3B8', fontWeight: 700, fontSize: '1rem' }}>
            Continuar a configuración
          </span>
          <ChevronRight size={18} color={files.length > 0 ? 'white' : '#94A3B8'} />
        </motion.button>
      </div>
    </div>
  );
}

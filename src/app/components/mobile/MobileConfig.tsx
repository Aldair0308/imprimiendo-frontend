import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Zap, ChevronRight, ChevronDown, FileText, Minus, Plus } from 'lucide-react';

const files = [
  { id: 1, name: 'Tesis_Final.pdf', pages: 45 },
  { id: 2, name: 'CV_2024.pdf', pages: 3 },
  { id: 3, name: 'Presentacion.pdf', pages: 12 },
];

interface FileConfig {
  color: boolean;
  pageRange: string;
  copies: number;
  orientation: 'portrait' | 'landscape';
  size: string;
  scale: string;
}

const defaults: FileConfig = {
  color: true,
  pageRange: 'all',
  copies: 1,
  orientation: 'portrait',
  size: 'carta',
  scale: '100%',
};

export function MobileConfig() {
  const [expanded, setExpanded] = useState<number>(1);
  const [configs, setConfigs] = useState<Record<number, FileConfig>>({
    1: { ...defaults },
    2: { ...defaults, color: false },
    3: { ...defaults, orientation: 'landscape' },
  });

  const update = (id: number, key: keyof FileConfig, value: unknown) =>
    setConfigs((c) => ({ ...c, [id]: { ...c[id], [key]: value } }));

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
          <p style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '0.95rem' }}>Configurar impresión</p>
          <p style={{ color: '#64748B', fontSize: '0.75rem' }}>Sesión IMP-2847</p>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3 flex-1 overflow-auto">
        {files.map((f) => {
          const cfg = configs[f.id];
          const isOpen = expanded === f.id;

          return (
            <div key={f.id} className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0' }}>
              {/* File header */}
              <button
                onClick={() => setExpanded(isOpen ? -1 : f.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5"
                style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: cfg.color ? 'rgba(37,99,235,0.08)' : '#F1F5F9' }}
                >
                  <FileText size={17} color={cfg.color ? '#2563EB' : '#64748B'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ color: '#0F172A', fontWeight: 600, fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.name}
                  </p>
                  <p style={{ color: '#94A3B8', fontSize: '0.72rem', marginTop: '0.1rem' }}>
                    {cfg.color ? 'Color' : 'B&N'} · {cfg.copies} {cfg.copies > 1 ? 'copias' : 'copia'} · {cfg.orientation === 'portrait' ? 'Vertical' : 'Horizontal'} · {cfg.size}
                  </p>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} color="#94A3B8" />
                </motion.div>
              </button>

              {/* Config panel */}
              <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="px-4 pb-4 flex flex-col gap-4" style={{ borderTop: '1px solid #F1F5F9' }}>
                  {/* Color */}
                  <Row label="Modo de color">
                    <div
                      className="flex rounded-xl overflow-hidden"
                      style={{ border: '1.5px solid #E2E8F0', background: '#F8FAFC' }}
                    >
                      {[
                        { v: true, label: 'Color' },
                        { v: false, label: 'B&N' },
                      ].map(({ v, label }) => (
                        <button
                          key={String(v)}
                          onClick={() => update(f.id, 'color', v)}
                          className="px-4 py-2"
                          style={{
                            background: cfg.color === v ? '#2563EB' : 'transparent',
                            color: cfg.color === v ? 'white' : '#64748B',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            transition: 'all 0.15s',
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </Row>

                  {/* Page range */}
                  <Row label="Rango de páginas">
                    <div
                      className="flex rounded-xl overflow-hidden"
                      style={{ border: '1.5px solid #E2E8F0', background: '#F8FAFC' }}
                    >
                      {[
                        { v: 'all', label: 'Todas' },
                        { v: 'custom', label: 'Personalizado' },
                      ].map(({ v, label }) => (
                        <button
                          key={v}
                          onClick={() => update(f.id, 'pageRange', v)}
                          className="px-3 py-2"
                          style={{
                            background: cfg.pageRange === v ? '#2563EB' : 'transparent',
                            color: cfg.pageRange === v ? 'white' : '#64748B',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {cfg.pageRange === 'custom' && (
                      <input
                        placeholder="ej. 1-5, 8, 11-13"
                        className="mt-2 w-full px-3 py-2 rounded-xl"
                        style={{
                          background: '#F1F5F9',
                          border: '1.5px solid #E2E8F0',
                          color: '#0F172A',
                          fontSize: '0.85rem',
                          outline: 'none',
                        }}
                      />
                    )}
                  </Row>

                  {/* Copies */}
                  <Row label="Copias">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => update(f.id, 'copies', Math.max(1, cfg.copies - 1))}
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: '#F1F5F9', border: '1.5px solid #E2E8F0', cursor: 'pointer' }}
                      >
                        <Minus size={14} color="#64748B" />
                      </button>
                      <span style={{ color: '#0F172A', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', minWidth: 24, textAlign: 'center' }}>
                        {cfg.copies}
                      </span>
                      <button
                        onClick={() => update(f.id, 'copies', Math.min(99, cfg.copies + 1))}
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: '#2563EB', border: 'none', cursor: 'pointer' }}
                      >
                        <Plus size={14} color="white" />
                      </button>
                    </div>
                  </Row>

                  {/* Orientation */}
                  <Row label="Orientación">
                    <div className="flex gap-2">
                      {[
                        { v: 'portrait', label: '↑ Vertical' },
                        { v: 'landscape', label: '→ Horizontal' },
                      ].map(({ v, label }) => (
                        <button
                          key={v}
                          onClick={() => update(f.id, 'orientation', v)}
                          className="px-3 py-2 rounded-xl"
                          style={{
                            background: cfg.orientation === v ? 'rgba(37,99,235,0.08)' : '#F1F5F9',
                            border: `1.5px solid ${cfg.orientation === v ? 'rgba(37,99,235,0.4)' : '#E2E8F0'}`,
                            color: cfg.orientation === v ? '#2563EB' : '#64748B',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </Row>

                  {/* Size */}
                  <Row label="Tamaño">
                    <div className="flex gap-2 flex-wrap">
                      {['Carta', 'Oficio', 'A4'].map((s) => (
                        <button
                          key={s}
                          onClick={() => update(f.id, 'size', s.toLowerCase())}
                          className="px-3 py-2 rounded-xl"
                          style={{
                            background: cfg.size === s.toLowerCase() ? 'rgba(37,99,235,0.08)' : '#F1F5F9',
                            border: `1.5px solid ${cfg.size === s.toLowerCase() ? 'rgba(37,99,235,0.4)' : '#E2E8F0'}`,
                            color: cfg.size === s.toLowerCase() ? '#2563EB' : '#64748B',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Row>

                  {/* Scale */}
                  <Row label="Escala">
                    <div className="flex gap-2 flex-wrap">
                      {['75%', '100%', '125%', 'Ajustar'].map((s) => (
                        <button
                          key={s}
                          onClick={() => update(f.id, 'scale', s)}
                          className="px-3 py-2 rounded-xl"
                          style={{
                            background: cfg.scale === s ? 'rgba(37,99,235,0.08)' : '#F1F5F9',
                            border: `1.5px solid ${cfg.scale === s ? 'rgba(37,99,235,0.4)' : '#E2E8F0'}`,
                            color: cfg.scale === s ? '#2563EB' : '#64748B',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Row>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl"
          style={{ background: '#2563EB', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Ver resumen y precio</span>
          <ChevronRight size={18} color="white" />
        </motion.button>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 pt-3" style={{ borderTop: '1px solid #F1F5F9' }}>
      <span style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em' }}>
        {label.toUpperCase()}
      </span>
      {children}
    </div>
  );
}
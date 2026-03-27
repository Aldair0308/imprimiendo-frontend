import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ChevronRight, ChevronDown, FileText, Minus, Plus } from 'lucide-react';

interface MobileConfigProps {
  session?: any;
  files?: any[];
  onConfigSave?: (fileId: number, config: any) => void;
  onBack?: () => void;
  onNext?: () => void;
}

export function MobileConfig({ session, files = [], onConfigSave, onBack, onNext }: MobileConfigProps) {
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

  const [expanded, setExpanded] = useState<number>(1);
  const [configs, setConfigs] = useState<Record<number, FileConfig>>(() => {
    const initial: Record<number, FileConfig> = {};
    files.forEach((f: any, i: number) => {
      initial[f.id] = {
        color: f.color ?? true,
        pageRange: f.page_range || 'all',
        copies: f.copies || 1,
        orientation: (f.orientation || 'portrait') as 'portrait' | 'landscape',
        size: f.paper_size || 'carta',
        scale: `${f.scale || 100}%`,
      };
    });
    return Object.keys(initial).length > 0 ? initial : {
      1: { ...defaults },
      2: { ...defaults, color: false },
      3: { ...defaults, orientation: 'landscape' },
    };
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
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <ChevronRight size={20} color="#64748B" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#2563EB' }}>
          <Zap size={14} color="white" fill="white" />
        </div>
        <div className="flex-1">
          <p style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '0.95rem' }}>Configurar archivos</p>
          <p style={{ color: '#64748B', fontSize: '0.75rem' }}>Sesión {session?.id?.slice(0, 8) || 'IMP-2847'}</p>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4 flex-1">
        {files.map((file: any, i: number) => (
          <motion.div
            key={file.id || i}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
          >
            {/* Header - clickable */}
            <button
              onClick={() => setExpanded(expanded === file.id ? 0 : file.id)}
              className="w-full flex items-center gap-3 px-4 py-3"
              style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: configs[file.id]?.color ? 'rgba(37,99,235,0.08)' : '#F1F5F9' }}>
                <FileText size={15} color={configs[file.id]?.color ? '#2563EB' : '#64748B'} />
              </div>
              <span style={{ color: '#0F172A', fontWeight: 600, fontSize: '0.88rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {file.filename || `Archivo ${i + 1}`}
              </span>
              <ChevronDown size={18} color="#64748B" style={{ transform: expanded === file.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {/* Expanded content */}
            <AnimatePresence>
              {expanded === file.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 flex flex-col gap-4" style={{ borderTop: '1px solid #F1F5F9' }}>
                    {/* Color toggle */}
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#475569', fontSize: '0.85rem' }}>Color</span>
                      <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
                        <button
                          onClick={() => update(file.id, 'color', true)}
                          className="px-3 py-1.5"
                          style={{ background: configs[file.id]?.color ? '#2563EB' : '#FFFFFF', border: 'none', cursor: 'pointer' }}
                        >
                          <span style={{ color: configs[file.id]?.color ? 'white' : '#64748B', fontSize: '0.75rem' }}>Color</span>
                        </button>
                        <button
                          onClick={() => update(file.id, 'color', false)}
                          className="px-3 py-1.5"
                          style={{ background: !configs[file.id]?.color ? '#2563EB' : '#FFFFFF', border: 'none', cursor: 'pointer' }}
                        >
                          <span style={{ color: !configs[file.id]?.color ? 'white' : '#64748B', fontSize: '0.75rem' }}>B/N</span>
                        </button>
                      </div>
                    </div>

                    {/* Copies */}
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#475569', fontSize: '0.85rem' }}>Copias</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => update(file.id, 'copias', Math.max(1, (configs[file.id]?.copies || 1) - 1))}
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: '#F1F5F9', border: 'none', cursor: 'pointer' }}
                        >
                          <Minus size={14} color="#64748B" />
                        </button>
                        <span style={{ color: '#0F172A', fontWeight: 600, fontSize: '0.9rem', minWidth: 24, textAlign: 'center' }}>
                          {configs[file.id]?.copies || 1}
                        </span>
                        <button
                          onClick={() => update(file.id, 'copias', (configs[file.id]?.copies || 1) + 1)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: '#F1F5F9', border: 'none', cursor: 'pointer' }}
                        >
                          <Plus size={14} color="#64748B" />
                        </button>
                      </div>
                    </div>

                    {/* Page range */}
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#475569', fontSize: '0.85rem' }}>Páginas</span>
                      <select
                        value={configs[file.id]?.pageRange || 'all'}
                        onChange={(e) => update(file.id, 'pageRange', e.target.value)}
                        className="px-3 py-1.5 rounded-lg"
                        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', fontSize: '0.8rem' }}
                      >
                        <option value="all">Todas</option>
                        <option value="1">Primera página</option>
                        <option value="1-5">1-5</option>
                        <option value="1-10">1-10</option>
                      </select>
                    </div>

                    {/* Orientation */}
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#475569', fontSize: '0.85rem' }}>Orientación</span>
                      <select
                        value={configs[file.id]?.orientation || 'portrait'}
                        onChange={(e) => update(file.id, 'orientation', e.target.value)}
                        className="px-3 py-1.5 rounded-lg"
                        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', fontSize: '0.8rem' }}
                      >
                        <option value="portrait">Vertical</option>
                        <option value="landscape">Horizontal</option>
                      </select>
                    </div>

                    {/* Paper size */}
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#475569', fontSize: '0.85rem' }}>Tamaño</span>
                      <select
                        value={configs[file.id]?.size || 'carta'}
                        onChange={(e) => update(file.id, 'size', e.target.value)}
                        className="px-3 py-1.5 rounded-lg"
                        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', fontSize: '0.8rem' }}
                      >
                        <option value="carta">Carta</option>
                        <option value="oficio">Oficio</option>
                      </select>
                    </div>

                    {/* Scale */}
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#475569', fontSize: '0.85rem' }}>Escala</span>
                      <select
                        value={configs[file.id]?.scale || '100%'}
                        onChange={(e) => update(file.id, 'scale', e.target.value)}
                        className="px-3 py-1.5 rounded-lg"
                        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', fontSize: '0.8rem' }}
                      >
                        <option value="50%">50%</option>
                        <option value="75%">75%</option>
                        <option value="100%">100%</option>
                        <option value="150%">150%</option>
                        <option value="200%">200%</option>
                      </select>
                    </div>

                    {/* Double sided */}
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#475569', fontSize: '0.85rem' }}>Doble cara</span>
                      <button
                        onClick={() => update(file.id, 'doubleSided', !configs[file.id]?.doubleSided)}
                        className="w-12 h-6 rounded-full relative"
                        style={{ background: configs[file.id]?.doubleSided ? '#2563EB' : '#E2E8F0', border: 'none', cursor: 'pointer' }}
                      >
                        <div
                          className="absolute w-5 h-5 rounded-full top-0.5 transition-all"
                          style={{ background: 'white', left: configs[file.id]?.doubleSided ? 26 : 2, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl"
          style={{ background: '#2563EB', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Continuar</span>
          <ChevronRight size={18} color="white" />
        </motion.button>
      </div>
    </div>
  );
}
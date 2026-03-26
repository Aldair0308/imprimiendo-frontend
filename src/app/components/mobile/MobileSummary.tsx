import { motion } from 'motion/react';
import { Zap, FileText, ChevronRight, Info } from 'lucide-react';

const items = [
  {
    name: 'Tesis_Final.pdf',
    pages: 45,
    copies: 2,
    color: true,
    orientation: 'Vertical',
    size: 'Carta',
    scale: '100%',
    pricePerPage: 3.0,
    subtotal: 270.0,
  },
  {
    name: 'CV_2024.pdf',
    pages: 3,
    copies: 1,
    color: false,
    orientation: 'Vertical',
    size: 'Carta',
    scale: '100%',
    pricePerPage: 1.5,
    subtotal: 4.5,
  },
  {
    name: 'Presentacion.pdf',
    pages: 12,
    copies: 1,
    color: true,
    orientation: 'Horizontal',
    size: 'Carta',
    scale: '100%',
    pricePerPage: 3.0,
    subtotal: 36.0,
  },
];

const TOTAL = items.reduce((s, i) => s + i.subtotal, 0);

export function MobileSummary() {
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
          <p style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '0.95rem' }}>Resumen de impresión</p>
          <p style={{ color: '#64748B', fontSize: '0.75rem' }}>Sesión IMP-2847</p>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4 flex-1">
        {/* Price info banner */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)' }}
        >
          <Info size={15} color="#2563EB" className="flex-shrink-0 mt-0.5" />
          <p style={{ color: '#3B82F6', fontSize: '0.8rem', lineHeight: 1.5 }}>
            Color: <strong>$3.00/hoja</strong> · Blanco y Negro: <strong>$1.50/hoja</strong> · Los precios incluyen IVA
          </p>
        </div>

        {/* File cards */}
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
          >
            {/* File header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '1px solid #F1F5F9' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: item.color ? 'rgba(37,99,235,0.08)' : '#F1F5F9' }}
              >
                <FileText size={15} color={item.color ? '#2563EB' : '#64748B'} />
              </div>
              <span
                style={{
                  color: '#0F172A',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  color: '#0F172A',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.95rem',
                }}
              >
                ${item.subtotal.toFixed(2)}
              </span>
            </div>

            {/* Config grid */}
            <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: 'Páginas', value: `${item.pages} págs` },
                { label: 'Copias', value: `${item.copies} ${item.copies > 1 ? 'copias' : 'copia'}` },
                { label: 'Modo', value: item.color ? 'Color' : 'Blanco y Negro' },
                { label: 'Orientación', value: item.orientation },
                { label: 'Tamaño', value: item.size },
                { label: 'Escala', value: item.scale },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ color: '#94A3B8', fontSize: '0.72rem', marginBottom: '0.1rem' }}>{label}</p>
                  <p style={{ color: '#475569', fontSize: '0.82rem', fontWeight: 500 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Per-page breakdown */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ background: '#F8FAFC', borderTop: '1px solid #F1F5F9' }}
            >
              <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                ${item.pricePerPage.toFixed(2)}/hoja × {item.pages} págs × {item.copies} copias
              </span>
              <span style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 600 }}>
                = ${item.subtotal.toFixed(2)}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Total card */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl px-5 py-4"
          style={{ background: '#0F172A', border: '1px solid rgba(37,99,235,0.3)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
              {items.length} archivos · {items.reduce((s, i) => s + i.pages * i.copies, 0)} hojas totales
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span style={{ color: '#64748B', fontSize: '1rem' }}>Total a pagar</span>
            <div className="flex items-baseline gap-1">
              <span
                style={{
                  color: '#60A5FA',
                  fontWeight: 900,
                  fontSize: '2rem',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                ${TOTAL.toFixed(2)}
              </span>
              <span style={{ color: '#475569', fontSize: '0.85rem' }}>MXN</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl"
          style={{ background: '#2563EB', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Confirmar e imprimir</span>
          <ChevronRight size={18} color="white" />
        </motion.button>
        <p style={{ color: '#94A3B8', fontSize: '0.78rem', textAlign: 'center', marginTop: '0.6rem' }}>
          El pago se realiza directamente en el kiosk
        </p>
      </div>
    </div>
  );
}

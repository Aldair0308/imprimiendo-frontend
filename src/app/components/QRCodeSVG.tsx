import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeSVGProps {
  size?: number;
  value?: string;
}

export function QRCodeSVG({
  size = 210,
  value = '',
}: QRCodeSVGProps) {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!value) {
      setDataUrl('');
      return;
    }

    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
    .then((url: string) => {
      setDataUrl(url);
      setError('');
    })
    .catch((err: Error) => {
      console.error('QR error:', err);
      setError(err.message);
    });
  }, [value, size]);

  if (error) {
    return (
      <div style={{ 
        width: size, 
        height: size, 
        background: '#FFFFFF', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px'
      }}>
        <span style={{ color: '#EF4444', fontSize: '10px', textAlign: 'center' }}>Error: {error}</span>
      </div>
    );
  }

  if (!value) {
    return (
      <div style={{ 
        width: size, 
        height: size, 
        background: '#FFFFFF', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: '#0F172A', fontSize: '12px' }}>Sin sesión (value vacío)</span>
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div style={{ 
        width: size, 
        height: size, 
        background: '#FFFFFF', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: '#0F172A', fontSize: '12px' }}>Generando QR... value: {value.substring(0, 50)}...</span>
      </div>
    );
  }

  return (
    <img 
      src={dataUrl} 
      alt="QR Code" 
      width={size} 
      height={size}
      style={{ borderRadius: '12px' }}
    />
  );
}
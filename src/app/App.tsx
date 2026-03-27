import { BrowserRouter, Routes, Route, useSearchParams, Navigate } from 'react-router';
import { useState, useEffect } from 'react';

import { KioskIdle } from './components/kiosk/KioskIdle';
import { KioskWaiting } from './components/kiosk/KioskWaiting';
import { KioskPayment } from './components/kiosk/KioskPayment';
import { KioskPrinting } from './components/kiosk/KioskPrinting';
import { KioskDone } from './components/kiosk/KioskDone';
import { KioskError } from './components/kiosk/KioskError';

import { MobileSession } from './components/mobile/MobileSession';
import { MobileUpload } from './components/mobile/MobileUpload';
import { MobileConfig } from './components/mobile/MobileConfig';
import { MobileSummary } from './components/mobile/MobileSummary';
import { MobilePayment } from './components/mobile/MobilePayment';
import { MobileProgress } from './components/mobile/MobileProgress';
import { MobileCompletion } from './components/mobile/MobileCompletion';

import { api, SESSION_STATUS, FILE_STATUS } from './services/api';

function KioskApp() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  
  const [status, setStatus] = useState<string>(SESSION_STATUS.IDLE);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('KioskApp - sessionId:', sessionId, 'session:', session);

  useEffect(() => {
    if (sessionId) {
      loadSession();
      const interval = setInterval(loadSession, 3000);
      return () => clearInterval(interval);
    } else {
      console.log('No sessionId, creating new session...');
      createNewSession();
    }
  }, [sessionId]);

  const loadSession = async () => {
    try {
      console.log('Loading session:', sessionId);
      const result = await api.getKioskSession(sessionId!);
      console.log('getKioskSession result:', result);
      if (result.success) {
        setSession(result.session);
        setStatus(result.session.status || 'idle');
        setError(null);
      } else {
        console.log('Session not found, creating new...');
        setSearchParams({});
        createNewSession();
      }
    } catch (err: any) {
      console.error('loadSession error:', err);
      setError(err.message);
    }
  };

  const createNewSession = async () => {
    try {
      setLoading(true);
      console.log('Creating new session...');
      const result = await api.createSession();
      console.log('createSession result:', result);
      if (result.success) {
        setSearchParams({ session: result.session.id });
        setSession(result.session);
        setStatus(SESSION_STATUS.IDLE);
        setError(null);
      }
    } catch (err: any) {
      console.error('createSession error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSession = async () => {
    await createNewSession();
  };

  const renderScreen = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div style={{ color: '#60A5FA', fontSize: '1.5rem' }}>Cargando...</div>
        </div>
      );
    }

    switch (status) {
      case SESSION_STATUS.IDLE:
        return <KioskIdle session={session} onRefresh={loadSession} />;
      case SESSION_STATUS.ACTIVE:
      case SESSION_STATUS.WAITING_PAYMENT:
        return <KioskWaiting session={session} onRefresh={loadSession} />;
      case 'payment':
        return <KioskPayment session={session} onRefresh={loadSession} />;
      case SESSION_STATUS.PRINTING:
        return <KioskPrinting session={session} onRefresh={loadSession} />;
      case SESSION_STATUS.COMPLETED:
        return <KioskDone session={session} onNewSession={handleNewSession} />;
      case SESSION_STATUS.ERROR:
        return <KioskError session={session} onRetry={loadSession} onCancel={handleNewSession} />;
      default:
        return <KioskIdle session={session} onRefresh={loadSession} />;
    }
  };

  return (
    <div className="w-full h-screen">
      {renderScreen()}
    </div>
  );
}

function MobileApp() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  
  const [session, setSession] = useState<any>(null);
  const [step, setStep] = useState<'session' | 'upload' | 'config' | 'summary' | 'payment' | 'progress' | 'completion'>('session');
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      loadSession();
    }
  }, [sessionId]);

  const loadSession = async () => {
    try {
      const result = await api.getSession(sessionId!);
      if (result.success) {
        setSession(result.session);
        setFiles(result.session.files || []);
        
        if (result.session.status === SESSION_STATUS.COMPLETED) {
          setStep('completion');
        } else if (result.session.status === SESSION_STATUS.PRINTING) {
          setStep('progress');
        } else if (result.session.status === SESSION_STATUS.WAITING_PAYMENT) {
          setStep('payment');
        } else if (files.length > 0) {
          setStep('summary');
        }
      } else if (result.expired) {
        setError('Sesión expirada');
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createSession = async () => {
    try {
      setLoading(true);
      const result = await api.createSession();
      if (result.success) {
        setSearchParams({ session: result.session.id });
        setSession(result.session);
        setStep('upload');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const result = await api.uploadFile(sessionId!, file);
      if (result.success) {
        setFiles(prev => [...prev, result.file]);
        setStep('config');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleConfigSave = async (fileId: number, config: any) => {
    try {
      await api.updateFileConfig(fileId, config);
      await loadSession();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRequestPrint = async () => {
    try {
      await api.requestPrint(sessionId!);
      setStep('payment');
      await loadSession();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleComplete = () => {
    setFiles([]);
    setStep('session');
    setSession(null);
    setSearchParams({});
  };

  const renderScreen = () => {
    if (!sessionId) {
      return <MobileSession onJoin={createSession} />;
    }

    if (loading) {
      return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>;
    }

    switch (step) {
      case 'session':
        return <MobileSession session={session} onJoin={createSession} />;
      case 'upload':
        return <MobileUpload session={session} onUpload={handleFileUpload} onBack={() => setStep('session')} />;
      case 'config':
        return (
          <MobileConfig
            session={session}
            files={files}
            onConfigSave={handleConfigSave}
            onBack={() => setStep('upload')}
            onNext={() => setStep('summary')}
          />
        );
      case 'summary':
        return (
          <MobileSummary
            session={session}
            files={files}
            onBack={() => setStep('config')}
            onPrint={handleRequestPrint}
          />
        );
      case 'payment':
        return <MobilePayment session={session} onRefresh={loadSession} />;
      case 'progress':
        return <MobileProgress session={session} onRefresh={loadSession} />;
      case 'completion':
        return <MobileCompletion session={session} onNew={handleComplete} onClose={() => setSearchParams({})} />;
      default:
        return <MobileSession onJoin={createSession} />;
    }
  };

  return (
    <div className="w-full min-h-screen" style={{ background: '#09090B' }}>
      {renderScreen()}
    </div>
  );
}

function AppContent() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'kiosk';

  return mode === 'mobile' ? <MobileApp /> : <KioskApp />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
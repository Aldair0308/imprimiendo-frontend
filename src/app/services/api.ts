const API_URL = import.meta.env.VITE_API_URL || 'http://10.80.4.130:5001';

export function getBaseUrl() {
  return import.meta.env.VITE_BASE_URL || 'http://10.80.4.130:3000';
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error de conexión' }));
    throw new Error(error.error || 'Error de conexión');
  }
  
  return response.json();
}

export const api = {
  async createSession() {
    return fetchAPI('/session/create', { method: 'POST' });
  },

  async getSession(id: string) {
    return fetchAPI(`/session/${id}`);
  },

  async updateSessionStatus(id: string, status: string) {
    return fetchAPI(`/session/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    });
  },

  async getKioskSession(id: string) {
    return fetchAPI(`/session/${id}/kiosk`);
  },

  async uploadFile(sessionId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('session_id', sessionId);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Error al subir archivo' }));
      throw new Error(error.error || 'Error al subir archivo');
    }

    return response.json();
  },

  async updateFileConfig(fileId: number, config: {
    color: boolean;
    copies: number;
    page_range: string;
    orientation: string;
    paper_size: string;
    scale: number;
    double_sided: boolean;
  }) {
    return fetchAPI(`/file/${fileId}/config`, {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  },

  async deleteFile(fileId: number) {
    return fetchAPI(`/file/${fileId}`, { method: 'DELETE' });
  },

  async calculatePrint(sessionId: string) {
    return fetchAPI('/print/calculate', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId }),
    });
  },

  async requestPrint(sessionId: string) {
    return fetchAPI('/print/request', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId }),
    });
  },

  async updatePayment(sessionId: string, amountInserted: number) {
    return fetchAPI('/payment/update', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, amount_inserted: amountInserted }),
    });
  },

  async completePrint(sessionId: string) {
    return fetchAPI('/print/complete', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId }),
    });
  },

  async reportError(sessionId: string, message: string) {
    return fetchAPI('/print/error', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, message }),
    });
  },

  async deleteSession(id: string) {
    return fetchAPI(`/session/${id}`, { method: 'DELETE' });
  },
};

export const SESSION_STATUS = {
  IDLE: 'idle',
  ACTIVE: 'active',
  WAITING_PAYMENT: 'waiting_payment',
  PRINTING: 'printing',
  COMPLETED: 'completed',
  ERROR: 'error',
  EXPIRED: 'expired',
} as const;

export const FILE_STATUS = {
  UPLOADED: 'uploaded',
  CONFIGURED: 'configured',
  QUEUED: 'queued',
  PRINTING: 'printing',
  DONE: 'done',
  ERROR: 'error',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PARTIAL: 'partial',
  PAID: 'paid',
  FAILED: 'failed',
} as const;

export const PRINT_STATUS = {
  PENDING: 'pending',
  PRINTING: 'printing',
  COMPLETED: 'completed',
  ERROR: 'error',
} as const;
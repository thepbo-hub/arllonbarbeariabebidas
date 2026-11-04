/**
 * Utilitário seguro para armazenamento local (localStorage / sessionStorage)
 * Garante resiliência contra:
 * - Modo anônimo/incognito em iOS/Safari e Firefox (onde Storage pode disparar SecurityError)
 * - QuotaExceededError (quando o limite do navegador é atingido)
 * - Bloqueio de storage por configurações restritivas de privacidade/cookies
 * - Fallback automático em memória RAM sem perda de fluxo do usuário
 */

class MemoryStorage {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

const memoryFallback = new MemoryStorage();

function isStorageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const canUseSession = typeof window !== 'undefined' && isStorageAvailable('sessionStorage');
const canUseLocal = typeof window !== 'undefined' && isStorageAvailable('localStorage');

export const safeSessionStorage = {
  getItem(key: string): string | null {
    try {
      if (canUseSession) {
        return window.sessionStorage.getItem(key);
      }
      return memoryFallback.getItem(`session_${key}`);
    } catch {
      return memoryFallback.getItem(`session_${key}`);
    }
  },

  setItem(key: string, value: string): void {
    try {
      if (canUseSession) {
        window.sessionStorage.setItem(key, value);
        return;
      }
      memoryFallback.setItem(`session_${key}`, value);
    } catch {
      memoryFallback.setItem(`session_${key}`, value);
    }
  },

  removeItem(key: string): void {
    try {
      if (canUseSession) {
        window.sessionStorage.removeItem(key);
      }
      memoryFallback.removeItem(`session_${key}`);
    } catch {
      memoryFallback.removeItem(`session_${key}`);
    }
  },
};

export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      if (canUseLocal) {
        return window.localStorage.getItem(key);
      }
      return memoryFallback.getItem(`local_${key}`);
    } catch {
      return memoryFallback.getItem(`local_${key}`);
    }
  },

  setItem(key: string, value: string): void {
    try {
      if (canUseLocal) {
        window.localStorage.setItem(key, value);
        return;
      }
      memoryFallback.setItem(`local_${key}`, value);
    } catch {
      memoryFallback.setItem(`local_${key}`, value);
    }
  },

  removeItem(key: string): void {
    try {
      if (canUseLocal) {
        window.localStorage.removeItem(key);
      }
      memoryFallback.removeItem(`local_${key}`);
    } catch {
      memoryFallback.removeItem(`local_${key}`);
    }
  },
};

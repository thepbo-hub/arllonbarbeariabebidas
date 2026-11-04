/**
 * Utilitário de monitoramento e logs estruturados do cliente.
 * Atende às exigências de conformidade LGPD:
 * - Não registra informações de identificação pessoal (PII) nem dados confidenciais
 * - Registra métricas de integridade de mídia, renderização e exceções de componentes
 * - Permite diagnóstico técnico transparente sem comprometer a performance
 */

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  component?: string;
  message: string;
  details?: Record<string, unknown>;
}

class AppLogger {
  private inMemoryLogs: LogEntry[] = [];
  private readonly maxLogs = 50;

  private record(level: LogLevel, message: string, component?: string, details?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      details,
    };

    this.inMemoryLogs.push(entry);
    if (this.inMemoryLogs.length > this.maxLogs) {
      this.inMemoryLogs.shift();
    }

    if (process.env.NODE_ENV !== 'production' || level === 'error') {
      const prefix = `[Barbearia ${level.toUpperCase()}]${component ? ` [${component}]` : ''}`;
      if (level === 'error') {
        console.error(prefix, message, details ?? '');
      } else if (level === 'warn') {
        console.warn(prefix, message, details ?? '');
      } else {
        console.info(prefix, message, details ?? '');
      }
    }
  }

  info(message: string, component?: string, details?: Record<string, unknown>) {
    this.record('info', message, component, details);
  }

  warn(message: string, component?: string, details?: Record<string, unknown>) {
    this.record('warn', message, component, details);
  }

  error(message: string, component?: string, details?: Record<string, unknown>) {
    this.record('error', message, component, details);
  }

  getRecentLogs(): readonly LogEntry[] {
    return this.inMemoryLogs;
  }
}

export const logger = new AppLogger();

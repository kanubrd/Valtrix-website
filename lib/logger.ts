/**
 * Centralized logging system
 * Logs to console in development, file in production
 */

import fs from 'fs/promises';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');

async function ensureLogDir() {
  try {
    await fs.access(LOG_DIR);
  } catch {
    await fs.mkdir(LOG_DIR, { recursive: true });
  }
}

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  context?: string;
}

async function writeLog(entry: LogEntry) {
  if (process.env.NODE_ENV === 'development') {
    // Console logging in development
    const emoji = {
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
      debug: '🐛',
    }[entry.level];
    
    console.log(
      `${emoji} [${entry.level.toUpperCase()}] ${entry.timestamp}${
        entry.context ? ` [${entry.context}]` : ''
      }: ${entry.message}`,
      entry.data ? entry.data : ''
    );
    return;
  }

  // File logging in production
  await ensureLogDir();
  const date = new Date().toISOString().split('T')[0];
  const logFile = path.join(LOG_DIR, `${date}.log`);
  
  const logLine = JSON.stringify(entry) + '\n';
  await fs.appendFile(logFile, logLine);
}

export const logger = {
  info: (message: string, data?: any, context?: string) => {
    writeLog({ timestamp: new Date().toISOString(), level: 'info', message, data, context });
  },
  
  warn: (message: string, data?: any, context?: string) => {
    writeLog({ timestamp: new Date().toISOString(), level: 'warn', message, data, context });
  },
  
  error: (message: string, data?: any, context?: string) => {
    writeLog({ timestamp: new Date().toISOString(), level: 'error', message, data, context });
  },
  
  debug: (message: string, data?: any, context?: string) => {
    if (process.env.NODE_ENV === 'development') {
      writeLog({ timestamp: new Date().toISOString(), level: 'debug', message, data, context });
    }
  },
};

// API request logger
export function logApiRequest(
  method: string,
  path: string,
  ip: string,
  status: number,
  duration: number
) {
  logger.info(`${method} ${path} - ${status} (${duration}ms)`, { ip }, 'API');
}

// Email logger
export function logEmail(type: string, to: string, success: boolean, error?: string) {
  if (success) {
    logger.info(`Email sent: ${type}`, { to }, 'EMAIL');
  } else {
    logger.error(`Email failed: ${type}`, { to, error }, 'EMAIL');
  }
}

// Database logger
export function logDbOperation(operation: string, entity: string, success: boolean, error?: string) {
  if (success) {
    logger.info(`${operation} ${entity}`, {}, 'DB');
  } else {
    logger.error(`${operation} ${entity} failed`, { error }, 'DB');
  }
}

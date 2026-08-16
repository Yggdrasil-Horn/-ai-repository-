/**
 * World 4: Debugger & Introspection
 * Provides debugging capabilities and system introspection
 */

export interface DebugLog {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: unknown;
  stack?: string;
}

export interface DebugContext {
  worldId: number;
  moduleName: string;
  functionName: string;
  args?: unknown[];
  result?: unknown;
}

export class NordicDebugger {
  private logs: DebugLog[] = [];
  private maxLogs: number = 1000;
  private contexts: DebugContext[] = [];

  log(level: DebugLog['level'], message: string, data?: unknown, stack?: string): void {
    const log: DebugLog = {
      timestamp: new Date(),
      level,
      message,
      data,
      stack
    };
    
    this.logs.push(log);
    
    // Keep logs bounded
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    if (level === 'error') {
      console.error(`[${log.timestamp.toISOString()}] ERROR: ${message}`, data);
    }
  }

  pushContext(context: DebugContext): void {
    this.contexts.push(context);
  }

  popContext(): DebugContext | undefined {
    return this.contexts.pop();
  }

  getLogs(level?: DebugLog['level']): DebugLog[] {
    if (!level) return this.logs;
    return this.logs.filter(log => log.level === level);
  }

  clearLogs(): void {
    this.logs = [];
  }

  dumpContext(): DebugContext[] {
    return [...this.contexts];
  }
}

export default NordicDebugger;

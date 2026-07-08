/* Minimal leveled logger. Swap for pino/winston later if needed. */
const ts = () => new Date().toISOString();

export const logger = {
  info: (msg: string, ...args: unknown[]) => console.log(`[${ts()}] INFO  ${msg}`, ...args),
  warn: (msg: string, ...args: unknown[]) => console.warn(`[${ts()}] WARN  ${msg}`, ...args),
  error: (msg: string, ...args: unknown[]) => console.error(`[${ts()}] ERROR ${msg}`, ...args),
};

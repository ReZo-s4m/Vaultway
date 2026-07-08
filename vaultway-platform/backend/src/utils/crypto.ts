import crypto from 'node:crypto';
import { env } from '../config/env';

/**
 * AES-256-GCM file encryption.
 *
 * The 32-byte key comes from FILE_ENCRYPTION_KEY (base64). Each file gets a
 * fresh 12-byte IV; GCM also produces a 16-byte auth tag that must be stored
 * and supplied at decryption time to guarantee integrity.
 */
const ALGO = 'aes-256-gcm';
const IV_LENGTH = 12;
const KEY = Buffer.from(env.FILE_ENCRYPTION_KEY, 'base64');

export interface EncryptedPayload {
  ciphertext: Buffer;
  iv: string; // base64
  authTag: string; // base64
  algo: string;
}

export function encryptBuffer(plaintext: Buffer): EncryptedPayload {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return {
    ciphertext,
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
    algo: ALGO,
  };
}

export function decryptBuffer(params: {
  ciphertext: Buffer;
  iv: string;
  authTag: string;
}): Buffer {
  const decipher = crypto.createDecipheriv(ALGO, KEY, Buffer.from(params.iv, 'base64'));
  decipher.setAuthTag(Buffer.from(params.authTag, 'base64'));
  return Buffer.concat([decipher.update(params.ciphertext), decipher.final()]);
}

/** URL-safe random token for public share links. */
export function randomToken(bytes = 24): string {
  return crypto.randomBytes(bytes).toString('base64url');
}

/** SHA-256 hex digest — used to store refresh tokens without keeping the raw value. */
export function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

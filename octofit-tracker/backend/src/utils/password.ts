import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const digest = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${digest}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, storedDigest] = storedHash.split(':');

  if (!salt || !storedDigest) {
    return false;
  }

  const computedDigest = scryptSync(password, salt, 64).toString('hex');

  return timingSafeEqual(Buffer.from(storedDigest, 'hex'), Buffer.from(computedDigest, 'hex'));
}

export { hashPassword, verifyPassword };

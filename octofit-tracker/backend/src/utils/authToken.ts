import { createHmac } from 'crypto';

function createAuthToken(userId: string): string {
  const timestamp = Date.now().toString();
  const secret = process.env.AUTH_TOKEN_SECRET || 'octofit-dev-secret';
  const payload = `${userId}.${timestamp}`;
  const signature = createHmac('sha256', secret).update(payload).digest('hex');

  return Buffer.from(`${payload}.${signature}`).toString('base64url');
}

export { createAuthToken };

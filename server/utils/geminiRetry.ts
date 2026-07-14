import { GoogleGenAI } from '@google/genai';

/**
 * Helper to delay execution
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Runs a Gemini API task with robust retries, exponential backoff, and logging.
 * It retries on transient errors like 503, 429, and standard network/API errors.
 */
export async function withRetry<T>(
  task: () => Promise<T>,
  maxRetries = 4,
  initialDelayMs = 1000
): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await task();
    } catch (error: any) {
      attempt++;
      const status = error?.status || error?.code || error?.error?.code;
      const message = error?.message || '';
      
      const isTransient = 
        status === 503 || 
        status === 429 || 
        message.includes('experiencing high demand') ||
        message.includes('UNAVAILABLE') ||
        message.includes('RESOURCE_EXHAUSTED') ||
        message.includes('temporary') ||
        message.includes('busy') ||
        message.includes('Overloaded');

      if (isTransient && attempt < maxRetries) {
        const jitter = Math.random() * 500;
        const backoffDelay = (initialDelayMs * Math.pow(2, attempt - 1)) + jitter;
        console.warn(`[Gemini Retry] Attempt ${attempt} failed with status ${status} / transient error. Retrying in ${Math.round(backoffDelay)}ms... Error:`, message);
        await delay(backoffDelay);
      } else {
        console.error(`[Gemini Retry] Call failed permanently on attempt ${attempt}. Error:`, error);
        throw error;
      }
    }
  }
  throw new Error('Gemini call failed after maximum retries');
}

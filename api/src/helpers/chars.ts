import * as crypto from 'crypto';

export function generateUniqueString(unique: number): string {
  const hash = crypto.createHash('sha256') // Create a hash based on the ID
    .update(unique.toString() + Date.now().toString()) // Combine ID with timestamp
    .digest('hex'); // Convert to a hexadecimal string
  return hash.substring(0, 20); // Return the first 20 characters
}
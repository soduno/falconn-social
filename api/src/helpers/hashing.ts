import * as argon2 from 'argon2';
import Base64 from './base64';

export default class Hash {
  static async make(password: string): Promise<string> {
    const payload = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4
    });

    return Base64.encrypt(payload);
  }

  static async verify(raw: string, hash: string) {
    const hashRaw = Base64.decrypt(hash);
    return await argon2.verify(hashRaw, raw);
  }
}
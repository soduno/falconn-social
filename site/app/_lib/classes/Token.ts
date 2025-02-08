import { cookies } from "next/headers";

export default class Token {
  static async store(token: string) {
    const cookieStore = await cookies();

    if (!token) {
      return false;
    }

    cookieStore.set('auth', token);

    if (cookieStore.get('auth')) {
      return true;
    }

    return false;
  }

  static async get() {
    const cookieStore = await cookies();
    return cookieStore.get('auth')?.value ?? null;
  }

  remove() {

  }
}
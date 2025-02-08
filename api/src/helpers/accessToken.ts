import jwt from 'jsonwebtoken';

const SECRET_KEY = "SomeSecretPassword";

export interface AccessTokenProps {
  sub: number;
  value: string;
  iat: number;
  exp: number;
}

export default class AccessToken {
  static async make(uniq: number, value: string, expiresIn: string): Promise<string> {
    const payload = { sub: uniq, value: value };
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
  }

  static async verify(token: string): Promise<AccessTokenProps | false> {
    const decodedToken = jwt.verify(token, SECRET_KEY) as unknown as AccessTokenProps;

    if (!decodedToken.sub || !decodedToken.value) {
      return false;
    }

    return decodedToken;
  }
}
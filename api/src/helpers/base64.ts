export default class Base64 {
  static decrypt(payload: String) {
    return Buffer.from(payload, 'base64').toString('ascii');
  }
  static encrypt(string: string) {
    return Buffer.from(string).toString('base64');
  }
}
import { Endpoints, Methods, Requester } from "../global/requester";
import Token from "./Token";

export default class Session {
  static async get() {
    try {
      const response = await Requester(Methods.get, Endpoints.getUser(), await Token.get());

      if (response.status !== 200) {
        return undefined;
      }

      return response.data;

    } catch (error) {
      throw Error;
    }
  }
}
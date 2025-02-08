import { IsNotEmpty } from "class-validator";

export class AuthVerifyDto {
  @IsNotEmpty()
  token: string;
}
import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  content: string
  @IsOptional()
  @IsArray()
  mediaUrls?: string[]
}
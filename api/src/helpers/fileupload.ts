import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import sharp from 'sharp';

export enum StoragePath {
  PROFILE_IMAGE = 'uploads/profile-images/',
}

export class FileUpload {
  static async image(
    filename: string,
    file: Express.Multer.File,
    destination: string,
    resize: string,
    fileSizeLimitMB: number
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    const fileSizeLimitBytes = fileSizeLimitMB * 1024 * 1024;
    if (file.size > fileSizeLimitBytes) {
      throw new BadRequestException(`File size exceeds ${fileSizeLimitMB} MB limit.`);
    }

    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    const filePath = join(destination, filename);
    if (fs.existsSync(filePath)) {
      throw new BadRequestException('File already exists.');
    }

    const [maxWidth, maxHeight] = resize.split('x').map(Number);
    await sharp(file.buffer)
      .resize({
        width: maxWidth,
        height: maxHeight,
        fit: 'cover'
      })
      .toFile(filePath);

    return filePath;
  }

  static async deleteFile(filename: string, destination: string): Promise<void> {
    const filePath = join(destination, filename);

    if (!fs.existsSync(filePath)) {
      throw new BadRequestException('File not found.');
    }

    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      throw new BadRequestException('Error deleting the file.');
    }
  }
}

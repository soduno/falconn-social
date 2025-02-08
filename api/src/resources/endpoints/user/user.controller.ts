import {
  Controller,
  Get,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findUser(@Req() req: Request) {
    return this.userService.findUser(req['user']);
  }

  @Put('profile-image')
  @UseInterceptors(FileInterceptor('profileImage'))
  updateUserProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any
  ) {
    return this.userService.updateUserProfileImage(req.user.sub, file);
  }
}

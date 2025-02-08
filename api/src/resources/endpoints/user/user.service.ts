import { Injectable, UploadedFile } from '@nestjs/common';
import { generateUniqueString } from 'src/helpers/chars';
import { FileUpload, StoragePath } from 'src/helpers/fileupload';
import { PrismaService } from 'src/resources/prisma/prisma.service';
import { UserObjectToken } from 'types/User/User';
import { UserMetaKeys } from 'types/User/UserMeta';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findUser(user: UserObjectToken) {
    try {
      const fetchedUser = await this.prisma.user.findUnique({
        where: {
          email: user.username,
          id: user.sub,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          activatedAt: true,
          userMeta: true
        },
      });
      return fetchedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUserProfileImage(
    userId: number,
    @UploadedFile() file: Express.Multer.File
  ) {

    try {
      const fetchedImage = await this.prisma.userMeta.findFirst({
        where: {
          key: "profileImage",
          userId: userId
        }
      })

      if (fetchedImage) {
        FileUpload.deleteFile(fetchedImage.value, StoragePath.PROFILE_IMAGE)
      }

      const ImageExt = file.originalname.split(".").at(-1);
      const fileName = generateUniqueString(userId);
      const destination = StoragePath.PROFILE_IMAGE;
      const uniqFilename = fileName + '.' + ImageExt;

      FileUpload.image(
        uniqFilename,
        file,
        destination,
        "200x200",
        1,
      );

      await this.prisma.userMeta.upsert({
        where: {
          userId_key: {
            userId: userId,
            key: UserMetaKeys.PROFILE_IMAGE
          }
        },
        update: {
          value: uniqFilename
        },
        create: {
          userId: userId,
          key: UserMetaKeys.PROFILE_IMAGE,
          value: uniqFilename
        }
      });
    } catch (error) {
      throw error;
    }

  }
}

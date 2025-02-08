import { ForbiddenException, Injectable } from '@nestjs/common';
import AccessToken from 'src/helpers/accessToken';
import Base64 from 'src/helpers/base64';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ActivationService {
  constructor(private readonly prisma: PrismaService) { }

  async userActivate(hash: string) {
    try {
      const decodedToken = await AccessToken.verify(Base64.decrypt(hash));

      if (!decodedToken) {
        throw new Error('Token expired')
      }

      const foundUser = await this.prisma.user.findFirst({
        where: {
          activationHash: hash,
          activatedAt: null,
          email: decodedToken.value //meaning email in this case
        }
      })

      if (!foundUser) {
        throw new ForbiddenException('No user found, may already be activated')
      }

      await this.prisma.user.update({
        data: {
          activatedAt: new Date(),
          activationHash: null
        },
        where: {
          email: decodedToken.value //meaning email in this case
        }
      })

      return {
        statusCode: 200,
        msg: 'Activation completed'
      }

    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}

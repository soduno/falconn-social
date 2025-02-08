import { MailerService } from '@nestjs-modules/mailer';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import AccessToken from 'src/helpers/accessToken';
import Base64 from 'src/helpers/base64';
import Hash from 'src/helpers/hashing';
import { PrismaService } from 'src/resources/prisma/prisma.service';
import { AuthDto, AuthSignupDto } from './dto/auth.dto';
import { AuthVerifyDto } from './dto/authVerify.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signup(dto: AuthSignupDto) {
    try {
      const passwordHash = await Hash.make(dto.password);
      const user = (await this.prisma.user.create({
        data: {
          email: dto.email,
          password: passwordHash,
          name: dto.name,
          country: dto.country,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      })) as User;

      const activationHash = Base64.encrypt(
        await AccessToken.make(user.id, user.email, '1h'),
      );

      const updatedUser = (await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          activationHash,
        },
        select: {
          email: true,
          activationHash: true,
        },
      })) as Partial<User>;

      await this.sendWelcomeEmail(updatedUser);

      const userSessionToken = await AccessToken.make(
        user.id,
        user.email,
        '1d',
      );

      return {
        token: userSessionToken,
        user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Email in use');
      }

      throw new Error(`Signup failed: ${error.message}`);
    }
  }

  async sendWelcomeEmail(user: Partial<User>): Promise<void> {
    const activationLink = `${process.env.SITE_URL}/activation/user/${user.activationHash}`;

    return await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Falconn Social',
      template: 'welcome',
      context: {
        user,
        activationLink,
      },
    });
  }

  async signin(dto: AuthDto) {
    try {
      const findEmail = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
          activatedAt: {
            not: null,
          },
        },
      });

      if (!findEmail) {
        throw new Error('User not found');
      }

      const matchPwd = Hash.verify(dto.password, findEmail.password);

      if (!matchPwd) {
        throw new Error('Password incorrect');
      }

      return {
        token: await AccessToken.make(findEmail.id, findEmail.email, '1d'),
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async verify(dto: AuthVerifyDto) {
    try {
      const decodedToken = await AccessToken.verify(dto.token);

      if (!decodedToken) {
        throw new Error('Invalid token');
      }

      const userExist = await this.prisma.user.findFirst({
        where: {
          id: decodedToken.sub,
          email: decodedToken.value,
        },
      });

      if (!userExist) {
        throw new Error('Invalid');
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}

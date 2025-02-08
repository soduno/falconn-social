import { Injectable } from '@nestjs/common';
import { Connection } from '@prisma/client';
import { PostsGateway } from 'src/resources/gateways/posts/posts.gateway';
import { UserObjectToken } from 'types/User/User';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService, private readonly postsGateway: PostsGateway) { }

  async createPost(dto: CreatePostDto, req: Request) {

    const user: UserObjectToken = req['user'];

    const post = this.prisma.post.create({
      data: {
        content: dto.content,
        userId: user.sub
      },
      select: {
        content: true,
        createdAt: true
      }
    })

    this.postsGateway.broadcastNewPost(user);

    return post;
  }

  async getPosts(user: UserObjectToken) {

    const connections = await this.prisma.connection.findMany({
      where: {
        userId: user.sub
      },
      select: {
        remoteUserId: true,
        userId: true
      }
    }) as Partial<Connection>[]


    const remoteUserIds = connections.map(connection => connection.remoteUserId);

    return await this.prisma.post.findMany({
      where: {
        userId: {
          in: remoteUserIds
        }
      },
      select: {
        content: true,
        createdAt: true,
        mediaUrls: true,
        user: {
          select: {
            name: true
          }
        }
      }
    })
  }
}

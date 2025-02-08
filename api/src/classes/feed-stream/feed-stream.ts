import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/resources/prisma/prisma.service";
import { Connection } from "types/Connection/connection";
import { UserObjectToken } from "types/User/User";

@Injectable()
export class FeedStream {
  prisma: any
  constructor(
    private readonly user: UserObjectToken
  ) {
    this.prisma = new PrismaService
  }
  async fetchPosts() {
    const connections = await this.prisma.Connection.findMany({
      where: { userId: this.user.sub },
      select: { remoteUserId: true, userId: true },
    }) as Partial<Connection>[];

    const remoteUserIds = connections.map(connection => connection.remoteUserId);

    return await this.prisma.post.findMany({
      where: { userId: { in: remoteUserIds } },
      select: {
        content: true,
        createdAt: true,
        mediaUrls: true,
        user: { select: { name: true } },
      },
    });
  }
}  

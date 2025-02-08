import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FeedStream } from 'src/classes/feed-stream/feed-stream';
import { UserObjectToken } from 'types/User/User';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PostsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
  ) { }

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  async broadcastNewPost(user: UserObjectToken) {
    const feed = await new FeedStream(user).fetchPosts();
    this.server.emit('refetchPosts', { feed });
    console.log('isbroadcasting', feed)
  }
}

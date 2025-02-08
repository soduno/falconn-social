import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) { }

  @Post()
  createPost(@Req() req: Request, @Body() dto: CreatePostDto) {
    return this.service.createPost(dto, req);
  }

  @Get()
  getPosts(@Req() req: Request) {
    return this.service.getPosts(req['user']);
  }
}

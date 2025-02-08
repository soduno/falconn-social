import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivationModule } from './resources/endpoints/activation/activation.module';
import { AuthModule } from './resources/endpoints/auth/auth.module';
import { PostsController } from './resources/endpoints/posts/posts.controller';
import { PostsService } from './resources/endpoints/posts/posts.service';
import { UserModule } from './resources/endpoints/user/user.module';
import { PostsGateway } from './resources/gateways/posts/posts.gateway';
import { AuthMiddlewareMiddleware } from './resources/middlewares/auth-middleware/auth-middleware.middleware';
import { PrismaModule } from './resources/prisma/prisma.module';
import { CountriesModule } from './resources/endpoints/countries/countries.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.API_EMAIL_TRANSPORT,
        defaults: {
          from: '"Falconn Social" <mail@soduno.com>',
        },
        template: {
          dir: './src/email/templates',
          adapter: new EjsAdapter(),
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    ActivationModule,
    CountriesModule,
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService, PostsGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlewareMiddleware)
      .exclude(
        { path: 'auth/(.*)', method: RequestMethod.ALL },
        { path: 'uploads/(.*)', method: RequestMethod.ALL },
        { path: 'activation(.*)', method: RequestMethod.ALL },
        { path: 'socket.io', method: RequestMethod.ALL },
        { path: 'countries', method: RequestMethod.ALL },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

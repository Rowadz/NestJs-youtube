import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './posts/posts.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity, CommentSubscriber } from './comments/comments.entity';
import { LikesModule } from './likes/likes.module';
import { LikeEntity } from './likes/likes.entiy';
import { UserFollowerModule } from './user-follower/user-follower.module';
import { UserFollower } from './user-follower/userFollower.entity';
import { FilesModule } from './files/files.module';
import { FileEntity } from './files/files.entity';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'myuser',
      password: 'password',
      database: 'nestjs',
      entities: [
        UserEntity,
        PostEntity,
        CommentEntity,
        LikeEntity,
        UserFollower,
        FileEntity,
      ],
      subscribers: [CommentSubscriber],
      synchronize: true,
    }),
    UserModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    UserFollowerModule,
    FilesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

export type entities =
  | UserEntity
  | PostEntity
  | CommentEntity
  | LikeEntity
  | UserFollower;

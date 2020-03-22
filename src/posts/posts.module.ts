import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsGetController } from './posts-get/posts-get.controller';
@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostsController, PostsGetController],
  providers: [PostsService, PostEntity],
})
export class PostsModule {}

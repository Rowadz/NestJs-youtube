import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity, CommentSubscriber } from './comments.entity';
import { EntityManager } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentEntity,
    CommentSubscriber,
    {
      useValue: EntityManager,
      useClass: EntityManager,
      provide: EntityManager,
    },
  ],
})
export class CommentsModule {}

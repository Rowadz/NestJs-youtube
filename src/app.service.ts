import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity, Roles } from './user/user.entity';
import { Seed } from './seed.class';
import { PostEntity } from './posts/posts.entity';
import { CommentEntity } from './comments/comments.entity';
import { LikeEntity } from './likes/likes.entiy';
import { UserFollower } from './user-follower/userFollower.entity';
@Injectable()
export class AppService extends Seed {
  constructor(entityManager: EntityManager) {
    super(entityManager);
    this.fakeData();
  }

  getHello(): string {
    return 'Hello World!';
  }

  private async fakeData(): Promise<void> {
   //  await this.fakeIt(UserEntity);
   //  await this.fakeIt(PostEntity);
   //  this.fakeIt(CommentEntity);
   //  this.fakeIt(LikeEntity);
   //  this.fakeIt(UserFollower);
  }
}

import { entities } from './app.module';
import { UserEntity, Roles } from './user/user.entity';
import { internet, name, random, lorem } from 'faker';
import { EntityManager, DeepPartial } from 'typeorm';
import { PostEntity } from './posts/posts.entity';
import { CommentEntity } from './comments/comments.entity';
import { LikeEntity, Type } from './likes/likes.entiy';
import { UserFollower, Status } from './user-follower/userFollower.entity';
import { genSalt, hashSync } from 'bcryptjs';

export class Seed {
  private users: Array<Partial<UserEntity>>;
  private posts: Array<Partial<PostEntity>>;
  private salt: string;
  constructor(private readonly entityManager: EntityManager) {
    this.users = [];
    this.posts = [];
  }

  async fakeIt<T>(entity: any): Promise<void> {
    this.salt = await genSalt(10);
    switch (entity) {
      case UserEntity:
        return this.addData(
          this.userData(),
          entity,
          (savedData: Array<Partial<UserEntity>>) => (this.users = savedData),
        );
      case PostEntity:
        return this.addData(
          this.postData(),
          entity,
          (savedData: Array<Partial<PostEntity>>) => (this.posts = savedData),
        );
      case CommentEntity:
        return this.addData(this.commentData(), entity);
      case LikeEntity:
        return this.addData(this.likeData(), entity);
      case UserFollower:
        return this.addData(this.followesData(), entity);
      default:
        break;
    }
  }

  private userData(): Array<Partial<UserEntity>> {
    return this.arr().map<Partial<UserEntity>>(() => ({
      email: internet.email(),
      name: `${name.firstName()} ${name.lastName()}`,
      role: random.arrayElement([
        ...Array.from({ length: 5 }).fill(Roles.user),
        Roles.admin,
      ]),
      about: lorem.sentences(),
      password: hashSync('secret', this.salt),
      salt: this.salt,
    }));
  }

  private postData(): Array<Partial<PostEntity>> {
    return this.arr().map<Partial<PostEntity>>(() => ({
      body: lorem.paragraphs(),
      title: lorem.words(),
      user: random.arrayElement(this.users),
    }));
  }

  private commentData(): Array<Partial<CommentEntity>> {
    return this.arr().map<Partial<CommentEntity>>(() => {
      return {
        body: lorem.sentence(),
        post: random.arrayElement(this.posts),
        user: random.arrayElement(this.users),
      };
    });
  }

  private likeData(): Array<Partial<LikeEntity>> {
    return this.arr().map<Partial<LikeEntity>>(() => {
      return {
        post: random.arrayElement(this.posts),
        user: random.arrayElement(this.users),
        type: random.arrayElement(Object.keys(Type)),
      };
    });
  }

  private followesData(): Array<Partial<UserFollower>> {
    return this.arr().map<Partial<UserFollower>>(() => {
      const followers: Partial<UserEntity> = random.arrayElement(this.users);
      const following = random.arrayElement(
        this.users.filter(({ id }: Partial<UserEntity>) => id !== followers.id),
      );
      return {
        followers: followers as UserEntity,
        following: following as UserEntity,
        status: random.arrayElement(Object.keys(Status)),
      };
    });
  }

  private arr(): undefined[] {
    return Array.from({ length: 100 });
  }

  private async addData<T>(
    data: Array<Partial<T>>,
    entity: any,
    fun?: (savedData: Array<Partial<T>>) => void,
  ): Promise<void> {
    return this.entityManager
      .save<T, T>(entity, data as any)
      .then((savedData: Array<Partial<T>>) => {
        if (fun) {
          fun(savedData);
        }
        // console.log(savedData);
      })
      .catch(console.error);
  }
}

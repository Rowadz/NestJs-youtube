import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  EntityManager,
  Repository,
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { Injectable, forwardRef, Inject, Dependencies } from '@nestjs/common';

@Entity({ name: 'comments' })
export class CommentEntity extends GenericEntity {
  constructor(entityManager: EntityManager) {
    super();
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  body: string;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.posts,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    () => PostEntity,
    (post: PostEntity) => post.comments,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}

// tslint:disable-next-line: max-classes-per-file
@EventSubscriber()
@Injectable()
export class CommentSubscriber
  implements EntitySubscriberInterface<CommentEntity> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return CommentEntity;
  }

  /**
   * Called before post insertion.
   */

  async afterInsert(event: InsertEvent<CommentEntity>) {
    const postRepo: Repository<PostEntity> = event.connection.manager.getRepository<
      PostEntity
    >('posts');
    const commentRepo: Repository<CommentEntity> = event.connection.manager.getRepository<
      CommentEntity
    >('comments');
    commentRepo
      .count({
        where: { post: { id: event.entity.post.id } },
      })
      .then((count: number) => {
        postRepo.update({ id: event.entity.post.id }, { comments_num: count });
      });
  }
}

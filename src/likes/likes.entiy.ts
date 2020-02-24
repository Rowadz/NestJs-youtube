import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from 'src/posts/posts.entity';

export enum Type {
  happy = 'happy',
  sad = 'sad',
  angry = 'angry',
  like = 'like',
}

@Entity({ name: 'likes' })
export class LikeEntity extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Type, type: 'enum', default: Type.like })
  type: string;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.likes,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    () => PostEntity,
    (post: PostEntity) => post.likes,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}

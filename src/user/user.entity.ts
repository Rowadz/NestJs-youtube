import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { CommentEntity } from 'src/comments/comments.entity';
import { LikeEntity } from 'src/likes/likes.entiy';
import { UserFollower } from 'src/user-follower/userFollower.entity';
import { FileEntity } from 'src/files/files.entity';
// import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"; MONGO !!!!
// @ObjectIdColumn()
// id: ObjectID;

export enum Roles {
  user = 'user',
  admin = 'admin',
}

@Entity({ name: 'users' })
export class UserEntity extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column('text')
  about: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.user })
  role: Roles;

  @OneToMany(
    type => PostEntity,
    (post: PostEntity) => post.user,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  posts: PostEntity[];

  @OneToMany(
    type => CommentEntity,
    (comment: CommentEntity) => comment.user,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  comments: CommentEntity[];

  @OneToMany(
    () => LikeEntity,
    (like: LikeEntity) => like.user,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  likes: LikeEntity[];

  @OneToMany(
    () => UserFollower,
    (uf: UserFollower) => uf.followers,
  )
  followers: UserFollower[];

  @OneToMany(
    () => UserFollower,
    (uf: UserFollower) => uf.following,
  )
  following: UserFollower[];

  @OneToMany(
    type => FileEntity,
    (file: FileEntity) => file.post,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  files: FileEntity[];
}

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
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, IsDefined, IsEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidationGroups;
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
  @IsOptional({ always: true })
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  name: string;

  @Column('text', { nullable: false })
  @IsOptional({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  about: string;

  @Column({ length: 50, unique: true, nullable: false })
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  email: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.user })
  @IsEmpty({ always: true, message: 'hey...' })
  role: Roles;

  @Exclude()
  @Column({ type: 'varchar', length: 500, nullable: false })
  password: string;

  // @Exclude()
  @Column({ type: 'varchar', length: 500 })
  salt: string;

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

  access_token?: string;
}

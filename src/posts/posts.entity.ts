import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  RelationCount,
  EntityManager,
  Repository,
} from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from 'src/comments/comments.entity';
import { LikeEntity } from 'src/likes/likes.entiy';
import {
  IsOptional,
  IsDefined,
  IsString,
  IsNumber,
  IsEmpty,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsUniqueTitle } from './validators/unique.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';
const { CREATE, UPDATE } = CrudValidationGroups;
import { UniqueTitleConstrainsts } from './validators/unique.validator';
import { FileEntity } from 'src/files/files.entity';

let postRepo: Repository<PostEntity>;
@Entity({ name: 'posts' })
@Injectable()
export class PostEntity extends GenericEntity {
  constructor(
    @InjectRepository(PostEntity)
    repo: Repository<PostEntity>,
  ) {
    super();
    postRepo = repo;
  }
  @PrimaryGeneratedColumn()
  @IsOptional({ always: true })
  id: number;

  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ length: 50, unique: true })
  @IsString({ always: true })
  @IsUniqueTitle({ message: 'Not Unique !', always: true })
  title: string;

  @Column('text')
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString({ always: true })
  body: string;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.posts,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(
    type => CommentEntity,
    (comment: CommentEntity) => comment.post,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  comments: CommentEntity[];

  @OneToMany(
    type => LikeEntity,
    (like: LikeEntity) => like.post,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  likes: LikeEntity[];

  @Column({ default: 0, type: 'int' })
  @IsEmpty({ always: true, message: 'hey...' })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  // tslint:disable-next-line: variable-name
  comments_num: number;

  @OneToMany(
    type => FileEntity,
    (file: FileEntity) => file.post,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  files: FileEntity[];

  @Column('int')
  user_id: number;
}

export default new Promise<Repository<PostEntity>>(
  (resolve: (postRepo: Repository<PostEntity>) => void) => {
    const interval = setInterval(() => {
      if (postRepo) {
        resolve(postRepo);
        clearInterval(interval);
      }
    });
  },
);

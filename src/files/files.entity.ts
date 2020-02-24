import { GenericEntity } from 'src/generic/generic.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsOptional, IsString, IsEmpty, IsNumber } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
import { PostEntity } from 'src/posts/posts.entity';

@Entity({ name: 'files' })
export class FileEntity extends GenericEntity {
  @PrimaryGeneratedColumn()
  @IsOptional({ always: true })
  id: number;

  @Column({ length: 50 })
  @IsString({ always: true })
  @IsEmpty({ always: true, message: 'hey...' })
  // tslint:disable-next-line: variable-name
  original_name: string;

  @Column({ length: 50 })
  @IsString({ always: true })
  @IsEmpty({ always: true, message: 'hey...' })
  // tslint:disable-next-line: variable-name
  current_name: string;

  @Column({ length: 50 })
  @IsString({ always: true })
  @IsEmpty({ always: true, message: 'hey...' })
  extention: string;

  @Column({ type: 'int' })
  @IsNumber()
  @IsEmpty({ always: true, message: 'hey...' })
  size: number;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.files,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    () => PostEntity,
    (post: PostEntity) => post.files,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}

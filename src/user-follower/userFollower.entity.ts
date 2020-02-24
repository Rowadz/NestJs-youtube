import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { GenericEntity } from 'src/generic/generic.entity';

export enum Status {
  blocked = 'blocked',
  accepted = 'accepted',
  pending = 'pending',
}

@Entity({ name: 'user_followers' })
export class UserFollower extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'number' })
  // tslint:disable-next-line: variable-name
  following_id: number;

  @Column({ type: 'number' })
  // tslint:disable-next-line: variable-name
  follower_id: number;

  @ManyToOne(
    () => UserEntity,
    (u: UserEntity) => u.followers,
  )
  @JoinColumn({ name: 'follower_id' })
  followers: UserEntity;

  @ManyToOne(
    type => UserEntity,
    (u: UserEntity) => u.following,
  )
  @JoinColumn({ name: 'following_id' })
  following: UserEntity;

  @Column({ enum: Status, type: 'enum', default: Status.pending })
  status: Status;
}

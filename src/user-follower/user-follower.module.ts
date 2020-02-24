import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollower } from './userFollower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserFollower])],
})
export class UserFollowerModule {}

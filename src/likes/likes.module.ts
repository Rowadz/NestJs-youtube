import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './likes.entiy';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
})
export class LikesModule {}

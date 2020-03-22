import { Injectable } from '@nestjs/common';
import { PostEntity } from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService extends TypeOrmCrudService<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    public readonly postRepo: Repository<PostEntity>,
  ) {
    super(postRepo);
  }
}

import { Injectable, forwardRef, Dependencies, Inject } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CommentEntity } from './comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService extends TypeOrmCrudService<CommentEntity> {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {
    super(commentRepo);
  }
}

import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CommentEntity } from './comments.entity';
import { CommentsService } from './comments.service';

@Crud({
  model: {
    type: CommentEntity,
  },
})
@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}
}

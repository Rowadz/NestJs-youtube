import { Controller, Get } from '@nestjs/common';
import { Crud, CrudOptions, CrudController } from '@nestjsx/crud';
import { PostEntity } from './posts.entity';
import { PostsService } from './posts.service';

@Crud({
  model: {
    type: PostEntity,
  },
  routes: {
    // only: ['getManyBase'],
  },
  params: {
    limit: 10,
    page: 1,
  },
  query: {
    limit: 10,
    alwaysPaginate: true,
    join: {
      // tslint:disable-next-line: object-literal-key-quotes
      comments: {
        eager: true,
      },
      'comments.user': {
        eager: true,
      },
      // tslint:disable-next-line: object-literal-key-quotes
      likes: {
        eager: true,
      },
    },
  },
} as CrudOptions)
@Controller('posts')
export class PostsController implements CrudController<PostEntity> {
  constructor(public service: PostsService) {}
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { Crud, CrudOptions, CrudController, CrudAuth } from '@nestjsx/crud';
import { PostEntity } from './posts.entity';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/user/user.entity';

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
@UseGuards(JwtAuthGuard)
@CrudAuth({
  property: 'user',
  filter: (user: UserEntity) => {
    console.log(user);
    return { user_id: user.id };
  },
})
@Controller('posts')
export class PostsController implements CrudController<PostEntity> {
  constructor(public service: PostsService) {}
}

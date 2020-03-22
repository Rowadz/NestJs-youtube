import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import {
  Crud, CrudOptions, CrudController, CrudAuth,
  CrudRequest, ParsedRequest, ParsedBody, Override
} from '@nestjsx/crud';
import { PostEntity } from './posts.entity';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { IsOwnerGuard } from 'src/guards/is-owner.guard';
// import { IsOwnerGuard } from 'src/'

@Crud({
  model: {
    type: PostEntity,
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'deleteOneBase'],
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
// @UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController implements CrudController<PostEntity> {
  constructor(public service: PostsService) { }

  get base(): any {
    return this;
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  createOne(
    @Request() req: Express.Request,
    @ParsedRequest() pReq: CrudRequest,
    @ParsedBody() body: Partial<PostEntity>) {
    console.log({ user: (req as any).user, create: true });
    const obj = { ...body, user_id: (req as any).user.id };
    return this.base.createOneBase(pReq, obj);
  }

  @Override('updateOneBase')
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  updateOne(
    @Request() req: Express.Request,
    @Param('id') id: number,
    @ParsedRequest() pReq: CrudRequest,
    @ParsedBody() body: Partial<PostEntity>) {
    console.log({ user: (req as any).user, update: true, id });
    const obj = { ...body, user_id: (req as any).user.id };
    return this.base.updateOneBase(pReq, obj);
  }
}

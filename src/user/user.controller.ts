import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Crud({
  model: {
    type: UserEntity,
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase'],
  },
  query: {
    exclude: ['salt'],
    limit: 10,
    alwaysPaginate: true,
    join: {
      followers: {
        eager: true,
      },
      'followers.following': {
        eager: true,
        // exclude: ['salt']
        alias: 'user_followers',
      },
      following: {
        eager: true,
      },
      'following.followers': {
        eager: true,
        alias: 'user_following',
      },
    },
  },
})
@UseGuards(JwtAuthGuard)
@CrudAuth({
  property: 'user',
  filter: (user: UserEntity) => {
    return { id: user.id };
  },
})
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  createUser() {}
}

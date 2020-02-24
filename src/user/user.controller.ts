import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { Crud } from '@nestjsx/crud';

@Crud({
  model: {
    type: UserEntity,
  },
  query: {
    limit: 10,
    alwaysPaginate: true,
    join: {
      followers: {
        eager: true,
      },
      'followers.following': {
        eager: true,
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
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
}

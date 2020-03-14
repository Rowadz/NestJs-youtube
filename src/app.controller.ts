import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserEntity, Roles } from './user/user.entity';
import { genSalt, hashSync } from 'bcryptjs';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: Express.Request) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() body: Partial<UserEntity>) {
    try {
      const salt = await genSalt(10);
      const { password, ...reset } = body;
      const u: Partial<UserEntity> = {
        salt,
        ...reset,
        password: hashSync(password, salt),
        role: Roles.user,
      };
      const user = await this.authService.register(u);
      const logedInUser = await this.authService.login(user);
      delete logedInUser.password;
      delete logedInUser.salt;
      return logedInUser;
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';
import { genSalt, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class AuthService {
  constructor(
    public readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.userService.findOne(null, { where: { email } });
    if (user && user.password === hashSync(pass, user.salt)) {
      const { salt, password, ...u } = user;
      return u;
    }
    return null;
  }

  async login(user: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    try {
      const s = await this.userService.userRepo.save(user);
      return s;
    } catch (error) {
      return error;
    }
  }
}

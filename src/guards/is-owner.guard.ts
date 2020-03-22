import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'
import { PostsService } from 'src/posts/posts.service';
import { PostEntity } from 'src/posts/posts.entity';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private service: PostsService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = (request as any).user;
    const body = (request as any).body;
    console.log({ params: request.params, body, user, IsOwnerGuard: true });
    return this.canI(+request.params.id, +user.id);
  }

  private async canI(id: number, user_id: number): Promise<boolean> {
    const p: Partial<PostEntity> = await this.service.postRepo.findOne(id);
    console.log({ postIFound: p });
    return p.user_id === user_id;
  }
}

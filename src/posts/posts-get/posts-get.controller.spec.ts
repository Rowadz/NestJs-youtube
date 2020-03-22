import { Test, TestingModule } from '@nestjs/testing';
import { PostsGetController } from './posts-get.controller';

describe('PostsGet Controller', () => {
  let controller: PostsGetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsGetController],
    }).compile();

    controller = module.get<PostsGetController>(PostsGetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

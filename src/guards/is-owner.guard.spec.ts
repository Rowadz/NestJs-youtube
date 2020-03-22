import { IsOwnerGuard } from './is-owner.guard';

describe('IsOwnerGuard', () => {
  it('should be defined', () => {
    expect(new IsOwnerGuard()).toBeDefined();
  });
});

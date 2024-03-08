import { UserRolesGuard } from './user-roles.guard';

describe('UserRolesGuard', () => {
  it('should be defined', () => {
    expect(new UserRolesGuard()).toBeDefined();
  });
});

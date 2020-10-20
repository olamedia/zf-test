import User from '@/models/User';

export interface RootState {
  users: {
    [k: number]: Partial<User> & {
      page: number;
    };
  };
}

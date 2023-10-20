import { User } from './user.interface';

export class UserModel implements User {
  id: number = 0;
  user: {
    name: string;
    email: string;
    username: string;
    password: string;
  };
  message: string = '';

  constructor(data: Partial<UserModel> = {}) {
    this.id = data.id || 0;
    this.user = {
      name: data.user?.name || '',
      email: data.user?.email || '',
      username: data.user?.username || '',
      password: data.user?.password || '',
    };
    this.message = data.message || '';
  }
}

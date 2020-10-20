type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  [k: string]: unknown;
}

export default User;

import User from '@/models/User';

type UserOnPage = Partial<User> & {page: number}

export default UserOnPage;

import User from '../models/Users';

export async function createUser(name: string, email: string) {
    return User.create({ name, email });
}

export async function getUserById(id: number) {
    return User.findByPk(id);
}

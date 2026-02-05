
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repo';
@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

      async createUser(data: { email: string; fullName: string; passwordHash: string }) {
    return this.usersRepository.createUser(data);
  }

    async findUserByEmail(email: string) {
        return this.usersRepository.findUserByEmail(email);
    }
    async findById(id: string) {
        return this.usersRepository.findById(id);
    }
}
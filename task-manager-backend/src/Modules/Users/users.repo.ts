import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../Common/Services/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

   async createUser(data: { email: string; fullName: string; passwordHash: string }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        passwordHash: data.passwordHash,
      },
    });
  }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    async  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
        }; 
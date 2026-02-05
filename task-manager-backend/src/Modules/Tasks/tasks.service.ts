import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../Common/Services/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createTaskDto: CreateTaskDto) {
        return this.prisma.task.create({
            data: {
                ...createTaskDto,
                userId,
            },
        });
    }

    async findAll(userId: string) {
        return this.prisma.task.findMany({
            where: { userId },
        });
    }

    async findOne(userId: string, taskId: string) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (task.userId !== userId) {
            throw new ForbiddenException('Access to this task is forbidden');
        }

        return task;
    }

    async update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
        await this.findOne(userId, taskId); // Ensure existence and ownership

        return this.prisma.task.update({
            where: { id: taskId },
            data: updateTaskDto,
        });
    }

    async remove(userId: string, taskId: string) {
        await this.findOne(userId, taskId); // Ensure existence and ownership

        return this.prisma.task.delete({
            where: { id: taskId },
        });
    }
}

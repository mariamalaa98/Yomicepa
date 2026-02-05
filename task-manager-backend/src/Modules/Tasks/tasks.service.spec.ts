import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../../Common/Services/prisma.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

const mockPrismaService = {
    task: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

describe('TasksService', () => {
    let service: TasksService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a task', async () => {
            const createTaskDto = { title: 'Test Task', description: 'Desc' };
            const userId = 'user-123';
            const expectedTask = { id: 'task-1', ...createTaskDto, userId };

            mockPrismaService.task.create.mockResolvedValue(expectedTask);

            const result = await service.create(userId, createTaskDto);
            expect(result).toEqual(expectedTask);
            expect(prisma.task.create).toHaveBeenCalledWith({
                data: { ...createTaskDto, userId },
            });
        });
    });

    describe('findAll', () => {
        it('should return an array of tasks', async () => {
            const userId = 'user-123';
            const expectedTasks = [{ id: 'task-1', title: 'Task 1', userId }];

            mockPrismaService.task.findMany.mockResolvedValue(expectedTasks);

            const result = await service.findAll(userId);
            expect(result).toEqual(expectedTasks);
            expect(prisma.task.findMany).toHaveBeenCalledWith({ where: { userId } });
        });
    });

    describe('findOne', () => {
        it('should return a task if found and owned by user', async () => {
            const userId = 'user-123';
            const taskId = 'task-1';
            const expectedTask = { id: taskId, userId };

            mockPrismaService.task.findUnique.mockResolvedValue(expectedTask);

            const result = await service.findOne(userId, taskId);
            expect(result).toEqual(expectedTask);
        });

        it('should throw NotFoundException if task does not exist', async () => {
            mockPrismaService.task.findUnique.mockResolvedValue(null);

            await expect(service.findOne('user-1', 'invalid-id')).rejects.toThrow(NotFoundException);
        });

        it('should throw ForbiddenException if task belongs to another user', async () => {
            mockPrismaService.task.findUnique.mockResolvedValue({ id: 'task-1', userId: 'other-user' });

            await expect(service.findOne('user-1', 'task-1')).rejects.toThrow(ForbiddenException);
        });
    });
});

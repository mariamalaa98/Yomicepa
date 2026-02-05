import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'Task successfully created.' })
    create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(req.user.id, createTaskDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all user tasks' })
    @ApiResponse({ status: 200, description: 'List of user tasks.' })
    findAll(@Request() req) {
        return this.tasksService.findAll(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific task' })
    @ApiResponse({ status: 200, description: 'The task.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    findOne(@Request() req, @Param('id') id: string) {
        return this.tasksService.findOne(req.user.id, id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a task' })
    @ApiResponse({ status: 200, description: 'The updated task.' })
    update(@Request() req, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(req.user.id, id, updateTaskDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task' })
    @ApiResponse({ status: 200, description: 'Task successfully deleted.' })
    remove(@Request() req, @Param('id') id: string) {
        return this.tasksService.remove(req.user.id, id);
    }
}



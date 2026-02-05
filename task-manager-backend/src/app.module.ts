import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Modules/Auth/auth.module';
import { TasksModule } from './Modules/Tasks/tasks.module';
import { PrismaService } from './Common/Services/prisma.service';

@Module({
  imports: [AuthModule, TasksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

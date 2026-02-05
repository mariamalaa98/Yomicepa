import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({ example: 'Buy groceries' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'Milk, Eggs, Bread' })
    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdateTaskDto {
    @ApiPropertyOptional({ example: 'Buy groceries' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ example: 'Milk, Eggs, Bread' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}

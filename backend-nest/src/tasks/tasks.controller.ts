import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import type { Task } from './task.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tareas')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crea una nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente.' })
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene la lista completa de tareas' })
  @ApiResponse({ status: 200, description: 'Lista de tareas devuelta.' })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Marca una tarea como completada' })
  updateComplete(@Param('id', ParseIntPipe) id: number): Task {
    return this.tasksService.updateCompleted(id, true);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Elimina una tarea por ID' })
  delete(@Param('id', ParseIntPipe) id: number): void {
    return this.tasksService.delete(id);
  }
}

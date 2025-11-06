import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description || null,
        completed: false,
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async complete(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return this.prisma.task.update({
      where: { id },
      data: { completed: true },
    });
  }

  async remove(id: number) {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada para eliminar.
        `);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.interface';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private taskIdCounter = 1;

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.taskIdCounter++,
      title: createTaskDto.title,
      description: createTaskDto.description || '',
      completed: false,
      created_at: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada.`);
    }
    return found;
  }

  updateCompleted(id: number, completed: boolean): Task {
    const task = this.findOne(id);
    task.completed = completed;
    return task;
  }

  delete(id: number): void {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    if (this.tasks.length === initialLength) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada.`);
    }
  }
}

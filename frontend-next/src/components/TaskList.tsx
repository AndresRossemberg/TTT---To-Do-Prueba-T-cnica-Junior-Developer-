'use client';
import { Task } from '../types/task';
import { completeTask, deleteTask } from '../services/api';

export default function TaskList({
  tasks,
  onUpdated,
}: {
  tasks: Task[];
  onUpdated: () => void;
}) {
  const handleComplete = async (id: number) => {
    await completeTask(id);
    onUpdated();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    onUpdated();
  };

  if (tasks.length === 0)
    return <p className="text-gray-500 text-center">No hay tareas aún.</p>;

  return (
    <div className="space-y-4">
      {tasks.map((t) => (
        <div
          key={t.id}
          className={`p-4 sm:p-5 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between gap-4 border ${
            t.completed
              ? 'bg-green-100 border-green-400 opacity-75'
              : 'bg-white border-gray-300'
          }`}
        >
          <div>
            <p
              className={`font-semibold text-lg ${
                t.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {t.title}
            </p>
            <p className="text-gray-600 text-sm">{t.description}</p>
            <p className="text-xs text-gray-400 mt-1">
              Creado:{' '} 
              {new Date(t.createdAt).toLocaleString('es-ES',{
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                })}
            </p>
          </div>

          <div className="flex gap-2 sm:flex-col sm:items-end">
            {!t.completed && (
              <button
                onClick={() => handleComplete(t.id)}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm">Completar</button>
            )}

            <button
              onClick={() => handleDelete(t.id)}
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
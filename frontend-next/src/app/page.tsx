'use client';
import { useEffect, useState, useCallback } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { fetchTasks } from '../services/api';
import { Task } from '../types/task';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const load = useCallback(async () => {
    const data = await fetchTasks();
    setTasks(data);
  }, []);

  useEffect(() => {
    (async () => { await load(); })();
  }, [load]);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col justify-start items-center p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 mb-6 sm:mb-8">
        ✅ TTT — To-Do
      </h1>

      <div className="w-full max-w-2xl space-y-6">
        <TaskForm onCreated={load} />
        <TaskList tasks={tasks} onUpdated={load} />
      </div>
    </main>
  );
}
'use client';
import { useState } from 'react';
import { createTask } from '../services/api';

export default function TaskForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTask({ title, description: desc });
    setTitle('');
    setDesc('');
    onCreated();
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white shadow rounded-lg p-4 sm:p-6 space-y-4"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Agregar tarea</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400 text-gray-700"
      />

      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Descripción"
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400 text-gray-700"
      />

      <button
        className="w-full bg-indigo-600 text-white font-medium py-2 rounded hover:bg-indigo-700 transition">Crear</button>
    </form>
  );
}
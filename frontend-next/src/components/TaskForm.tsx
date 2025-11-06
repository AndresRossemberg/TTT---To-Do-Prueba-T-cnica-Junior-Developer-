'use client';
import { useState } from 'react';
import { createTask } from '../services/api';

export default function TaskForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('El Título de la tarea es obligatorio. Por favor, ingrésalo.');
      return;
    }

    setLoading(true);

    try {
      await createTask({ title, description: desc });

      setTitle('');
      setDesc('');
      onCreated();

    } catch (apiError) {

      interface IHttpError {
        response: {
          data: {
            message: string | string[];
            statusCode: number;
          };
        };
      }

      if (
        typeof apiError === 'object' &&
        apiError !== null &&
        'response' in apiError &&
        'data' in (apiError as IHttpError).response
      ) {
        const httpError = apiError as IHttpError;
        const errorMessage = httpError.response.data.message;

        if (Array.isArray(errorMessage)) {
           setError(`Error de validación: ${errorMessage[0]}`);
        } else if (errorMessage) {
           setError(errorMessage);
        } else {
           setError('Error HTTP desconocido.');
        }

      } else {
        setError('Ocurrió un error inesperado al conectar con el servidor.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white shadow rounded-lg p-4 sm:p-6 space-y-4"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Agregar tarea</h2>

      {}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">¡Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400 text-gray-700"
      />

      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Descripción (Opcional)"
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400 text-gray-700"
      />

      <button
        type="submit" 
        disabled={loading}
        className="w-full bg-indigo-600 text-white font-medium py-2 rounded hover:bg-indigo-700 transition disabled:bg-indigo-400"
      >
        {loading ? 'Creando...' : 'Crear'}
      </button>
    </form>
  );
}
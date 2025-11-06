const BASE = process.env.NEXT_PUBLIC_API_URL;

interface IHttpError extends Error {
    response?: {
        data: unknown; // Usamos 'any' aquí porque es el tipo que realmente estamos inyectando
    };
}

async function handleResponse(response: Response) {
    if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        return {};
    }

    let errorBody: unknown = {};
    try {
        errorBody = await response.json();
    } catch {
        throw new Error(`Error ${response.status}: El servidor respondió sin un cuerpo JSON válido.`);
    }

    const error: IHttpError = new Error(response.statusText);
    error.response = { data: errorBody };
    throw error;
}

export async function fetchTasks() {
  const r = await fetch(`${BASE}/tasks`);
  return handleResponse(r);
}

export async function createTask(payload:{title:string, description?:string}) {
  const r = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return handleResponse(r);
}

export async function completeTask(id: number) {
  const r = await fetch(`${BASE}/tasks/${id}/complete`, { 
    method: 'PATCH' 
  });
  return handleResponse(r);
}

export async function deleteTask(id: number) {
  const r = await fetch(`${BASE}/tasks/${id}`, { 
    method: 'DELETE' 
  });
  return handleResponse(r);
}
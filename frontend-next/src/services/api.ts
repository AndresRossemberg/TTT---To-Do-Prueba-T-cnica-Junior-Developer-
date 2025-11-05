const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTasks() {
  const r = await fetch(`${BASE}/tasks`);
  return r.json();
}

export async function createTask(payload:{title:string, description?:string}) {
  const r = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return r.json();
}

export async function completeTask(id:number) {
  return fetch(`${BASE}/tasks/${id}/complete`, { method: 'PUT' });
}

export async function deleteTask(id:number) {
  return fetch(`${BASE}/tasks/${id}`, { method: 'DELETE' });
}
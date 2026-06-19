const BASE_URL = 'https://headset-undercook-resent.ngrok-free.dev/api';
//http://192.168.31.142:5050
export interface UserRecord {
  _id: string;
  email: string;
  firstname: string;
  surname: string;
  password?: string;
}

export const userService = {
  getUsersPage: async (page: number, limit: number = 20) => {
    const res = await fetch(`${BASE_URL}/users?page=${page}&limit=${limit}`);//query param with user page and limit
    if (!res.ok) throw new Error('Failed to fetch users');//error while fetching
    return res.json() as Promise<{ users: UserRecord[]; total: number; hasMore: boolean }>; //returned data for pagination
  },
  createUser: async (data: Omit<UserRecord, '_id'>) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw result; // throw the actual { errors: {...} } object
  return result;
},
  updateUser: async (id: string, data: Partial<UserRecord>) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw result; // throw the actual { errors: {...} } object
  return result;
},
  deleteUser: async (id: string) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete user');
  },
};
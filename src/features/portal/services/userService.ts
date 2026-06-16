const BASE_URL = 'http://192.168.31.142:5050/api'; // run `ipconfig getifaddr en0` on Mac

export interface UserRecord {
  _id: string;
  email: string;
  firstname: string;
  surname: string;
  password?: string;
}

export const userService = {
  getUsersPage: async (page: number, limit: number = 20) => {
    const res = await fetch(`${BASE_URL}/users?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json() as Promise<{ users: UserRecord[]; total: number; hasMore: boolean }>;
  },
  createUser: async (data: Omit<UserRecord, '_id'>) => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  },
  updateUser: async (id: string, data: Partial<UserRecord>) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },
  deleteUser: async (id: string) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete user');
  },
};
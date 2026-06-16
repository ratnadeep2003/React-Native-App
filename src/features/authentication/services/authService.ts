import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'registered_users';

export const authService = {
  getUsers: async (): Promise<Record<string, any>> => {
    try {
      const data = await AsyncStorage.getItem(USERS_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveUser: async (email: string, name: string, secret: string, surname: string = '') => {
    const users = await authService.getUsers();
    users[email.toLowerCase()] = {
      name,
      password: secret,
      surname: surname
    };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true };
  },

  verifyUser: async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = await authService.getUsers();
    const normalizedEmail = email.toLowerCase();
    if (!users[normalizedEmail]) return { success: false, error: 'No account found.' };
    if (users[normalizedEmail].password !== password) return { success: false, error: 'Incorrect password.' };
    return { success: true };
  },

  deleteUser: async (email: string) => {
    const users = await authService.getUsers();
    delete users[email.toLowerCase()];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true };
  },
};
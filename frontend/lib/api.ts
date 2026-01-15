import { getAuthToken, setAuthToken } from '@/lib/auth';
import type { LocalAuthUser, Task, User } from '@/types';

/**
 * Frontend-only "API":
 * - Persists users, current user, and tasks in localStorage
 * - Provides the same surface as the former backend API client
 */

const USERS_KEY = 'swa_users';
const CURRENT_USER_ID_KEY = 'swa_current_user_id';
const TASKS_KEY = 'swa_tasks';

function assertBrowser() {
  if (typeof window === 'undefined') {
    throw new Error('This app runs in the browser only.');
  }
}

function readJson<T>(key: string, fallback: T): T {
  assertBrowser();
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  assertBrowser();
  localStorage.setItem(key, JSON.stringify(value));
}

function nowIso() {
  return new Date().toISOString();
}

function randomId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

// Lightweight, non-cryptographic hash (demo-only).
function pseudoHash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

function getUsers(): LocalAuthUser[] {
  return readJson<LocalAuthUser[]>(USERS_KEY, []);
}

function setUsers(users: LocalAuthUser[]) {
  writeJson(USERS_KEY, users);
}

function getCurrentUserId(): string | null {
  return readJson<string | null>(CURRENT_USER_ID_KEY, null);
}

function setCurrentUserId(id: string | null) {
  writeJson(CURRENT_USER_ID_KEY, id);
}

function requireAuthUser(): LocalAuthUser {
  const token = getAuthToken();
  if (!token) throw new Error('Unauthorized');
  const userId = getCurrentUserId();
  if (!userId) throw new Error('Unauthorized');
  const user = getUsers().find((u) => u.id === userId);
  if (!user) throw new Error('Unauthorized');
  return user;
}

function toPublicUser(u: LocalAuthUser): User {
  // drop passwordHash
  const { passwordHash: _pw, ...rest } = u;
  return rest;
}

function getTasks(): Task[] {
  return readJson<Task[]>(TASKS_KEY, []);
}

function setTasks(tasks: Task[]) {
  writeJson(TASKS_KEY, tasks);
}

// Auth API
export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    assertBrowser();
    const email = data.email.trim().toLowerCase();
    if (!data.name || data.name.trim().length < 2) {
      return { success: false, message: 'Name must be at least 2 characters' };
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, message: 'Please provide a valid email' };
    }
    if (!data.password || data.password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long' };
    }

    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      return { success: false, message: 'User with this email already exists' };
    }

    const user: LocalAuthUser = {
      id: randomId(),
      name: data.name.trim(),
      email,
      profile: { bio: '', avatar: '' },
      createdAt: nowIso(),
      updatedAt: nowIso(),
      passwordHash: pseudoHash(data.password),
    };

    users.push(user);
    setUsers(users);

    const token = randomId();
    setAuthToken(token);
    setCurrentUserId(user.id);

    return { success: true, message: 'User registered successfully', token, user: toPublicUser(user) };
  },
  login: async (data: { email: string; password: string }) => {
    assertBrowser();
    const email = data.email.trim().toLowerCase();
    const users = getUsers();
    const user = users.find((u) => u.email === email);
    if (!user || user.passwordHash !== pseudoHash(data.password)) {
      return { success: false, message: 'Invalid email or password' };
    }

    const token = randomId();
    setAuthToken(token);
    setCurrentUserId(user.id);

    return { success: true, message: 'Login successful', token, user: toPublicUser(user) };
  },
};

// Profile API
export const profileAPI = {
  get: async () => {
    try {
      const user = requireAuthUser();
      return { success: true, user: toPublicUser(user) };
    } catch {
      return { success: false, message: 'Unauthorized' };
    }
  },
  update: async (data: { name?: string; profile?: { bio?: string; avatar?: string } }) => {
    try {
      const authUser = requireAuthUser();
      const users = getUsers();
      const idx = users.findIndex((u) => u.id === authUser.id);
      if (idx < 0) return { success: false, message: 'User not found' };

      if (data.name && data.name.trim().length < 2) {
        return { success: false, message: 'Name must be at least 2 characters' };
      }
      if (data.profile?.bio && data.profile.bio.length > 500) {
        return { success: false, message: 'Bio cannot exceed 500 characters' };
      }

      const updated: LocalAuthUser = {
        ...users[idx],
        name: data.name ? data.name.trim() : users[idx].name,
        profile: {
          ...users[idx].profile,
          ...(data.profile ?? {}),
        },
        updatedAt: nowIso(),
      };
      users[idx] = updated;
      setUsers(users);

      return { success: true, message: 'Profile updated successfully', user: toPublicUser(updated) };
    } catch {
      return { success: false, message: 'Unauthorized' };
    }
  },
};

// Tasks API
export const tasksAPI = {
  getAll: async (filters?: { status?: string; priority?: string; search?: string }) => {
    try {
      const user = requireAuthUser();
      const all = getTasks().filter((t) => t.user === user.id);

      const status = filters?.status?.trim();
      const priority = filters?.priority?.trim();
      const search = filters?.search?.trim().toLowerCase();

      const filtered = all.filter((t) => {
        if (status && t.status !== status) return false;
        if (priority && t.priority !== priority) return false;
        if (search) {
          const hay = `${t.title} ${t.description ?? ''}`.toLowerCase();
          if (!hay.includes(search)) return false;
        }
        return true;
      });

      filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      return { success: true, count: filtered.length, tasks: filtered };
    } catch {
      return { success: false, message: 'Unauthorized' };
    }
  },
  get: async (id: string) => {
    try {
      const user = requireAuthUser();
      const task = getTasks().find((t) => t._id === id && t.user === user.id);
      if (!task) return { success: false, message: 'Task not found' };
      return { success: true, task };
    } catch {
      return { success: false, message: 'Unauthorized' };
    }
  },
  create: async (data: {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
  }) => {
    try {
      const user = requireAuthUser();
      const title = data.title?.trim();
      if (!title) return { success: false, message: 'Title is required' };

      const task: Task = {
        _id: randomId(),
        title,
        description: data.description?.trim() ?? '',
        status: (data.status as Task['status']) ?? 'pending',
        priority: (data.priority as Task['priority']) ?? 'medium',
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
        user: user.id,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };

      const tasks = getTasks();
      tasks.push(task);
      setTasks(tasks);

      return { success: true, message: 'Task created successfully', task };
    } catch {
      return { success: false, message: 'Unauthorized' };
    }
  },
  update: async (id: string, data: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
  }) => {
    try {
      const user = requireAuthUser();
      const tasks = getTasks();
      const idx = tasks.findIndex((t) => t._id === id && t.user === user.id);
      if (idx < 0) return { success: false, message: 'Task not found' };

      const existing = tasks[idx];
      const next: Task = {
        ...existing,
        title: data.title !== undefined ? data.title.trim() : existing.title,
        description: data.description !== undefined ? data.description.trim() : existing.description,
        status: (data.status as Task['status']) ?? existing.status,
        priority: (data.priority as Task['priority']) ?? existing.priority,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : existing.dueDate,
        updatedAt: nowIso(),
      };

      if (!next.title) return { success: false, message: 'Title cannot be empty' };

      tasks[idx] = next;
      setTasks(tasks);
      return { success: true, message: 'Task updated successfully', task: next };
    } catch {
      return { success: false, message: 'Unauthorized' };
    }
  },
  delete: async (id: string) => {
    try {
      const user = requireAuthUser();
      const tasks = getTasks();
      const next = tasks.filter((t) => !(t._id === id && t.user === user.id));
      if (next.length === tasks.length) return { success: false, message: 'Task not found' };
      setTasks(next);
      return { success: true, message: 'Task deleted successfully' };
    } catch {
      return { success: false, message: 'Unauthorized' };
    }
  },
};

import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};

// Profile API
export const profileAPI = {
  get: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  update: async (data: { name?: string; profile?: { bio?: string; avatar?: string } }) => {
    const response = await api.put('/profile', data);
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getAll: async (filters?: { status?: string; priority?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.search) params.append('search', filters.search);
    
    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
  create: async (data: {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
  }) => {
    const response = await api.post('/tasks', data);
    return response.data;
  },
  update: async (id: string, data: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
  }) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;

'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { profileAPI, tasksAPI } from '@/lib/api';
import { User, Task } from '@/types';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import ProfileCard from '@/components/ProfileCard';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
  });

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [profileRes, tasksRes] = await Promise.all([
        profileAPI.get(),
        tasksAPI.getAll(filters),
      ]);
      if (profileRes.success) setUser(profileRes.user);
      if (tasksRes.success) setTasks(tasksRes.tasks);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    loadData();
  };

  const handleTaskUpdated = () => {
    setEditingTask(null);
    loadData();
  };

  const handleTaskDeleted = () => {
    loadData();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCancel = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Section */}
              <div className="lg:col-span-1">
                <ProfileCard user={user} onUpdate={loadData} />
              </div>

              {/* Tasks Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
                    <button
                      onClick={() => {
                        setEditingTask(null);
                        setShowTaskForm(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      + New Task
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <select
                      value={filters.priority}
                      onChange={(e) =>
                        setFilters({ ...filters, priority: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {showTaskForm && (
                    <div className="mb-6">
                      <TaskForm
                        task={editingTask}
                        onSuccess={editingTask ? handleTaskUpdated : handleTaskCreated}
                        onCancel={handleCancel}
                      />
                    </div>
                  )}

                  <TaskList
                    tasks={tasks}
                    onEdit={handleEdit}
                    onDelete={handleTaskDeleted}
                    onUpdate={loadData}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

'use client';

import { Task } from '@/types';
import { tasksAPI } from '@/lib/api';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function TaskList({ tasks, onEdit, onDelete, onUpdate }: TaskListProps) {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(id);
        onDelete();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await tasksAPI.update(id, { status: newStatus as any });
      onUpdate();
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
              {task.description && (
                <p className="text-gray-600 mt-1">{task.description}</p>
              )}
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority} priority
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task._id, e.target.value)}
              className="ml-auto px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Plus, Pencil, Trash2, Circle, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import api from '../../api/axios';
import { TaskForm } from './TaskForm';

interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
}

export const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    const handleToggleComplete = async (task: Task) => {
        try {
            await api.put(`/tasks/${task.id}`, { completed: !task.completed });
            fetchTasks();
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingTask(null);
        fetchTasks();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500" />
                        <div>
                            <p className="text-gray-400 text-sm">WELCOME,</p>
                            <h1 className="text-2xl font-bold">{user?.fullName}</h1>
                        </div>
                    </div>
                    <Button onClick={logout} variant="secondary">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>

                {/* Tasks Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">My Tasks</h2>
                </div>

                {/* Task List */}
                <div className="space-y-4 mb-20">
                    {tasks.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            No tasks yet. Create one to get started!
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 flex items-start justify-between hover:bg-gray-800/70 transition-all"
                            >
                                <div className="flex items-start gap-4 flex-1">
                                    <button
                                        onClick={() => handleToggleComplete(task)}
                                        className="mt-1 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {task.completed ? (
                                            <CheckCircle2 className="w-6 h-6 text-blue-500" />
                                        ) : (
                                            <Circle className="w-6 h-6" />
                                        )}
                                    </button>
                                    <div className="flex-1">
                                        <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-600' : 'text-gray-400'}`}>
                                                {task.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Floating Add Button */}
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                >
                    <Plus className="w-8 h-8" />
                </button>

                {/* Task Form Modal */}
                {isFormOpen && (
                    <TaskForm
                        task={editingTask}
                        onClose={handleFormClose}
                    />
                )}
            </div>
        </div>
    );
};

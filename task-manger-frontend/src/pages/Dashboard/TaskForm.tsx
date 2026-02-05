import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { X } from 'lucide-react';
import api from '../../api/axios';

const taskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
    task?: { id: string; title: string; description?: string; completed: boolean } | null;
    onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: task ? { title: task.title, description: task.description || '' } : undefined,
    });

    const onSubmit = async (data: TaskFormData) => {
        try {
            setError('');
            if (task) {
                await api.put(`/tasks/${task.id}`, data);
            } else {
                await api.post('/tasks', data);
            }
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save task');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{task ? 'Edit Task' : 'New Task'}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Title"
                        placeholder="Task title"
                        error={errors.title?.message}
                        {...register('title')}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            placeholder="Add details about your task..."
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            rows={4}
                            {...register('description')}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" className="flex-1" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : (task ? 'Update' : 'Create')}
                        </Button>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

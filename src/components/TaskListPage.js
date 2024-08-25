import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        deadline: '',
        description: ''
    });
    const [editingTask, setEditingTask] = useState(null);
    const [newTask, setNewTask] = useState({
        projectName: '',
        description: '',
        technologies: '',
        deadline: '',
        teamLeader: '',
        category: '',
        fileAttachments: ''
    });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks', { params: filters });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            if (editingTask) {
                await axios.put(`http://localhost:5000/api/tasks/${editingTask}`, newTask);
                setEditingTask(null);
            } else {
                await axios.post('http://localhost:5000/api/tasks', newTask);
            }
            setNewTask({
                projectName: '',
                description: '',
                technologies: '',
                deadline: '',
                teamLeader: '',
                category: '',
                fileAttachments: ''
            });
            // Fetch tasks again to update the list
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error creating/updating task:', error);
        }
    };

    const handleUpdateTask = async (taskId) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}`, newTask);
            setEditingTask(null);
            setNewTask({
                projectName: '',
                description: '',
                technologies: '',
                deadline: '',
                teamLeader: '',
                category: '',
                fileAttachments: ''
            });
            // Fetch tasks again to update the list
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
            // Fetch tasks again to update the list
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            <div>
                <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
                <form onSubmit={handleCreateTask}>
                    <input
                        type="text"
                        placeholder="Project Name"
                        name="projectName"
                        value={newTask.projectName}
                        onChange={(e) => setNewTask({ ...newTask, projectName: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Technologies (comma separated)"
                        name="technologies"
                        value={newTask.technologies}
                        onChange={(e) => setNewTask({ ...newTask, technologies: e.target.value.split(',') })}
                    />
                    <input
                        type="date"
                        placeholder="Deadline"
                        name="deadline"
                        value={newTask.deadline}
                        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Team Leader"
                        name="teamLeader"
                        value={newTask.teamLeader}
                        onChange={(e) => setNewTask({ ...newTask, teamLeader: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="File Attachments (comma separated)"
                        name="fileAttachments"
                        value={newTask.fileAttachments}
                        onChange={(e) => setNewTask({ ...newTask, fileAttachments: e.target.value.split(',') })}
                    />
                    <button type="submit">{editingTask ? 'Update Task' : 'Create Task'}</button>
                </form>
            </div>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                />
                <label>Deadline:</label>
                <input
                    type="date"
                    name="deadline"
                    value={filters.deadline}
                    onChange={handleFilterChange}
                />
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={filters.description}
                    onChange={handleFilterChange}
                />
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <h3>{task.projectName}</h3>
                        <p>{task.description}</p>
                        <p>Technologies: {task.technologies.join(', ')}</p>
                        <p>Due Date: {new Date(task.deadline).toLocaleDateString()}</p>
                        <p>Team Leader: {task.teamLeader}</p>
                        <p>Category: {task.category}</p>
                        <p>Attachments: {task.fileAttachments.join(', ')}</p>
                        <button onClick={() => {
                            setEditingTask(task._id);
                            setNewTask({
                                projectName: task.projectName,
                                description: task.description,
                                technologies: task.technologies.join(','),
                                deadline: new Date(task.deadline).toISOString().substr(0, 10),
                                teamLeader: task.teamLeader,
                                category: task.category,
                                fileAttachments: task.fileAttachments.join(',')
                            });
                        }}>Edit</button>
                        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskListPage;

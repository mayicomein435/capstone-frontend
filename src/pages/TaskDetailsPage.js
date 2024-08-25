import React from 'react';
import { useLocation } from 'react-router-dom';

const TaskDetailsPage = () => {
    const location = useLocation();
    const tasks = location.state.tasks;

    return (
        <div>
            <h3>Task Details</h3>
            {tasks.map((task, index) => (
                <div key={index}>
                    <h4>{task.projectName}</h4>
                    <p>{task.description}</p>
                    <p>Technologies: {task.technologies.join(', ')}</p>
                    <p>Deadline: {task.deadline}</p>
                    <p>Team Leader: {task.teamLeader}</p>
                </div>
            ))}
        </div>
    );
};

export default TaskDetailsPage;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskAsync } from "../redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";

const TaskList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTaskAsync(taskId));
    }
  };

  const handleEdit = (task) => {
    onEdit(task);
  };

  return (
    <div className="task-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.length === 0 ? (
        <p className="col-span-full">No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="task-item border p-4 rounded-lg mb-4 space-y-4"
          >
            <h3 className="font-semibold text-xl">{task.title}</h3>
            <p>{task.description}</p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>

            {task.assignedTo ? (
              <p>
                <strong>Assigned To:</strong> {task.assignedTo.username}{" "}
              </p>
            ) : (
              <p>
                <strong>Assigned To:</strong> Not assigned
              </p>
            )}

            {/* Display Audit Log */}
            <div>
              <strong>Audit Log:</strong>
              <ul className="space-y-2">
                {task.auditLog.map((log, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded-md">
                    <p>
                      <strong>Action:</strong> {log.action}
                    </p>
                    <p>
                      <strong>Changed By:</strong>{" "}
                      {log.changedBy?.username || "Unknown User"}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(log.date).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white py-1 px-3 rounded w-full sm:w-auto"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded w-full sm:w-auto"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTaskAsync,
  updateTaskAsync,
  fetchUsersAsync,
} from "../redux/slices/taskSlice";
import { toast } from "react-toastify";

const TaskForm = ({ taskToEdit = null, onFormClose }) => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.tasks);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "2-medium",
    dueDate: "",
    assignedTo: "",
  });

  useEffect(() => {
    if (taskToEdit) {
      setTaskData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate.split("T")[0],
        assignedTo: taskToEdit.assignedTo || "",
      });
    }

    dispatch(fetchUsersAsync());
  }, [taskToEdit, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      dispatch(updateTaskAsync({ ...taskData, _id: taskToEdit._id }))
        .unwrap()
        .then(() => {
          setTaskData({
            title: "",
            description: "",
            status: "pending",
            priority: "2-medium",
            dueDate: "",
            assignedTo: "",
          });
          onFormClose();
          toast.success("Task updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating task:", error);
          toast.error("Error updating task!"); 
        });
    } else {
      dispatch(createTaskAsync(taskData))
        .unwrap()
        .then(() => {
          setTaskData({
            title: "",
            description: "",
            status: "pending",
            priority: "2-medium",
            dueDate: "",
            assignedTo: "",
          });
          onFormClose();
          toast.success("Task created successfully!"); 
        })
        .catch((error) => {
          console.error("Error creating task:", error);
          toast.error("Error creating task!"); 
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="task-form border p-4 rounded-lg mb-4 space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {taskToEdit ? "Edit Task" : "Create Task"}
      </h2>

      <input
        type="text"
        name="title"
        value={taskData.title}
        onChange={handleChange}
        placeholder="Task Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={taskData.description}
        onChange={handleChange}
        placeholder="Task Description"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="dueDate"
        value={taskData.dueDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="status"
        value={taskData.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        name="priority"
        value={taskData.priority}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="3-low">Low</option>
        <option value="2-medium">Medium</option>
        <option value="1-high">High</option>
      </select>

      <select
        name="assignedTo"
        value={taskData.assignedTo}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        disabled={loading}
        required
      >
        <option value="">Select Assignee</option>
        {loading ? (
          <option value="">Loading users...</option>
        ) : error ? (
          <option value="">{error}</option>
        ) : (
          users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))
        )}
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
      >
        {taskToEdit ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;

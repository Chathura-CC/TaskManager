import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync } from "../redux/slices/taskSlice";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sortBy: "",
  });
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchTasksAsync(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  const handleFormClose = () => {
    setTaskToEdit(null);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
        <div className="filters mb-4 flex gap-4 flex-wrap">
          <select
            name="status"
            onChange={handleFilterChange}
            value={filters.status}
            className="p-2 border rounded"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            name="priority"
            onChange={handleFilterChange}
            value={filters.priority}
            className="p-2 border rounded"
          >
            <option value="">All Priorities</option>
            <option value="3-low">Low</option>
            <option value="2-medium">Medium</option>
            <option value="1-high">High</option>
          </select>
          <select
            name="sortBy"
            onChange={handleFilterChange}
            value={filters.sortBy}
            className="p-2 border rounded"
          >
            <option value="">Sort By</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <TaskForm taskToEdit={taskToEdit} onFormClose={handleFormClose} />

        {loading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <TaskList tasks={tasks} onEdit={handleEditTask} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

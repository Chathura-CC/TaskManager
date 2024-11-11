import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnalyticsAsync } from "../redux/slices/analyticsSlice";
import { fetchTasksAsync } from "../redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalTasks, tasksDueToday, overdueTasks, loading, error } =
    useSelector((state) => state.analytics);
  const { token } = useSelector((state) => state.auth);
  const { tasks, tasksLoading, tasksError } = useSelector(
    (state) => state.tasks
  );

  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sortBy: "",
  });

  useEffect(() => {
    if (token) {
      dispatch(getAnalyticsAsync(token));
    } else {
      navigate("/login");
    }
  }, [dispatch, token, navigate]);

  useEffect(() => {
    if (filters) {
      dispatch(fetchTasksAsync(filters));
    }
  }, [dispatch, filters]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch analytics!");
    }
    if (tasksError) {
      toast.error("Failed to fetch tasks!");
    }
  }, [error, tasksError]);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowTaskForm(true);
  };

  const handleNewTask = () => {
    setTaskToEdit(null);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setTaskToEdit(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
        {loading || tasksLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {/* Analytics Data */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="card p-4 bg-white shadow rounded-lg">
                <h3 className="text-xl font-semibold">Total Tasks</h3>
                <p className="text-3xl">{totalTasks}</p>
              </div>
              <div className="card p-4 bg-white shadow rounded-lg">
                <h3 className="text-xl font-semibold">Tasks Due Today</h3>
                <p className="text-3xl">{tasksDueToday}</p>
              </div>
              <div className="card p-4 bg-white shadow rounded-lg">
                <h3 className="text-xl font-semibold">Overdue Tasks</h3>
                <p className="text-3xl">{overdueTasks}</p>
              </div>
            </div>

            {/* Filters */}
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

            <div className="mt-4">
              <button
                onClick={handleNewTask}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Create New Task
              </button>
            </div>

            {showTaskForm && (
              <TaskForm taskToEdit={taskToEdit} onFormClose={handleCloseForm} />
            )}

            {/* Task List */}
            <div className="mt-6">
              <TaskList tasks={tasks} onEdit={handleEditTask} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

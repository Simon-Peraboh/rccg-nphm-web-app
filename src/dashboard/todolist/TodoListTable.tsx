import React, { useEffect, useState } from 'react';
import { getAllList, TodoListDTO, deleteList, status, priority } from '../services/AuthServiceTodoList';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const TodoListTable: React.FC = () => {
  const [todos, setTodos] = useState<TodoListDTO[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getAllList();
      setTodos(response.data);
    } catch (error) {
      toast.error('Failed to fetch todos');
    }
  };

  const handleDelete = async (id: string) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this report?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await deleteList(id); // Call the API to delete
              setTodos(todos.filter(todo => todo.id !== id)); // Update state
              toast.success("Todo deleted successfully");
            } catch (error) {
              toast.error("Error deleting todo");
              console.error("Error deleting todo:", error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => toast.info("Deletion cancelled")
        }
      ]
    });
  };

  const handleStatusChange = async (id: string, action: string) => {
    try {
      await status(id, action);
      toast.success('Status updated successfully');
      fetchTodos(); // Refresh todos
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handlePriorityChange = async (id: string, action: string) => {
    try {
      await priority(id, action);
      toast.success('Priority updated successfully');
      fetchTodos(); // Refresh todos
    } catch (error) {
      toast.error('Failed to update priority');
    }
  };

  return (
    <div className="p-6 mx-auto bg-blues-200 shadow-md rounded-lg">
      <div className="mb-6">
        <Link 
          to="/dashboard/todoListCreate"
          className="inline-block px-2 py-2 bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add New Task
        </Link>
      </div>

      <table className="w-full border-collapse bg-slate-50 rounded-md overflow-hidden text-sm">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="px-4 py-2 border-b">Task</th>
            <th className="px-4 py-2 border-b">Description</th>
            <th className="px-4 py-2 border-b">Assignee</th>
            <th className="px-4 py-2 border-b">Start Date</th>
            <th className="px-4 py-2 border-b">Due Date</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Priority</th>
            <th className="px-4 py-2 border-b">Assigned</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {todos.length > 0 ? (
            todos.map(todo => (
              <tr key={todo.id} className="border-b">
                <td className="px-4 py-2">{todo.task}</td>
                <td className="px-4 py-2">{todo.description}</td>
                <td className="px-4 py-2">{todo.assignee}</td>
                <td className="px-4 py-2">{todo.startDate}</td>
                <td className="px-4 py-2">{todo.dueDate}</td>
                <td className="px-4 py-2">{todo.status}</td>
                <td className="px-4 py-2">{todo.priority}</td>
                <td className="px-4 py-2">{todo.assigned}</td>
                <td className="px-4 py-2 text-center flex space-x-2 items-center">
                  <Link 
                    to={`/dashboard/todoListEdit/${todo.id}`} 
                    className="px-3 py-1 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(todo.id!)} 
                    className="px-3 py-1 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                                    <div className="mb-2">
                    <label htmlFor={`status-${todo.id}`} className="text-sm font-medium">Status</label>
                    <select
                      id={`status-${todo.id}`}
                      onChange={(e) => handleStatusChange(todo.id!, e.target.value)}
                      value={todo.status}
                      className="w-full px-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="inProgress">In Progress</option>
                      <option value="inComplete">Incomplete</option>
                      <option value="complete">Complete</option>
                      <option value="clear">Clear</option>
                    </select>
                  </div>

                  <div className="mb-2">
                    <label htmlFor={`priority-${todo.id}`} className="text-sm font-medium">Priority</label>
                    <select
                      id={`priority-${todo.id}`}
                      onChange={(e) => handlePriorityChange(todo.id!, e.target.value)}
                      value={todo.priority}
                      className="w-full px-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="normal">Normal</option>
                      <option value="low">Low</option>
                      <option value="clear">Clear</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="px-4 py-2 text-center text-gray-500">
                No todos available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoListTable;

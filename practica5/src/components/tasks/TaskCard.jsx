import { Link } from 'react-router-dom';
import { updateTask, deleteTask } from '../../services/taskService';
import { CATEGORIES } from '../../utils/constants';
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers';

export default function TaskCard({ task }) {
  const category = CATEGORIES.find((c) => c.id === task.category);
  const overdue = isOverdue(task.dueDate, task.completed);
  const dueDateLabel = getDueDateLabel(task.dueDate);

  const handleToggleComplete = async (e) => {
    e.preventDefault();
    await updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      await deleteTask(task.id);
    }
  };

  return (
    <Link to={`/tasks/${task.id}`} className="block">
      <div
        className={`card hover:shadow-lg transition-shadow ${
          task.completed ? 'opacity-60' : ''
        } ${overdue ? 'border-2 border-red-400' : ''}`}
      >
        <div className="flex items-start justify-between gap-4">
          
          <div className="flex-1 min-w-0">
            
            <h3
              className={`text-lg font-semibold text-gray-800 truncate ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>

            
            {task.description && (
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {task.description}
              </p>
            )}

            
            <div className="flex flex-wrap gap-2 mt-3">
              
              {category && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium bg-${category.color}-100 text-${category.color}-800`}
                >
                  {category.label}
                </span>
              )}

              
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {task.completed ? '✓ Completada' : 'Pendiente'}
              </span>

              
              {dueDateLabel && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    overdue
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {overdue ? '⚠️ ' : '📅 '}
                  {dueDateLabel}
                </span>
              )}
            </div>
          </div>

          
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleToggleComplete}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                task.completed
                  ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                  : 'bg-green-100 hover:bg-green-200 text-green-800'
              }`}
              title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
            >
              {task.completed ? '↩ Reabrir' : '✓ Completar'}
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 rounded-lg text-sm font-medium bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
              title="Eliminar tarea"
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

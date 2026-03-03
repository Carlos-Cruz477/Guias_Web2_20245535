import React from 'react'
import {isOverdue } from '../../utils/dateHelpers';

const TaskStats = ({tasks}) => {

    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.completed).length
    const pendingTasks = tasks.filter(task=> !task.completed).length
    const overdueTasks = tasks.filter(task => isOverdue(task.dueDate, task.completed)).length
    const percentComplete = (totalTasks!==0) ? (completedTasks / totalTasks) * 100 : 0

  return (
<div className="flex flex-wrap gap-6 card mb-6">
  
  <div className="flex flex-col w-[48%]">
    <p className="text-gray-600 text-sm">Total de tareas:</p>
    <p className="text-2xl font-semibold">{totalTasks}</p>
  </div>

  <div className="flex flex-col w-[48%]">
    <p className="text-gray-600 text-sm">Tareas completas:</p>
    <p className="text-2xl font-semibold text-green-600">{completedTasks}</p>
  </div>

  <div className="flex flex-col w-[48%]">
    <p className="text-gray-600 text-sm">Tareas Pendientes:</p>
    <p className="text-2xl font-semibold text-yellow-600">{pendingTasks}</p>
  </div>

  <div className="flex flex-col w-[48%]">
    <p className="text-gray-600 text-sm">Tareas Vencidas:</p>
    <p className="text-2xl font-semibold text-red-600">{overdueTasks}</p>
  </div>

  <div className="flex flex-col w-full">
    <p className="text-gray-600 text-sm">Porcentaje de tareas completas:</p>
    <p className="text-2xl font-semibold text-blue-600">
      {percentComplete.toFixed(2)}%
    </p>
  </div>

</div>
  )
}

export default TaskStats
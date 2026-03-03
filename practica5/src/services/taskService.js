import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { db } from './firebase';
import toast from 'react-hot-toast';

const TASKS_COLLECTION = 'tasks';

/**
 * Suscribirse a las tareas del usuario en tiempo real
 * @param {string} userId - ID del usuario
 * @param {function} callback - Función que se ejecuta cuando cambian las tareas
 * @returns {function} Función para desuscribirse
 */
export const subscribeToTasks = (userId, callback) => {
  const q = query(
    collection(db, TASKS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      
      createdAt: doc.data().createdAt?.toDate(),
      dueDate: doc.data().dueDate?.toDate()
    }));
    callback(tasks);
  });
};


export const createTask = async (userId, taskData) => {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      ...taskData,
      userId,
      completed: false,
      createdAt: serverTimestamp()
    });
    toast.success('Se creó la tarea con éxito');
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating task:', error);
    toast.error('Hubo un error al crear la tarea');
    return { success: false, error: error.message };
  }
};


export const updateTask = async (taskId, updates) => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, updates);
    toast.success('Se editó la tarea con éxito');
    return { success: true };
  } catch (error) {
    console.error('Error updating task:', error);
    toast.error('Hubo un error al editar la tarea');
    return { success: false, error: error.message };
  }
};


export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
    toast.success('Se eliminó la tarea con éxito');
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    toast.error('Hubo un error al eliminar la tarea');
    return { success: false, error: error.message };
  }
};


export const getTaskById = async (taskId) => {
  try {
    const taskDoc = await getDoc(doc(db, TASKS_COLLECTION, taskId));
    if (taskDoc.exists()) {
      return {
        success: true,
        task: {
          id: taskDoc.id,
          ...taskDoc.data(),
          createdAt: taskDoc.data().createdAt?.toDate(),
          dueDate: taskDoc.data().dueDate?.toDate()
        }
      };
    } else {
      return { success: false, error: 'Tarea no encontrada' };
    }
  } catch (error) {
    console.error('Error getting task:', error);
    return { success: false, error: error.message };
  }
};

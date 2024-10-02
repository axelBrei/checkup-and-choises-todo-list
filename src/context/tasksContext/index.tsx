import {
  useCallback,
  useEffect,
  useReducer,
  createContext,
  memo,
  PropsWithChildren,
  useMemo,
  useContext,
} from "react";
import { type Task } from "~/models/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Quote } from "~/models/Quote";

import { taskReducer } from "./taskReducer";
import { TaskActionType, type TaskReducerState } from "./types";

const initialState = {
  tasks: [],
  loadingId: undefined,
  error: undefined,
};

// split context to improve performance and avoid re-renders
const TaskContext = createContext<TaskReducerState>(initialState);
const TaskActionsContext = createContext<{
  createTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  completeTask: (taskId: string) => void;
}>({
  createTask: () => {},
  deleteTask: () => {},
  completeTask: () => Promise.resolve(""),
});

export const useTasks = () => useContext(TaskContext);
export const useTasksActions = () => useContext(TaskActionsContext);

export const TasksProvider = memo<PropsWithChildren>(({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem("tasks").then((response) => {
      if (response?.startsWith("[")) {
        const tasks = JSON.parse(response) as Task[];

        dispatch({
          type: TaskActionType.rehydrate,
          payload: { tasks },
        });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state]);

  const _handleCreateTask = useCallback((task: Task) => {
    dispatch({
      type: TaskActionType.createTask,
      payload: { task },
    });
  }, []);

  const _handleDeleteTask = useCallback((taskId: string) => {
    dispatch({
      type: TaskActionType.deleteTask,
      payload: {
        id: taskId,
      },
    });
  }, []);

  const _handleCompleteTask = useCallback((taskId: string) => {
    dispatch({
      type: TaskActionType.completeTask,
      payload: { id: taskId },
    });
  }, []);

  const actions = useMemo(
    () => ({
      createTask: _handleCreateTask,
      deleteTask: _handleDeleteTask,
      completeTask: _handleCompleteTask,
    }),
    [_handleCreateTask, _handleDeleteTask, _handleCompleteTask]
  );

  return (
    <TaskActionsContext.Provider value={actions}>
      <TaskContext.Provider value={state}>{children}</TaskContext.Provider>
    </TaskActionsContext.Provider>
  );
});

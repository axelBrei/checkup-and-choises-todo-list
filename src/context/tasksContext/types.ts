import type { Task } from "~/models/Task";

export enum TaskActionType {
  createTask = "createTask",
  deleteTask = "deleteTask",
  completeTask = "completeTask",
  rehydrate = "rehydrate",
}

export type TaskReducerState = {
  tasks: Task[];
  error?: string;
  loadingId?: string;
};

export type TaskReducerActions =
  | {
      type: TaskActionType.createTask;
      payload: { task: Task };
    }
  | {
      type: TaskActionType.deleteTask;
      payload: { id: string };
    }
  | {
      type: TaskActionType.completeTask;
      payload: { id: string };
    }
  | {
      type: TaskActionType.rehydrate;
      payload: { tasks: Task[] };
    };

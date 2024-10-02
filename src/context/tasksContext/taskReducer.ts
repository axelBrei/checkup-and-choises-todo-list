import type { Reducer } from "react";
import {
  type TaskReducerState,
  type TaskReducerActions,
  TaskActionType,
} from "./types";
import { TaskStatus } from "~/models/Task";

export const taskReducer: Reducer<TaskReducerState, TaskReducerActions> = (
  state,
  action
) => {
  switch (action.type) {
    case TaskActionType.createTask:
      state.tasks.push(action.payload.task);

      return { ...state };
    case TaskActionType.deleteTask:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
      };
    case TaskActionType.completeTask:
      const completIndex = state.tasks.findIndex(
        (t) => t.id === action.payload.id
      );

      if (completIndex >= 0) {
        state.tasks.splice(completIndex, 1, {
          ...state.tasks.at(completIndex)!,
          status: TaskStatus.completed,
        });
      }

      return { ...state };
    case TaskActionType.rehydrate:
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    default:
      throw new Error("No such action type");
  }
};

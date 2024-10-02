export enum TaskStatus {
  pending = "PENDING",
  completed = "COMPLETED",
}

export type Task = {
  id: string;
  name: string;
  createdAt: string;
  status: TaskStatus;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  labels: string[];
  checklist: { id: string; text: string; done: boolean;}[];
};
export type ColumnProps = {
  title: string;
};

export type TaskCardProps = {
  task: Task;
};

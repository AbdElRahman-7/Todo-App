import { useFormik } from "formik";
import { useTaskContext } from "../../context/useTaskContext";
import type { Task } from "../../types/Todo";

type AddTaskProps = {
  status?: "todo" | "in-progress" | "done";
  closeForm: () => void;
  isGeneral?: boolean;
  taskToEdit?: Task;
};

const AddTask = ({
  status = "todo",
  closeForm,
  isGeneral = false,
  taskToEdit,
}: AddTaskProps) => {
  const { addTask, updateTask } = useTaskContext();

  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      title: taskToEdit?.title || "",
      description: taskToEdit?.description || "",
      status: taskToEdit?.status || status,
      labels: taskToEdit?.labels.join(", ") || "",
    },
    onSubmit: (values, { resetForm }) => {
      if (taskToEdit) {
        updateTask({
          ...taskToEdit,
          ...values,
          labels: values.labels
            ? values.labels.split(",").map((l) => l.trim())
            : [],
        });
      } else {
        const newTask: Task = {
          id: Date.now().toString(),
          title: values.title,
          description: values.description,
          status: values.status,
          labels: values.labels
            ? values.labels.split(",").map((l) => l.trim())
            : [],
          checklist: [],
        };
        addTask(newTask);
      }
      resetForm();
      closeForm();
    },
  });

  return (
    <div className="add-task-card">
      <div className="add-task-header">
        <h3 className="card-title">
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </h3>
        {taskToEdit && (
          <button className="close-btn" onClick={closeForm}>
            ×
          </button>
        )}
      </div>

      <form onSubmit={formik.handleSubmit} className="add-task-form">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="form-input"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
          className="form-textarea"
        />
        <input
          type="text"
          name="labels"
          placeholder="Labels (comma separated)"
          onChange={formik.handleChange}
          value={formik.values.labels}
          className="form-input"
        />

        {isGeneral && (
          <select
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            className={`form-select ${formik.values.status}`}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        )}

        <button type="submit" className="form-button">
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;

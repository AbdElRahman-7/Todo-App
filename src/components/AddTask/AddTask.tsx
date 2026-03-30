import { useFormik } from "formik";
import { useTaskContext } from "../../context/useTaskContext";

const AddTask = () => {
    const { addTask } = useTaskContext();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "todo",
    },
    onSubmit: (values, { resetForm }) => {
      const newTask = {
        id: Date.now().toString(),
        title: values.title,
        description: values.description,
        status: values.status as "todo" | "in-progress" | "done",
        labels: [],
        checklist: [],
      };
      addTask(newTask);
      resetForm();
    },
  });
  return (
  <form onSubmit={formik.handleSubmit} style={{ marginBottom: "20px" }}>
    <input
      type="text"
      name="title"
      placeholder="Task Title"
      onChange={formik.handleChange}
      value={formik.values.title}
    />

    <input
      type="text"
      name="description"
      placeholder="Description"
      onChange={formik.handleChange}
      value={formik.values.description}
    />

    <select
      name="status"
      onChange={formik.handleChange}
      value={formik.values.status}
    >
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="done">Done</option>
    </select>

    <button type="submit">Add Task</button>
  </form>
  );
};

export default AddTask;

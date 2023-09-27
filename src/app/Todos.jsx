import { TodoItem } from "@/Components/ServerComponent";
import { cookies } from "next/headers";

const fetchTodo = async (token) => {
  try {
    const res = await fetch(`${process.env.URL}/api/mytask`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });
    const data = await res.json();
    if (!data.success) return [];
    return data.tasks;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const Todos = async () => {
  // Get the token from cookies
  const token = cookies().get("token")?.value;

  // Fetch tasks and handle potential undefined tasks
  const tasks = await fetchTodo(token);

  return (
    <section className="todosContainer">
      {tasks?.map((task) => (
        <TodoItem
          title={task.title}
          description={task.description}
          id={task._id}
          key={task._id}
          completed={task.isCompleted}
        />
      ))}
    </section>
  );
};

export default Todos;

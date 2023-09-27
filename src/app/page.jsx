import { TodoItem } from "@/Components/ServerComponent";
import Form from "./addTodosForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export default async function Home() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");
  const tasks = await fetchTodo(token);
  //console.log(tasks);
  return (
    <div className="container">
      <Form></Form>
      <section className="todosContainer">
        {tasks.map((task) => {
          return (
            <TodoItem
              title={task.title}
              description={task.description}
              id={task._id}
              key={task._id}
              completed={task.isCompleted}
            />
          );
        })}
      </section>
    </div>
  );
}

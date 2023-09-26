import { TodoItem } from "@/Components/ServerComponent";
import Form from "./addTodosForm";
export default function Home() {
  return (
    <div className="container">
      <Form></Form>
      <section className="todosContainer">
        <TodoItem
          title={"do get job as soon as possible"}
          description={"do get job as soon as possible"}
          id={"sample id"}
          completed={true}
        />
      </section>
    </div>
  );
}

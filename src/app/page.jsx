import Form from "./addTodosForm";
import { Suspense } from "react";
import Todos from "./Todos";

export default async function Home() {
  return (
    <div className="container">
      <Form></Form>

      
      <Suspense fallback={<div>Loading todos .....</div>}>
        <Todos />
      </Suspense>
    </div>
  );
}

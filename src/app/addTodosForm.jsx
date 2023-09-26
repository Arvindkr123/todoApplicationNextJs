import React from "react";

const addTodosForm = () => {
  return (
    <div className="login">
      <section>
        <form>
          <h1>Add Todo</h1>
          <input type="text" placeholder="enter task title" />
          <input type="text" placeholder="enter task description" />
          <button type="submit">add Task</button>
        </form>
      </section>
    </div>
  );
};

export default addTodosForm;

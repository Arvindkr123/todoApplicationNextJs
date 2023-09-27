"use client";
import { context } from "@/Components/Client";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const AddTodosForm = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { user } = useContext(context);
  const router = useRouter();
  const onSumbmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user?._id) return redirect("/login");
  return (
    <div className="login">
      <section>
        <form onSubmit={onSumbmitHandler}>
          <h1>Add Todo</h1>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="enter task title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="enter task description"
          />
          <button type="submit">add Task</button>
        </form>
      </section>
    </div>
  );
};

export default AddTodosForm;

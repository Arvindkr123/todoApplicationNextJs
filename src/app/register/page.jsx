"use client";
import { context } from "@/Components/Client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(context);

  const onSumitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      setUser(data.user);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (user._id) return redirect("/");
  return (
    <div className="login">
      <section>
        <form onSubmit={onSumitHandler}>
          <h1>SignUp</h1>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="enter your name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="enter your email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder={"enter your password"}
          />
          <button type="submit">Sign Up</button>
          <p>OR</p>
          <Link href={"/login"}>Login</Link>
        </form>
      </section>
    </div>
  );
};

export default page;

"use client";
import { context } from "@/Components/Client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(context);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      // console.log(data);
      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (user?._id) return redirect("/");
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <h1>Login</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="enter your email"
          />
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
          />
          <button type="submit">log in</button>
          <p>OR</p>
          <Link href={"/register"}>new User</Link>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;

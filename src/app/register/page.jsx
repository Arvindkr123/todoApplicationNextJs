// "use client";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Register",
  description: "This is a Register page of todo App",
};

const page = () => {
  return (
    <div className="login">
      <section>
        <form>
          <h1>SignUp</h1>
          <input type="text" placeholder="enter your name" />
          <input type="email" placeholder="enter your email" />
          <input type="password" placeholder="enter your password" />
          <button type="submit">Sign Up</button>
          <p>OR</p>
          <Link href={"/login"}>Login</Link>
        </form>
      </section>
    </div>
  );
};

export default page;

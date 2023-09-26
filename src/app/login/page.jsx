// "use client";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Login",
  description: "This is a login page of todo App",
};

const LoginPage = () => {
  return (
    <div className="login">
      <section>
        <form>
          <h1>Login</h1>
          <input type="email" placeholder="enter your email" />
          <input type="password" placeholder="enter your password" />
          <button type="submit">log in</button>
          <p>OR</p>
          <Link href={"/register"}>new User</Link>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;

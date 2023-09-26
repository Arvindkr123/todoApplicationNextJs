"use client";

import Link from "next/link";
import { createContext, useContext, useState } from "react";

export const context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <context.Provider value={{ user, setUser }}>{children}</context.Provider>
  );
};

export function LogoutBtn() {
  const logoutHandler = () => {
    alert("logout called");
  };

  const { user } = useContext(context);
  return (
    <>
      {!user?.id ? (
        <Link href={"/login"}>Login</Link>
      ) : (
        <button className="btn" onClick={() => logoutHandler()}>
          Logout
        </button>
      )}
    </>
  );
}

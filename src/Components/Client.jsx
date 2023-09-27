"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);
  return (
    <context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </context.Provider>
  );
};

export function LogoutBtn() {
  const { setUser } = useContext(context);
  const logoutHandler = async () => {
    try {
      const response = await fetch("/api/auth/logout");
      const data = await response.json();
      if (!data.success) return toast.error(data.message);
      setUser({});
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { user } = useContext(context);
  return (
    <>
      {!user?._id ? (
        <Link href={"/login"}>Login</Link>
      ) : (
        <button className="btn" onClick={() => logoutHandler()}>
          Logout
        </button>
      )}
    </>
  );
}

export const TodoButton = ({ id, completed }) => {
  const deleteHandler = (id) => {
    alert("deleting todo ..." + id);
  };
  return (
    <>
      <input type="checkbox" checked={completed} />
      <button className="btn" onClick={() => deleteHandler(id)}>
        Delete
      </button>
    </>
  );
};

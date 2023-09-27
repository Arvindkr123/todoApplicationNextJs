"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      // console.log(error.message);
      return toast.error(error);
    }
  };
  const updateHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      // console.log(error.message);
      return toast.error(error);
    }
  };
  return (
    <>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => updateHandler(id)}
      />
      <button className="btn" onClick={() => deleteHandler(id)}>
        Delete
      </button>
    </>
  );
};

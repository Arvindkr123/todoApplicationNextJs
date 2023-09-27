"use client";
import { context } from "@/Components/Client";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

const Page = () => {
  const { user } = useContext(context);
  if (!user?._id) return redirect("/login");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height:"50vh"
      }}
    >
      <h1 style={{ textTransform: "capitalize" }}>Welcome {user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Page;

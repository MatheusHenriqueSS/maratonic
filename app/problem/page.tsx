"use client";
import { useState, useEffect } from "react";
import Nav from "../components/Nav/Nav";
import SearchProblem from "../components/SearchProblem/SearchProblem";
import { Problem } from "@prisma/client";
import SearchBar from "../components/SearchProblem/SearchBar";

export default async function Home() {
  const [classes, setClasses] = useState<Problem[]>();

  if (!classes) {
    useEffect(() => {
      fetch("api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((posts) => setClasses(posts));
    });
  }
  return (
    <main>
      <Nav />
      <SearchBar />
      <SearchProblem classes={classes} />
    </main>
  );
}

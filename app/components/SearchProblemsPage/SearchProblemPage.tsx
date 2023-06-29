import React, { useState } from "react";
import styles from "./SearchProblemPage.module.css";
import cardStyles from "./Card.module.css";
import { Problem } from "@prisma/client";

const SearchProblemPage: React.FC<{}> = () => {
  const [problems, setProblems] = React.useState<Problem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);

  React.useEffect(() => {
    fetch("api/problems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((probs) => {
        setProblems(probs);
        setFilteredProblems(probs);
        console.log(
          "categories",
          probs.map((p: Problem) => p?.categories)
        );
      })
      .catch((error) => console.log("a"));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm("");
    if (searchTerm === "") {
      setFilteredProblems(problems);
    } else {
      const filtered = problems.filter(
        (prob) =>
          prob.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prob.categories
            .map((item) => item.toLowerCase())
            .includes(searchTerm.toLowerCase())
      );
      setFilteredProblems(filtered);
    }
  };

  return (
    <div className={styles.main_container}>
      <div style={{ display: "block", marginTop: "50px" }}>
        <form
          className="flex items-center justify-center"
          onSubmit={handleSearch}
        >
          <label htmlFor="default-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-blue-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Problems"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2.5 top-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {filteredProblems.map((prob: Problem, idx) => {
        return (
          <a href={`${prob.link}`} key={idx}>
            <div key={prob.id} className={cardStyles.card}>
              <div className={cardStyles.header}>
                <h1> {prob.name} </h1>
              </div>
              <div className={cardStyles.conteiner}>
                <p>Categorias: {prob.categories.toString()}</p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default SearchProblemPage;

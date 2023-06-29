import React, { useState } from "react";
import styles from "./SearchPostPage.module.css";
import cardStyles from "./Card.module.css";
import { Post } from "@prisma/client";

const SearchPostPage: React.FC<{}> = () => {
  const [classes, setClasses] = React.useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClasses, setFilteredClasses] = useState<Post[]>([]);

  React.useEffect(() => {
    fetch("api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((posts) => {
        setClasses(posts);
        setFilteredClasses(posts);
        console.log(
          "categories",
          posts.map((p: Post) => p?.categories)
        );
      })
      .catch((error) => console.log("a"));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm("");
    if (searchTerm === "") {
      setFilteredClasses(classes);
    } else {
      const filtered = classes.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.categories
            .map((item) => item.toLowerCase())
            .includes(searchTerm.toLowerCase())
      );
      setFilteredClasses(filtered);
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
              placeholder="Search Classes"
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
      {filteredClasses.map((post: Post, idx) => {
        return (
          <a href={`classes/${post.id}`} key={idx}>
            <div key={post.id} className={cardStyles.card}>
              <div className={cardStyles.header}>
                <h1> {post.title} </h1>
              </div>
              <div className={cardStyles.conteiner}>
                <p>
                  Atualizado em: {new Date(post.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default SearchPostPage;

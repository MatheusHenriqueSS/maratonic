import React from "react";
import styles from "./SearchPostPage.module.css";
import cardStyles from "./Card.module.css";
import { Post } from "@prisma/client";

const SearchPostPage: React.FC<{}> = () => {
  const [classes, setClasses] = React.useState<Post[]>([]);
  if (classes.length == 0) {
    fetch("api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((posts) => setClasses(posts))
      .catch((error) => console.log("a"));
    console.log(classes);
    return (
      <div className={styles.main_container}>
        <p>Carregando...</p>
      </div>
    );
  }
  return (
    <div className={styles.main_container}>
      {classes.map((post: Post) => {
        return (
          <a
            href={`classes/${post.id}`}
          >
            <div
            key={post.id}
            className={cardStyles.card}
          >
            <div className={cardStyles.header}>
              <h1> {post.title} </h1>
            </div>
            <div className={cardStyles.conteiner}>
              <p>Atualizado em: {new Date(post.updatedAt).toLocaleString()}</p>
            </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default SearchPostPage;

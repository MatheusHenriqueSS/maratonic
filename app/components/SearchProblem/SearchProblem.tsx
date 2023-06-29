import React from "react";
import styles from "./SearchProblem.module.css";
import cardStyles from "./Card.module.css";
import { Problem } from "@prisma/client";
// problem.link deve ser mudado para problem.name

const SearchProblem: React.FC<{ classes: Problem[]}> = ({ classes }) => {
  return (
    <div className={styles.main_container}>
        
        {classes.map((problem: Problem) => {
            return (
                <div className={cardStyles.card}>
                    <div className={cardStyles.header}>
                        <h1> {problem.link} </h1> 
                    </div>
                    <div className={cardStyles.conteiner}>
                        <p>Atualizado em:</p>
                        <p>Mais coisa aqui</p>
                    </div>
                </div>
            )})}
    </div>
  );
};

export default SearchProblem;
import React from "react";
import styles from "./MainPage.module.css";

const MainPage: React.FC<{}> = () => {
  const discord_link =
    "https://www.google.com/url?q=https%3A%2F%2Fdiscord.gg%2FdkF7BmwKe8&sa=D&sntz=1&usg=AOvVaw2kZdAEQoEYve_hr-LaJQDT";
  return (
    <div className={styles.main_container}>
      <h1 style={{ textAlign: "center" }}>Maratonic</h1>

      <h2>Nossa História</h2>

      <h3>Quem Somos?</h3>

      <p>
        Somos uma entidade do{" "}
        <a href="https://ic.unicamp.br">Instituto de Computação</a> da UNICAMP
        que promove aulas e eventos para incentivar a estudarem e participarem
        de competições de programação competitiva.
      </p>

      <h3>Como tudo Começou</h3>

      <p>
        O MaratonIC começou com um pequeno grupo de alunos que se reunia para
        estudar tópicos avançados sobre algoritmos e estruturas de dados,
        focando em competições de programação competitiva. Os estudos eram
        muitas vezes feitos no discord (principalmente durante a pandemia).
      </p>

      <p>
        Eventualmente, teve-se a ideia de abrir o grupo para qualquer um que
        quisesse se aprofundar mais no assunto, mesmo aqueles que nunca haviam
        ouvido falar sobre. Isso fez com que o grupo crescesse.
      </p>

      <h3>Início das Aulas</h3>

      <p>
        Com o grande aumento de inciantes no grupo, os mais experientes
        resolveram dar aulas aos mais novos. Depois de um tempo, essas aulas
        começaram a ser abertas para qualquer um que quisesse assistí-las.
      </p>

      <h2>Como Participar?</h2>

      <h3>Grupo do Discord</h3>

      <p>
        Clicando <a href={discord_link}>aqui</a> você é convidado para entrar no
        nosso discord🥳
      </p>
      <p>
        Lá postamos avisos os eventos e aulas, além de alguns materiais de
        estudo👀.
      </p>

      <h3>Local, Data e Horário das Aulas</h3>

      <ul>
        <li>
          <strong>Local:</strong> Sala <strong>CC00</strong> do Instituto de
          Computação da UNICAMP
        </li>
        <li>
          <strong>Data:</strong> Todo sábado
        </li>
        <li>
          <strong>Horário:</strong> 14:00 até 16:00
        </li>
      </ul>

      <p>
        <strong>AVISO:</strong> Qualquer mudança no local, data ou horário das
        aulas é avisado previamente no{" "}
        <a href={discord_link}>nosso servidor do discord</a>.
      </p>
    </div>
  );
};

export default MainPage;

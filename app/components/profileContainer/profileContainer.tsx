"use client";
import profileIcon from "../Nav/icons/Union.svg";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./profileContainer.module.css";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { UserRole } from "@prisma/client";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import * as RankingUtils from "./getRanking";

const ProfilePictureContainer: React.FC<{ imagePath: StaticImageData }> = ({
  imagePath,
}) => {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={imagePath}
        alt="Foto de Perfil"
        width="180"
        className="rounded-full"
      />
    </div>
  );
};

const DataContainer: React.FC<{ dataName: string; dataInfo: string }> = ({
  dataName,
  dataInfo,
}) => {
  return (
    <h3 className={styles.itemContainer}>
      {" "}
      <span
        className="font-bold"
        style={{ marginLeft: "10px", marginRight: "10px", maxHeight: "10px" }}
      >
        {dataName}:
      </span>
      <div className={styles.itemText}> {dataInfo} </div>
    </h3>
  );
};

const ProfileContainer: React.FC<{}> = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [userName, setUserName] = useState<string>("");
  const [numberUserProblemsSolved, setNumberUserProblemsSolved] = useState<number>(0);
  const [numberUserProblemsTried, setNumberUserProblemsTried] = useState<number>(0);
  const [rank, setRank] = useState<string>("");

  if (!session) {
      <div className={styles.profileContainer}>
        <p>Carregando...</p>
      </div>
  }

  if (!user) {
    fetch("api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((users: User[]) =>
        users.find((user) => user.id === session?.user.id)
      )
      .then((user) => {
        setUser(user);

        if (!user) return;

        setUserName(user.name ? user.name : "Sem nome ainda😔");
        setNumberUserProblemsSolved(user.problemsSolvedIds.length);
        setNumberUserProblemsTried(user.problemsTriedIds.length);
        setRank(RankingUtils.getRanking(user.problemsSolvedIds.length));
        console.log(rank);
      })
      .catch(() => console.log("user not found"));

    return (
      <div className={styles.profileContainer}>
        <p>Carregando...</p>
      </div>
    );
  }
  return (
    <div className={styles.profileContainer}>
      <ProfilePictureContainer imagePath={profileIcon} />

      <div className={styles.doubleItemContainer}>
        <h3 className={styles.itemContainer}>
          {" "}
          <span
            className="font-bold"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            Nome:
          </span>
          <textarea
            defaultValue={user.name ? user.name : "Ainda sem nome😔"}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.textArea}
          ></textarea>
        </h3>
        <DataContainer
          dataName="Conta"
          dataInfo={
            user.role === UserRole.STUDENT ? "Estudante📚" : "Professor🏛️"
          }
        />
      </div>

      <div className={styles.doubleItemContainer}>
        <DataContainer dataName="Problemas Resolvidos" dataInfo={numberUserProblemsSolved.toString()} />
        <DataContainer dataName="Problemas Tentados" dataInfo={numberUserProblemsTried.toString()} />
      </div>

      <div className={styles.doubleItemContainer}>
        <div
          className={styles.itemContainer}
          style={{
            fontSize: "34px",
            width: "fit-content",
            height: "45px",
            textAlign: "center",
            display: "inline-flex",
            justifyContent: "center",
          }}
        >
          <span
            className="font-bold"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            Ranking:
          </span>{" "}
          <div className="flex items-center">
            <div
              className={styles.itemText}
              style={{
                border: "2px solid",
                height: "50px",
                color: RankingUtils.getRankingHexColor(rank),
              }}
            >
              {RankingUtils.getRankingName(rank)}
            </div>
            <div>
              <Image
                src={RankingUtils.getRankingIcon(rank)}
                alt="Rank"
                width={40}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.itemContainer}
        style={{
          width: "100%",
          marginTop: "auto",
          marginBottom: "10px",
          height: "fit-content",
        }}
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-10"
          style={{
            borderRadius: "15px",
            display: "inline-flex",
            alignItems: "center",
            marginRight: "auto",
            marginLeft: "auto",
          }}
          onClick={async () => {
            const newUser = await fetch(`api/users?id=${user.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: userName }),
            });
            toast.success("Nome alterado com sucesso!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            console.log(newUser);
          }}
        >
          Alterar nome
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-10"
          style={{
            borderRadius: "15px",
            display: "inline-flex",
            alignItems: "center",
            marginRight: "auto",
            marginLeft: "auto",
          }}
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileContainer;

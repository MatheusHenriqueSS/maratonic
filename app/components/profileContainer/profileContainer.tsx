"use client";
import profileIcon from "../Nav/icons/Union.svg";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./profileContainer.module.css";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { UserRole } from "@prisma/client";
import { signOut } from "next-auth/react";

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
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        {dataName}:
      </span>
      <div
        style={{
          border: "2px solid black",
          height: "35px",
          width: "auto",
          textAlign: "left",
          paddingLeft: "10px",
          paddingRight: "10px",
          overflow: "hidden",
          borderRadius: "10px",
          marginRight: "auto",
        }}
      >
        {" "}
        {dataInfo}{" "}
      </div>
    </h3>
  );
};

const ProfileContainer: React.FC<{}> = () => {
  const { data: session, update } = useSession();
  const [user, setUser] = useState<User>();
  const [userName, setUserName] = useState<string>("");
  const [rankColor, setRankColor] = useState<string>("");

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
        if (user) setUserName(user.name ? user.name : "");
      })
      .catch((error) => console.error(error));

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
        <DataContainer dataName="Problemas Resolvidos" dataInfo={"78"} />
        <DataContainer dataName="Problemas Tentados" dataInfo={"90"} />
      </div>
      <div>Ranking vai aqui</div>
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
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileContainer;

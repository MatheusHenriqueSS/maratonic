"use client";
import profileIcon from "../Nav/icons/Union.svg";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./profileContainer.module.css";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

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
      <span className="font-bold">{dataName}:</span> {dataInfo}
    </h3>
  );
};

const ProfileContainer: React.FC<{}> = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();

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
      .then((user) => setUser(user))
      .catch((error) => console.error(error))

    return (
      <div className={styles.profileContainer}>
        <p>Loading...</p>
      </div>
    );
  }
  console.log("User logged in profile page")
  console.log(user);
  return (
    <div className={styles.profileContainer}>
      <ProfilePictureContainer imagePath={profileIcon} />
      <div className={styles.doubleItemContainer}>
        <DataContainer dataName="Nome" dataInfo={user?.name ? user.name : ""} />
        <DataContainer
          dataName="Conta"
          dataInfo={user?.role ? "Estudante📚" : "Professor🏛️"}
        />
      </div>
    </div>
  );
};

export default ProfileContainer;

"use client";
import Image from "next/image";
import React from "react";
import {
  unauthenticatedLeftLinks,
  studentsLeftLinks,
  teachersLeftLinks,
  unauthenticatedRightLinks,
  authenticatedRightLinks,
  NavLink,
} from "./links";
import { UserRole } from "@prisma/client";
import logo from "./icons/MaratonIC_grande.png";
import styles from "./Nav.module.css";
import { useSession } from "next-auth/react";

const NavLinks: React.FC<{ links: NavLink[]; position?: string }> = ({
  links,
  position,
}) => {
  return (
    <div
      className={styles.links_container}
      style={
        position == "right" ? { marginLeft: "auto", marginRight: "5px" } : {}
      }
    >
      {links.map((link: NavLink) => {
        return (
          <div key={link.href} className={styles.link}>
            <a href={link.href}>
              <div
                className={styles.center_image}
                style={
                  !link.label
                    ? {
                        height: "55px",
                        marginBottom: "5px",
                        borderRadius: "50%",
                      }
                    : {}
                }
              >
                <Image
                  src={link.icon}
                  alt={"Ícone"}
                  width={link.label ? "30" : "60"}
                  style={
                    !link.label
                      ? { objectFit: "fill", borderRadius: "50%" }
                      : {}
                  }
                />
              </div>
              {link.label && (
                <div className={styles.bottom_link}> {link.label} </div>
              )}
            </a>
          </div>
        );
      })}
    </div>
  );
};

const NavLogo: React.FC<{}> = () => {
  return (
    <div className={styles.logo_container}>
      <span>
        <Image src={logo} alt="Logo" width="120" />
      </span>
    </div>
  );
};

const Nav: React.FC<{}> = () => {
  const { data: session } = useSession();

  var leftLinks;
  if (!session) {
    leftLinks = unauthenticatedLeftLinks;
  } else if (session.user.role == UserRole.TEACHER) {
    leftLinks = teachersLeftLinks;
  } else {
    leftLinks = studentsLeftLinks;
  }

  return (
    <div style={{ display: "block" }}>
      <nav className={styles.navbar}>
        <NavLogo />
        <NavLinks links={leftLinks} />
        <NavLinks
          links={session ? authenticatedRightLinks : unauthenticatedRightLinks}
          position="right"
        />
      </nav>
    </div>
  );
};

export default Nav;

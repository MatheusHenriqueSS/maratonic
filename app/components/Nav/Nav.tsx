import Link from 'next/link'
import Image from "next/image";
import React from "react";
import { route_links, login_links, logged_links } from "./links";
import logo from "./icons/MaratonIC_grande.png";
import styles from "./Nav.module.css";

type LinkRoute = {
  label: string;
  href: string;
  icon: string;
  is_profile?: boolean;
};

const NavLinks: React.FC<{ links: LinkRoute[]; position?: string }> = ({
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
      {links.map((link: LinkRoute) => {
        return (
          <div key={link.href} className={styles.link}>
            <Link href={link.href}>
              <div
                className={styles.center_image}
                style={
                  link.label == ""
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
                  alt={link.icon}
                  width={link.label != "" ? "30" : "60"}
                  style={link.is_profile ? { objectFit: "fill", borderRadius: "50%" } : {}}
                />
              </div>
              {link.label != "" && (
                <div className={styles.bottom_link}> {link.label} </div>
              )}
            </Link>
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
        <Image src={logo} alt="Maratonic logo" width="120" />
      </span>
    </div>
  );
};

const Nav: React.FC<{ is_logged?: boolean }> = ({ is_logged = false }) => {
  return (
    <nav className={styles.navbar}>
      <NavLogo />
      <NavLinks links={route_links} />
      <NavLinks
        links={is_logged ? logged_links : login_links}
        position="right"
      />
    </nav>
  );
};

export default Nav;

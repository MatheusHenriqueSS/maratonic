import Image from "next/image";
import React from "react";
import links from "./links";
import logo from "./icons/MaratonIC_grande.png";
import styles from "./Nav.module.css";

type Link = {
  label: string;
  href: string;
  icon: string;
};

const NavLinks: React.FC<{ links: Link[] }> = ({ links }) => {
  return (
    <div className={styles.links_container}>
      {links.map((link: Link) => {
        return (
          <div key={link.href} className={styles.link}>
            <a href={link.href}>
              <div className={styles.center_image}>
                <Image src={link.icon} alt={link.icon} width="30"/>
              </div>
              <div className={styles.bottom_link}>{link.label}</div>
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
        <Image src={logo} alt="Maratonic logo" width="120" />
      </span>
    </div>
  );
};

const Nav: React.FC<{}> = () => {
  return (
    <nav className={styles.navbar}>
      <NavLogo/>
      <NavLinks links={links} />
    </nav>
  );
};

export default Nav;

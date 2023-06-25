import house_icon from "./icons/house.svg";
import book_icon from "./icons/book.svg";
import balloon_icon from "./icons/balloon.svg";
import trophy_icon from "./icons/trophy.svg";
import user_icon from "./icons/Union.svg";
import incognito_icon from "./icons/incognito.svg";

const route_links_data = {
  links: [
    {
      label: "Início",
      href: "/",
      icon: house_icon,
    },
    {
      label: "Aulas",
      href: "/classes",
      icon: book_icon,
    },
    {
      label: "Problemas",
      href: "/problems",
      icon: balloon_icon,
    },
    {
      label: "Placar",
      href: "/standings",
      icon: trophy_icon,
    },
  ],
};

const login_links_data = {
  links: [
    {
      label: "Login",
      href: "/login",
      icon: incognito_icon,
    },
  ],
};

const logged_links_data = {
  links: [
    {
      label: "",
      href: "/bio",
      icon: user_icon,
      is_profile: true,
    },
  ],
};

export const route_links = JSON.parse(JSON.stringify(route_links_data)).links;
export const login_links = JSON.parse(JSON.stringify(login_links_data)).links;
export const logged_links = JSON.parse(JSON.stringify(logged_links_data)).links;

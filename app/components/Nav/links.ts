import house_icon from "./icons/house.svg";
import book_icon from "./icons/book.svg"
import balloon_icon from "./icons/balloon.svg"
import trophy_icon from "./icons/trophy.svg"
const links_data = {
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
const links = JSON.parse(JSON.stringify(links_data)).links;

export default links;

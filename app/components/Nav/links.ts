import houseIcon from "./icons/house.svg";
import bookIcon from "./icons/book.svg";
import balloonIcon from "./icons/balloon.svg";
import trophyIcon from "./icons/trophy.svg";
import userIcon from "./icons/Union.svg";
import incognitoIcon from "./icons/incognito.svg";
import plusIcon from "./icons/plus.svg";
import brushIcon from "./icons/brush.svg";

export type NavLink = {
  label?: string;
  href: string;
  icon: string;
};

const landingPageLink = {
  label: "Início",
  href: "/",
  icon: houseIcon,
};

const classesLink = {
  label: "Aulas",
  href: "/classes",
  icon: bookIcon,
};

const problemsLink = {
  label: "Problemas",
  href: "/problems",
  icon: balloonIcon,
};
const standingsLink = {
  label: "Placar",
  href: "/standings",
  icon: trophyIcon,
};

const createClassLink = {
  label: "Criar aula",
  href: "/create/class",
  icon: brushIcon,
};

const addProblemLink = {
  label: "Adicionar problema",
  href: "/create/problem",
  icon: plusIcon,
};

const unauthenticatedLeftLinksData = {
  links: [landingPageLink],
};

const studentsLeftLinksData = {
  links: [landingPageLink, classesLink, problemsLink, standingsLink],
};

const teachersLeftLinksData = {
  links: [
    landingPageLink,
    classesLink,
    problemsLink,
    standingsLink,
    createClassLink,
    addProblemLink,
  ],
};

const unauthenticatedRightLinksData = {
  links: [
    {
      label: "Login",
      href: "/login",
      icon: incognitoIcon,
    },
  ],
};

const authenticatedRightLinksData = {
  links: [
    {
      href: "/profile",
      icon: userIcon,
    },
  ],
};

export const unauthenticatedLeftLinks = JSON.parse(
  JSON.stringify(unauthenticatedLeftLinksData)
).links;
export const studentsLeftLinks = JSON.parse(
  JSON.stringify(studentsLeftLinksData)
).links;
export const teachersLeftLinks = JSON.parse(
  JSON.stringify(teachersLeftLinksData)
).links;
export const unauthenticatedRightLinks = JSON.parse(
  JSON.stringify(unauthenticatedRightLinksData)
).links;
export const authenticatedRightLinks = JSON.parse(
  JSON.stringify(authenticatedRightLinksData)
).links;

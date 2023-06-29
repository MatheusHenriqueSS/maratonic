import blackIcon from "./rankingIcons/preto.png";
import bronzeIcon from "./rankingIcons/marrom.png";
import silverIcon from "./rankingIcons/prata.png";
import goldIcon from "./rankingIcons/ouro.png";
import platinumIcon from "./rankingIcons/platina.png";
import diamondIcon from "./rankingIcons/diamante.png";
import masterIcon from "./rankingIcons/mestre.png";
import grandMasterIcon from "./rankingIcons/grao_mestre.png";

import { StaticImageData } from "next/image";

const rankings = [
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "master",
  "grand master",
];

const rankingIntervals = [1, 20, 50, 100, 200, 500, 1000];

// Returns false if the given number does not lie in [start, end) interval.
// Returns true otherwise
export function inInterval(
  interval: [start: number, end: number],
  number: number
): boolean {
  if (number < interval[0] || number >= interval[1]) return false;

  return true;
}

export function getRanking(numberProblemsSolved: number) {
  if (numberProblemsSolved < rankingIntervals[0]) return "black";

  for (let i = 0; i < rankingIntervals.length - 1; i++) {
    if (
      inInterval(
        [rankingIntervals[i], rankingIntervals[i + 1]],
        numberProblemsSolved
      )
    ) {
      return rankings[i];
    }
  }

  if (numberProblemsSolved >= rankingIntervals[rankingIntervals.length - 1])
    return rankings[rankingIntervals.length - 1];

  return "";
}

export function getRankingHexColor(ranking: string): string {
  if (ranking === "black") return "#000000";
  if (ranking === "bronze") return "#8B3706";
  if (ranking === "silver") return "#8B8B8B";
  if (ranking === "gold") return "#FCD00F";
  if (ranking === "platinum") return "#72BF44";
  if (ranking === "diamond") return "#283B90";
  if (ranking === "master") return "#AD00FF";
  if (ranking === "grand master") return "#FF0F00";

  return "";
}

export function getRankingName(ranking: string): string {
  if (ranking === "black") return "Sem classificação";
  if (ranking === "bronze") return "Iniciante";
  if (ranking === "silver") return "Iniciante++";
  if (ranking === "gold") return "Intermediário";
  if (ranking === "platinum") return "Intermediário++";
  if (ranking === "diamond") return "Avançado";
  if (ranking === "master") return "Avançado++";
  if (ranking === "grand master") return "Lenda";

  return "";
}

export function getRankingIcon(ranking: string): StaticImageData | string {
  let Icon;
  if (ranking === "black") Icon = blackIcon;
  if (ranking === "bronze") Icon = bronzeIcon;
  if (ranking === "silver") Icon = silverIcon;
  if (ranking === "gold") Icon = goldIcon;
  if (ranking === "platinum") Icon = platinumIcon;
  if (ranking === "diamond") Icon = diamondIcon;
  if (ranking === "master") Icon = masterIcon;
  if (ranking === "grand master") Icon = grandMasterIcon;

  if (Icon) return Icon;

  return "";
}

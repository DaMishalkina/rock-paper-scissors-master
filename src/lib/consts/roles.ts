import Lizard from "$lib/assets/icon-lizard.svg";
import Paper from "$lib/assets/icon-paper.svg";
import Rock from "$lib/assets/icon-rock.svg";
import Scissors from "$lib/assets/icon-scissors.svg";
import Spock from "$lib/assets/icon-spock.svg";
export type Role = {
    imageUrl: string,
    defeat: string[],
    linearGradient: string,
    shadowColor: string //rgb
}
export type Roles = Record<string, Role>;
export const roles: Roles  = {
    scissors: {
        imageUrl: Scissors,
        defeat:  ["paper", "lizard"],
        linearGradient: "linear-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%))",
        shadowColor: "rgb(201, 109, 29)"
    },
    spock: {
        imageUrl: Spock,
        defeat: ["rock", "scissors"],
        linearGradient: "linear-gradient(hsl(189, 59%, 53%), hsl(189, 58%, 57%))",
        shadowColor: "rgb(43, 140, 175)"
    },
    lizard: {
        imageUrl: Lizard,
        defeat: ["paper", "spock"],
        linearGradient: "linear-gradient(hsl(261, 73%, 60%), hsl(261, 72%, 63%))",
        shadowColor: "rgb(96, 56, 171)"
    },
    rock: {
        imageUrl: Rock,
        defeat: ["lizard", "scissors"],
        linearGradient: "linear-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))",
        shadowColor: "rgb(158, 21, 46)"
    },
    paper: {
        imageUrl: Paper,
        defeat:  ["rock", "spock"],
        linearGradient: "linear-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%))",
        shadowColor: "rgb(39, 64, 190)"
    }
};
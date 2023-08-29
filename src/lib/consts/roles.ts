import Lizard from "$lib/assets/icon-lizard.svg";
import Paper from "$lib/assets/icon-paper.svg";
import Rock from "$lib/assets/icon-rock.svg";
import Scissors from "$lib/assets/icon-scissors.svg";
import Spock from "$lib/assets/icon-spock.svg";
export type Role = {
    imageUrl: string,
    defeat: string[],
    linearGradient: string,
    shadowColor: string
}
export type Roles = Record<string, Role>;
export const roles: Roles  = {
    scissors: {
        imageUrl: Scissors,
        defeat:  ["paper", "lizard"],
        linearGradient: "linear-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%))",
        shadowColor: "#c96d1d"
    },
    spock: {
        imageUrl: Spock,
        defeat: ["rock", "scissors"],
        linearGradient: "linear-gradient(hsl(189, 59%, 53%), hsl(189, 58%, 57%))",
        shadowColor: "#2B8CAF"
    },
    lizard: {
        imageUrl: Lizard,
        defeat: ["paper", "spock"],
        linearGradient: "linear-gradient(hsl(261, 73%, 60%), hsl(261, 72%, 63%))",
        shadowColor: "#6038AB"
    },
    rock: {
        imageUrl: Rock,
        defeat: ["lizard", "scissors"],
        linearGradient: "linear-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))",
        shadowColor: "#9e152e"
    },
    paper: {
        imageUrl: Paper,
        defeat:  ["rock", "spock"],
        linearGradient: "linear-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%))",
        shadowColor: "#2740be"
    }
};
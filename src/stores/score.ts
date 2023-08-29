import {writable} from "svelte/store";
import {browser} from "$app/environment";

let stored = "";

if(browser){
    stored = localStorage.getItem("score") || "";
}



export const score = writable(stored || "0");

score.subscribe((value) => {
    if(browser){
        localStorage.setItem("score", value);
    }
});
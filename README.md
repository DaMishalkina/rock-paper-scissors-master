# Frontend Mentor - Rock Paper Scissors solution

This is a solution to the [Rock Paper Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH).

## Table of contents

- [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Rules](#rules)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Issues and modifications](#issues-and-modifications)
    - [Continued development](#continued-development)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors against the computer
- Maintain the state of the score after refreshing the browser _(optional)_
- **Bonus**: Play Rock, Paper, Scissors, Lizard, Spock against the computer _(optional)_

### Rules

If the player wins, they gain 1 point. If the computer wins, the player loses one point.


### Links

- Solution URL: [rock paper scissors master](https://damishalkina.github.io/rock-paper-scissors-master)

## My process

### Built with

- SvelteKit
- TypeScript
- Vite
- Mobile-first workflow


### What I learned

This project was created using Svelte and SvelteKit, that I have tried for the very first time. it was quite fun to learn something new. 

### Issues and modifications

- Some modifications must be made in order to deploy a SvelteKit app to the Github pages, such as installing the SvelteKit static adapter. [There are some useful advices.](https://www.okupter.com/blog/deploy-sveltekit-website-to-github-pages)
- In Svelte styles are scoped by default to prevent collisions, so in order to refer to an element without class or id selector :global() selector should be used.
```css
.close-button :global(svg) {
  width: 20px;
  height: 20px;
}
```

- I developed a system for switching between advanced and introductory game modes. However, advanced mode is the default for my app.

- Moreover I have decided to use value of 1200px as min-width for desktop version. The reason is the same as in the previous case.

### Continued development

- I want to replace Math.random with chat gpt. 


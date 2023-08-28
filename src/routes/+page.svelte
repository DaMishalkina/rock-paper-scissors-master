<script>
    import CloseIcon from "../components/svgs/CloseIcon.svelte";
    import Lizard from "$lib/assets/icon-lizard.svg";
    import Logo from "$lib/assets/logo-bonus.svg"
    import Paper from "$lib/assets/icon-paper.svg";
    import Rock from "$lib/assets/icon-rock.svg";
    import RulesIcon from "../components/svgs/RulesIcon.svelte";
    import Scissors from "$lib/assets/icon-scissors.svg";
    import { score } from "../stores/score.ts";
    import Spock from "$lib/assets/icon-spock.svg";
    let areRulesOpened = false;
    const roles = {
        "scissors": {
            imageUrl: Scissors,
            defeat:  ["paper", "lizard"],
            color: "linear-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%))"
        },
        "spock": {
            imageUrl: Spock,
            defeat: ["rock", "scissors"],
            color: "linear-gradient(hsl(189, 59%, 53%), hsl(189, 58%, 57%))"
        },
        "lizard": {
            imageUrl: Lizard,
            defeat: ["paper", "spock"],
            color: "linear-gradient(hsl(261, 73%, 60%), hsl(261, 72%, 63%))"
        },
        "rock": {
            imageUrl: Rock,
            defeat: ["lizard", "scissors"],
            color: "linear-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))"
        },
        "paper": {
            imageUrl: Paper,
            defeat:  ["rock", "spock"],
            color: "linear-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%))"
        }
    };
    // let chatGPTResponse = "";
    // import axios from "axios";
    let playerMove = "";
    let computerMove = "";
    let resultMessage = "";
    // let conversationHistory = [];

    // export async function getChatGPTResponse(playerMove, conversationHistory) {
    //     try {
    //         const response = await axios.post(
    //             VITE_OPENAI_ENDPOINT,
    //             {
    //                 model: "gpt-3.5-turbo-0301",
    //                 // prompt: `Player chose ${playerMove}. ChatGPT:`,
    //                 max_tokens: 50,
    //                 temperature: 0.7,
    //                 messages: [{role: "user", content: "Say this is a test!"}]
    //             },
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${VITE_OPENAI_API_KEY}`,
    //                 },
    //             }
    //         );
    //         console.log(response)
    //
    //         return response.data.choices[0].text;
    //     } catch (error) {
    //         console.error("Error calling OpenAI API:", error);
    //         throw error;
    //     }
    // }
    async function handlePlayerMove() {
        setTimeout(async () => {
            computerMove = Object.keys(roles)[Math.floor(Math.random() * 5)];
            if (computerMove === playerMove) {
                resultMessage = "Draw";
            }
            else if (roles[computerMove].defeat.indexOf(playerMove) > -1){
                resultMessage = "You lose";
            } else  {
                resultMessage = "You win";
                const actualScore = Number($score) + 1;
                score.set(String(actualScore))
            }
        }, 5000);
        // conversationHistory.push({ role: "player", content: playerMove });
        //
        // const chatGptResponse = await getChatGPTResponse(playerMove, conversationHistory);
        // conversationHistory.push({ role: "chatGPT", content: chatGptResponse });
        // console.log(conversationHistory);
        // Update UI or game logic with the chatGptResponse
    }
    const handlePlayAgainButton = () => {
        computerMove = "";
        playerMove = "";
        resultMessage = "";
    }

</script>

<div class="content-container">
    <header class="header">
        <img class="header__logo" src={Logo} alt="Rock Paper Scissors Lizard Spock" />
        <div class="score-container header__score-container">
            <p class="score-container__title">Score</p>
            <p class="score-container__value">{$score}</p>
        </div>
    </header>
    <main class="main">
        {#if areRulesOpened}
            <section class="modal__wrapper">
                <div class="modal__container">
                    <h2>Rules</h2>
                    <RulesIcon />
                    <button
                            class="close-button modal__close-button"
                            on:click={() => areRulesOpened = false}
                    >
                        <span class="visually-hidden-title">Close Rules</span>
                        <CloseIcon />
                    </button>
                </div>
            </section>
        {/if}
        <section class="game-board main__game-board">
            {#if playerMove.length === 0}
                <ul class="roles-list game_board__roles-list">
                    {#each Object.entries(roles) as [role, {imageUrl, color}], i (i)}
                        <li class="role roles-list__item">
                            <button
                                    class="role-chip"
                                    style="background: {color}"
                                    on:click={() => {
                                        playerMove = role;
                                        handlePlayerMove()
                                    }}
                            >
                                <span class="role-chip__image-wrapper">
                                     <img
                                             class="role-chip__icon"
                                             src={imageUrl}
                                             alt={role}
                                     />
                                </span>
                            </button>
                        </li>
                    {/each}
                </ul>
            {:else}
                <div class="action-container game-board__action-container">
                    <ul class="moves action-container__moves">
                        <li class="moves__item">
                            <div
                                    class="role-chip"
                                    style="background: {roles[playerMove].color}"
                            >
                                <div class="role-chip__image-wrapper">
                                    <img
                                            class="role-chip__icon"
                                            src={roles[playerMove].imageUrl}
                                            alt={playerMove}
                                    />
                                </div>
                            </div>
                            <p>You picked</p>
                        </li>
                        <li class="move moves__item">
                            <!--{#if computerMove.length > 0}-->
                            <!--    <div-->
                            <!--            class="role-chip computer-move"-->
                            <!--            style="background: {roles[computerMove].color}"-->
                            <!--    >-->
                            <!--        <div class="role-chip__image-wrapper">-->
                            <!--            <img-->
                            <!--                    class="role-chip__icon"-->
                            <!--                    src={roles[computerMove].imageUrl}-->
                            <!--                    alt={computerMove}-->
                            <!--            />-->
                            <!--        </div>-->
                            <!--    </div>-->
                            <!--{:else}-->
                            <!--    <div class="move__empty-content">-->

                            <!--    </div>-->
                            <!--{/if}-->
                            <div class="move__empty-content">

                            </div>
                            <p>The house picked</p>
                        </li>
                    </ul>
                    <div
                            class="action-container__float-content"
                            class:hidden={resultMessage.length === 0}
                    >
                        <p class="action-container__message">{resultMessage}</p>
                        <button
                                class="action-container__button"
                                on:click={() => handlePlayAgainButton()}>Play again</button>
                    </div>
                </div>
            {/if}
        </section>
    </main>
    <label class="rules-checkbox">
        <input
                class="rules-checkbox__input"
                on:change|preventDefault={() => areRulesOpened = !areRulesOpened}
                type="checkbox"
                checked={areRulesOpened}
        />
        rules
    </label>
</div>

<style>
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :root {
        --text-color: #fff;
        --border-color: hsl(217, 16%, 45%);
        --dark-text-color: hsl(229, 25%, 31%);
        --score-text-color: hsl(229, 64%, 46%);
    }
    :global(body) {
        font-family: "Barlow Semi Condensed", sans-serif;
        background: linear-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
        height: 100dvh;
        overflow: hidden;
        color: var(--text-color);
        text-transform: uppercase;
        margin: 0;
        padding: 0;
        font-weight: 600;
    }
    :global(button) {
        cursor: pointer;
        padding: 0;
        margin: 0;
        background: none;
        border: none;
    }
    :global(button):focus {
        outline: none;
    }
    :global(ul){
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .content-container {
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100dvh;
    }
    
    .rules-checkbox {
        /*position: absolute;*/
        /*bottom: 55px;*/
        /*right: 50%;*/
        /*transform: translate(50%, 0);*/
        font-size: 16px;
        padding: 15px 38px 12px 38px;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        cursor: pointer;
        letter-spacing: 0.25em;
        align-self: center;
    }
    .rules-checkbox__input {
        height: 0;
        width: 0;
        visibility: hidden;
    }
    .modal__wrapper {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 75%);
        z-index: 100;
    }
    .modal__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 100dvh;
        background: #fff;
        color: var(--dark-text-color);
        /*position: absolute;*/
        /*top: 50%;*/
        /*left: 50%;*/
        /*transform:  translate(-50%, -50%);*/
        /*width: fit-content;*/
        /*height: fit-content;*/
    }
    .visually-hidden-title:not(:focus):not(:active) {
        clip: rect(0 0 0 0);
        clip-path: inset(100%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
    .close-button {
        display: flex;
    }
    .close-button :global(svg) {
        width: 20px;
        height: 20px;
    }
    .header {
        border: 2px solid var(--border-color);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 10px 22px;
    }
    .header__logo {
        width: 48px;
        height: 48px;
    }
    .header__score-container {
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 14px 24px;
        border-radius: 4px;

    }
    .score-container__title {
        font-size: 14px;
        color: var(--score-text-color);
    }
    .score-container__value {
        font-size: 32px;
        color: var(--dark-text-color);
    }
    .hidden {
        visibility: hidden;
    }
    .main {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .game-board {
        display: flex;
        justify-content: center;
        flex: 1;
    }
    .roles-list {
        background-image: url("../lib/assets/bg-pentagon.svg");
        background-repeat: no-repeat;
        background-size: 209px 215px;
        background-position: center;
        height: 310px;
        width: 310px;
        position: relative;
        align-self: center;
    }
    .role {
        position: absolute;
    }
    .role:nth-child(1) {
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .role:nth-child(2) {
        top: 50%;
        left: 0;
        transform: translate(0, -75%);
    }
    .role:nth-child(3) {
        top: 50%;
        right: 0;
        transform: translate(0, -75%);
    }
    .role:nth-child(4) {
        bottom: 0;
        left: 0;
        transform: translate(50%, 0);
    }
    .role:nth-child(5) {
        bottom: 0;
        right: 0;
        transform: translate(-50%, 0);
    }


    .role-chip {
        padding: 11px;
        border-radius: 100px;
        height: 97px;
        width: 97px;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(50, 50, 93, 0.25) 0 50px 100px -20px, rgba(0, 0, 0, 0.3) 0 30px 60px -30px, rgba(10, 37, 64, 0.35) 0 -2px 6px 0 inset;
    }
    .role-chip__image-wrapper {
        background: #fff;
        border-radius: 100px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }
    .role-chip__icon {
        max-height: 40px;
        max-width: 42px;
    }
    .action-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-around;
    }
    .moves {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .moves__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 28px;
    }
    .move__empty-content {
        height: 97px;
        width: 97px;
        border-radius: 100px;
        background: #1A2946;
        box-shadow: rgba(50, 50, 93, 0.25) 0 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0 18px 36px -18px inset;
    }
</style>
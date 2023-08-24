<script>
    import CloseIcon from "../components/svgs/CloseIcon.svelte";
    import RulesIcon from "../components/svgs/RulesIcon.svelte";
    import { score } from "../stores/score.ts";

    let areRulesOpened = false;
    const roles = ["rock", "paper", "scissors", "lizard", "spock"];
    const playBible = {
        "rock": ["lizard", "scissors"],
        "scissors": ["paper", "lizard"],
        "paper": ["rock", "spock"],
        "lizard": ["paper", "spock"],
        "spock": ["rock", "scissors"]
    }
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
        computerMove = roles[Math.floor(Math.random() * 5)];
        if (computerMove === playerMove) {
            resultMessage = "Draw";
        }
        else if (playBible[computerMove].indexOf(playerMove) > -1){
            resultMessage = "You lose";
        } else  {
            resultMessage = "You win";
            const actualScore = Number($score) + 1;
            score.set(String(actualScore))
        }
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

<div>
    <header class="">
        <h1>Rock Paper Scissors Lizard Spock</h1>
        <div>
            <p>Score</p>
            <p>{$score}</p>
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
        <ul>
            {#each roles as role, i (i)}
                <li>
                    <button on:click={() => {
                        playerMove = role
                        handlePlayerMove()
                    }}>{role}</button>
                </li>
            {/each}
        </ul>
        {#if computerMove.length > 0}
            <p>{computerMove}</p>
        {/if}
        {#if resultMessage.length > 0}
            <section>
                <p>{resultMessage}</p>
                <button on:click={() => handlePlayAgainButton()}>Play again</button>
            </section>

        {/if}
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
    :global(body) {
        font-family: "Barlow Semi Condensed", sans-serif;
        background: radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
        height: 100vh;
        overflow: hidden;
        --text-color: #fff;
        --border-color: hsl(217, 16%, 45%);
        --dark-text-color: hsl(229, 25%, 31%);
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
    .main {
        position: relative;
        display: flex;
    }
    
    .rules-checkbox {
        position: absolute;
        bottom: 55px;
        right: 50%;
        transform: translate(50%, 0);
        font-size: 16px;
        padding: 15px 38px 12px 38px;
        border: 2px solid var(--border-color);
        border-radius: 10px;
        cursor: pointer;
        letter-spacing: 0.25em;
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
        height: 100vh;
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

</style>
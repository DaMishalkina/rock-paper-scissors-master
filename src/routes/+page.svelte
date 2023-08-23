<script>
    import RulesIcon from '../components/svgs/RulesIcon.svelte';
    let areRulesOpened = false;
    let score = 0;
    const roles = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const playBible = {
        'rock': ['lizard', 'scissors'],
        'scissors': ['paper', 'lizard'],
        'paper': ['rock', 'spock'],
        'lizard': ['paper', 'spock'],
        'spock': ['rock', 'scissors']
    }
    // let chatGPTResponse = '';
    // import axios from 'axios';
    let playerMove = '';
    let computerMove = '';
    let resultMessage = '';
    // let conversationHistory = [];

    // export async function getChatGPTResponse(playerMove, conversationHistory) {
    //     try {
    //         const response = await axios.post(
    //             VITE_OPENAI_ENDPOINT,
    //             {
    //                 model: 'gpt-3.5-turbo-0301',
    //                 // prompt: `Player chose ${playerMove}. ChatGPT:`,
    //                 max_tokens: 50,
    //                 temperature: 0.7,
    //                 messages: [{role: 'user', content: 'Say this is a test!'}]
    //             },
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${VITE_OPENAI_API_KEY}`,
    //                 },
    //             }
    //         );
    //         console.log(response)
    //
    //         return response.data.choices[0].text;
    //     } catch (error) {
    //         console.error('Error calling OpenAI API:', error);
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
        } else  resultMessage = "You win";
        // conversationHistory.push({ role: 'player', content: playerMove });
        //
        // const chatGptResponse = await getChatGPTResponse(playerMove, conversationHistory);
        // conversationHistory.push({ role: 'chatGPT', content: chatGptResponse });
        // console.log(conversationHistory);
        // Update UI or game logic with the chatGptResponse
    }

</script>

<div>
    <header class=''>
        <h1>Rock Paper Scissors Lizard Spock</h1>
        <div>
            <p>Score</p>
            <p>{score}</p>
        </div>
    </header>
    <main>
        {#if areRulesOpened}
            <section class=''>
                <RulesIcon />
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
            <p>{resultMessage}</p>
        {/if}
        <label>
            <input
                    on:change|preventDefault={() => areRulesOpened = !areRulesOpened}
                    type='checkbox'
                    checked={areRulesOpened}
            />
            rules
        </label>
    </main>
</div>

<style>
    :global(body) {
        font-family: 'Barlow Semi Condensed', sans-serif;
        background: radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
        height: 100vh;
        overflow: hidden;
        --text-color: #fff;
        color: var(--text-color);
        text-transform: uppercase;
    }
</style>
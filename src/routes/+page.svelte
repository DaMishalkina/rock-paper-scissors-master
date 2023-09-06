<script lang="ts">
    import ActionComponent from "$lib/components/ActionComponent.svelte";
    import ButtonWrapper from "$lib/components/ButtonWrapper.svelte";
    import Logo from "$lib/assets/logo-bonus.svg";
    import Modal from "$lib/components/Modal.svelte";
    import {modal} from "../stores/modal";
    import RoleChip from "$lib/components/RoleChip.svelte";
    import {roles} from "$lib/consts/roles";
    import RolesList from "$lib/features/RolesList/RolesList.svelte";
    import RulesIcon from "$lib/components/svgs/RulesIcon.svelte";
    import { score } from "../stores/score";
    import Tooltip from "$lib/components/Tooltip.svelte";


    let playerMove = "";
    let computerMove = "";
    let resultMessage = "";
    let winnerMove = "";

    const delay = (callback: () => unknown, ms: number) => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                resolve(callback())
            }, ms)
        })
    }
    const onRulesToggle = (event: CustomEvent) => {
        $modal.open = event.detail;
    }
    async function handlePlayerMove(event: CustomEvent) {
        playerMove = event.detail;
        await delay(() => {
            computerMove = Object.keys(roles)[Math.floor(Math.random() * 5)];
            if (computerMove === playerMove) {
                resultMessage = "Draw";
            }
            else if (roles[computerMove].defeat.indexOf(playerMove) > -1){
                winnerMove = computerMove;
                resultMessage = "You lose";
            } else  {
                winnerMove = playerMove;
                resultMessage = "You win";
                const actualScore = Number($score) + 1;
                score.set(String(actualScore))
            }
        }, 3000);
    }
    const handlePlayAgainButton = () => {
        computerMove = "";
        playerMove = "";
        resultMessage = "";
        winnerMove = "";
    }
    const handleReset = () => {
        score.set("0");
    }

</script>

<div class="content-container">
    <header class="header content-container__header">
        <img class="header__logo" src={Logo} alt="Rock Paper Scissors Lizard Spock" />
        <div class="score-container header__score-container">
            <p class="score-container__title">Score</p>
            <p class="score-container__value">{$score}</p>
        </div>
    </header>
    <main class="main content-container__main">
        {#if $modal.open === true}
            <Modal>
                <h2 class="main__modal-title">Rules</h2>
                <RulesIcon />
            </Modal>
        {/if}
        <section class="game-board main__game-board">
            {#if playerMove.length === 0}
                <RolesList roles={roles} on:chipClick={handlePlayerMove} />
            {:else}
                <div class="action-container game-board__action-container">
                    <ul
                            class="action-items action-container__items"
                            class:action-items--defined-moves={resultMessage.length > 0}
                    >
                        <li
                                class="move action-item"
                        >
                            <div>
                                <Tooltip>
                                    <RoleChip
                                            role={playerMove}
                                            imageUrl={roles[playerMove].imageUrl}
                                            shadowColor={roles[playerMove].shadowColor}
                                            linearGradient={roles[playerMove].linearGradient}
                                            isActive={playerMove === winnerMove}
                                            isLarge={true}
                                    />
                                    <span slot="tooltip__content">
                                        {playerMove}
                                    </span>
                                </Tooltip>
                            </div>
                            <p>You picked</p>
                        </li>
                        <li
                                class="move action-item"
                        >
                            {#if computerMove.length > 0}
                                <div>
                                    <Tooltip>
                                        <RoleChip
                                                isActive={computerMove === winnerMove}
                                                role={computerMove}
                                                imageUrl={roles[computerMove].imageUrl}
                                                shadowColor={roles[computerMove].shadowColor}
                                                linearGradient={roles[computerMove].linearGradient}
                                                isLarge={true}
                                        />
                                        <span slot="tooltip__content">{computerMove}</span>
                                    </Tooltip>
                                </div>
                            {:else}
                                <div class="empty-move move__empty-content">
                                    <div class="empty-move__item"></div>
                                </div>
                            {/if}
                            <p>The house picked</p>
                        </li>
                        <li
                                class="float-content action-item"
                                class:float-content--hidden={resultMessage.length === 0}
                        >
                            <p class="float-content__message">{resultMessage}</p>
                            <ButtonWrapper
                                    className="float-content__button"
                                    on:click={() => handlePlayAgainButton()}>
                                Play again
                            </ButtonWrapper>
                        </li>
                    </ul>
                </div>
            {/if}
        </section>
    </main>
    <footer class="footer content-container__footer">
        <ActionComponent
                isCheckbox={true}
                isChecked={$modal.open}
                on:check={onRulesToggle}
        >
            <span>rules</span>
        </ActionComponent>
        <ActionComponent
                on:click={handleReset}
                isDisabled={$score === "0"}
        >
            <span>reset</span>
        </ActionComponent>
    </footer>
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
        background: radial-gradient(circle at 54% 0%, rgba(31, 55, 86, 1) 10%, rgba(20, 21, 57, 1) 100%);
        color: var(--text-color);
        text-transform: uppercase;
        margin: 0;
        padding: 0;
        font-weight: 600;
    }
    :global(button) {
        font-family: "Barlow Semi Condensed", sans-serif;
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
    :global(.visually-hidden-title:not(:focus):not(:active)) {
        clip: rect(0 0 0 0);
        clip-path: inset(100%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
    .content-container {
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100dvh;
    }
    .header {
        width: 100%;
        max-width: 704px;
        margin: 0 auto;
    }
    .header {
        border: 2px solid var(--border-color);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 10px 22px;
        flex-shrink: 0;
    }
    .header__logo {
        width: 48px;
        height: 48px;
    }
    .score-container {
        height: 100%;
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
        font-size: 28px;
        color: var(--dark-text-color);
    }
    .main {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: 2em 0;
    }
    .game-board {
        display: flex;
        justify-content: center;
        flex: 1;
    }

    .action-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-around;
    }
    .action-items {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 704px;
        width: 100%;
        margin: 0 auto;
        flex-flow: wrap;
        row-gap: 10%;
    }
    .move {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 28px;
    }
    .move__empty-content {
        display: flex;
        align-items: center;
        height: 133px;
    }
    .empty-move__item {
        display: flex;
        height: 97px;
        width: 97px;
        border-radius: 100px;
        background: linear-gradient(rgba(31, 55, 86, 1), rgba(20, 21, 57, 1));
        box-shadow: rgba(50, 50, 93, 0.25) 0 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0 18px 36px -18px inset;
        position: relative;
        border: 10rem;
        animation: animate 1s linear infinite;
    }
    .empty-move__item::before {
        position: absolute;
        content: "";
        background: #1A2946;
        border-radius: 10rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 80%;
    }
    @keyframes animate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .float-content--hidden {
        visibility: hidden;
        opacity: 0;
    }
    .float-content {
        display: flex;
        flex-direction: column;
        gap: 27px;
        justify-content: center;
        align-items: center;
        flex-basis: 100%;
        transition: opacity 3s ease-in;
    }
    .float-content__message {
        font-size: 40px;
        font-weight: 700;
    }
    :global(.float-content__button) {
        background: #fff;
        border-radius: 6px;
        color: var(--dark-text-color);
        font-size: 16px;
        padding: 20px 60px 17px 60px;
        text-transform: uppercase;
        letter-spacing: 0.25em;
        font-weight: 600;
    }
    .main__modal-title {
        margin-bottom: 20px;
    }
    .footer {
        display: flex;
        gap: 32px;
        align-items: center;
        justify-content: center;
    }

    @media (min-width: 1200px) {
        .content-container {
            padding: 46px 30px 30px;
        }
        .header {
            padding: 18px 18px 18px 30px;
        }
        .header__logo {
            height: 108px;
            width: auto;
        }
        .score-container {
            padding: 20px 50px;
        }
        .score-container__title {
            font-size: 16px;
        }
        .score-container__value {
            font-size: 45px;
        }
        .move {
            height: 100%;
            flex-direction: column-reverse;
            gap: 68px;
        }
        .move__empty-content {
            height: fit-content;
            flex: 1;
        }
        .move__empty-content :global(div) {
            width: 222px;
            height: 222px;
            border-radius: 222px;
            flex: 1;
        }
        .action-items--defined-moves {
            max-width: 940px;
        }
        .action-item:nth-child(1) {
            order: 1;
        }
        .action-item:nth-child(2) {
            order: 3;
        }
        .action-item:nth-child(3) {
            flex-basis: 0;
            order: 2;
            flex-grow: 1;
        }
        .footer {
            justify-content: flex-start;
            flex-direction: row-reverse;
        }
    }
</style>
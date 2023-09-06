<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let isCheckbox = false, isChecked = false, isDisabled = false;
    const dispatch = createEventDispatcher<{check: boolean}>();
    const handleActionInputChange = () => {
        dispatch("check", !isChecked)
    }
</script>


{#if isCheckbox}
    <label class="action" class:action--disabled={isDisabled}>
        <input
                disabled={isDisabled}
                on:change|preventDefault={() => handleActionInputChange()}
                class="action__input"
                type="checkbox"
                bind:checked={isChecked}
        />
        <slot/>
        {#each [...Array(4).keys()] as i (i)}
            <span
                    class="action__hovered-span"
                    style="--n: {i + 1}"
            ></span>
        {/each}
    </label>
{:else}
    <button
            class="action"
            class:action--disabled={isDisabled}
            on:click
            disabled={isDisabled}
    >
        <slot/>
        {#each [...Array(4).keys()] as i (i)}
            <span
                    class="action__hovered-span"
                    style="--n: {i + 1}"
            ></span>
        {/each}
    </button>
{/if}

<style>
    .action {
        font-size: 16px;
        padding: 15px 38px 12px 38px;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        cursor: pointer;
        letter-spacing: 0.25em;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        align-self: start;
        color: #fff;
        text-transform: uppercase;
        font-weight: 600;
    }
    .action--disabled {
        color: var(--border-color);
        cursor: default;
    }
    .action:not(.action--disabled) .action__hovered-span {
        position: absolute;
        width: 25%;
        height: 100%;
        background-color: var(--border-color);
        transform: translateY(150%);
        border-radius: 50%;
        left: calc((var(--n) - 1) * 25%);
        transition: 0.2s;
        transition-delay: calc((var(--n) - 1) * 0.06s);
        z-index: -1;
    }
    .action:hover {
        transform: translateY(-3px);
    }
    .action:is(.action--disabled):hover {
        transform: none;
    }
    .action:hover .action__hovered-span{
        transform: translateY(0) scale(2);
    }
    .action:active, .action:focus {
        transform: translateY(-1px);
    }
    .action:is(.action--disabled):active, .action:is(.action--disabled):focus {
        transform: none;
    }
    .action__input {
        height: 0;
        width: 0;
        visibility: hidden;
    }

</style>


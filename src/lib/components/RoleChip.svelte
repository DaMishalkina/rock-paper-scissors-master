<script lang="ts">
    export let role: string, imageUrl: string, shadowColor: string, linearGradient: string, isButton = false;
</script>

{#if isButton}
    <button
            class="role-chip--button role-chip"
            style="
            --background-color: {linearGradient};
            --shadow-color: {shadowColor}"
            on:click
    >
        <span class="role-chip__image-wrapper">
             <img
                     class="role-chip__icon"
                     src={imageUrl}
                     alt={role}
             />
        </span>
    </button>
{:else}
    <div
            class="role-chip"
            style="
            --background-color: {linearGradient};
            --shadow-color: {shadowColor}"
    >
        <span class="role-chip__image-wrapper">
             <img
                     class="role-chip__icon"
                     src={imageUrl}
                     alt={role}
             />
        </span>
    </div>
{/if}


<style>
    :root {
        --background-color: inherit;
        --shadow-color: inherit;
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
        background: var(--background-color);
        box-shadow: 0 4px 0 var(--shadow-color);
    }
    .role-chip--button::after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 100px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: all .4s;
        background: var(--background-color);
    }
    .role-chip--button:hover {
        transform: translateY(-3px);
    }
    .role-chip--button:hover::after {
        transform: scaleX(1.4) scaleY(1.6);
        box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px, rgba(0, 0, 0, 0.12) 0 -12px 30px, rgba(0, 0, 0, 0.12) 0 4px 6px, rgba(0, 0, 0, 0.17) 0 12px 13px, rgba(0, 0, 0, 0.09) 0 -3px 5px;
        opacity: 0;
    }
    .role-chip--button:active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
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
        box-shadow: inset 0 5px 0 rgba(96,110,133,.25);
    }
    .role-chip__icon {
        max-height: 40px;
        max-width: 42px;
    }
</style>
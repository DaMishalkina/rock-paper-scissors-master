<script lang="ts">
    import ButtonWrapper from "./ButtonWrapper.svelte";
    export let
        role: string,
        imageUrl: string,
        // rgb
        shadowColor = "",
        linearGradient: string,
        isLarge = false,
        isButton = false,
        isActive = false;

    const shadowColorWithoutRGB = shadowColor.substring(4, shadowColor.length-1)
        .replace(/ /g, '');
</script>

{#if isButton}
    <ButtonWrapper
            className="role-chip"
            backgroundColor={linearGradient}
            shadowColor={shadowColor}
            on:click
    >
        <span class="role-chip__image-wrapper">
             <img
                     class="role-chip__icon"
                     src={imageUrl}
                     alt={role}
             />
        </span>
    </ButtonWrapper>
{:else}
    <div
            class="role-chip"
            class:role-chip--active={isActive}
            class:role-chip--large={isLarge}
            style="
            --background-color: {linearGradient};
            --shadow-color: {shadowColor};
            --shadow-color-without-rgb: {shadowColorWithoutRGB}"
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
        --shadow-color-without-rgb: inherit;
    }
    :global(.role-chip) {
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
    .role-chip--large {
        height: 133px;
        width: 133px;
        padding: 16px;
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
    .role-chip--large .role-chip__icon {
        max-height: 45px;
        max-width: 53px;
    }
    .role-chip--active {
        position: relative;
        box-shadow: 0 0 0 0 rgba(var(--shadow-color-without-rgb), 0.5);
        animation: pulse 1.5s infinite;
    }
    @media (min-width: 1200px) {
        :global(.role-chip) {
            width: 148px;
            height: 148px;
            padding: 18px;
        }
        .role-chip__icon {
            max-height: 52px;
            max-width: 57px;
        }
        .role-chip--large {
            width: 300px;
            height: 300px;
            border-radius: 300px;
            padding: 34px;
        }
        .role-chip--large .role-chip__image-wrapper {
            border-radius: 300px;
        }
        .role-chip--large .role-chip__icon {
            height: 120px;
            width: auto;
            max-height: 120px;
            max-width: 116px;
        }

    }
    @keyframes pulse {
        0% {
            transform: scale(0.9);
        }
        70% {
            transform: scale(1);
            z-index: -1;
            box-shadow: 0 0 0 80px rgba(var(--shadow-color-without-rgb), 0);
        }
        100% {
            transform: scale(0.9);
            box-shadow: 0 0 0 0 rgba(var(--shadow-color-without-rgb), 0);
        }
    }
</style>
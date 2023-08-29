<script lang="ts">
    export let role: string, imageUrl: string, shadowColor: string, linearGradient: string, isButton = false;
</script>

{#if isButton}
    <button
            class="role-chip"
            style="background: {linearGradient}; box-shadow: 0 4px 0 {shadowColor}"
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
            style="background: {linearGradient}; box-shadow: 0 4px 0 {shadowColor}"
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
    .role-chip {
        padding: 11px;
        border-radius: 100px;
        height: 97px;
        width: 97px;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
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
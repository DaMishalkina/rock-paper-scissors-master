<script lang="ts">
   export let backgroundColor = "", shadowColor = "", className = "";
</script>

<button
        class="button {className}"
        style="
        --background-color: {backgroundColor};
        --shadow-color: {shadowColor};"
        on:click>
    <slot/>
</button>

<style>
    :root {
        --background-color: inherit;
        --shadow-color: inherit;
    }
    button {
        position: relative;
    }
    button::after {
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
    button:hover {
        transform: translateY(-3px);
    }
    button:hover::after {
        transform: scaleX(1.4) scaleY(1.4);
        box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px, rgba(0, 0, 0, 0.12) 0 -12px 30px, rgba(0, 0, 0, 0.12) 0 4px 6px, rgba(0, 0, 0, 0.17) 0 12px 13px, rgba(0, 0, 0, 0.09) 0 -3px 5px;
        opacity: 0;
    }
    button:active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
</style>
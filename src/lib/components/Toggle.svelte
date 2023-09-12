<script lang="ts">
    import {createEventDispatcher} from "svelte";
    export let isToggled = false, label = "Toggle";
    const dispatch = createEventDispatcher<{toggle: boolean}>();
    const onToggle = () => {
        dispatch("toggle", !isToggled)
    }
</script>

<label class="toggle">
    {label}
    <input
            class="toggle__input"
            on:change|preventDefault={() => onToggle()}
            type="checkbox"
            bind:checked={isToggled}
    />
    <span class="toggle__slider"></span>
</label>



<style>
    :root {
        --toggle-width: 3.5em;
        --toggle-height: 2em;
        --toggle-diameter: 1.5em;
        --toggle-offset: calc((var(--toggle-height) - var(--toggle-diameter)) / 2);
        --toggle-shadow-offset: 10px;
        --toggle-wider: 3em;
        --toggle-bg: var(--bg--bottom);
        --toggle-bg--checked: linear-gradient(#46B9CE,#8954EA);

    }
    .toggle {
        position: relative;
        display: flex;
        align-items: center;
        gap: 1em;
    }
    .toggle__input {
        position: absolute;
        top: 0;
        right: 0;
        display: none;
    }
    .toggle__input:checked ~ .toggle__slider {
        background: var(--toggle-bg--checked);
    }
    .toggle__slider {
        cursor: pointer;
        display: inline-block;
        width: var(--toggle-width);
        height: var(--toggle-height);
        background: var(--toggle-bg);
        border-radius: calc(var(--toggle-height) / 2);
        position: relative;
        transition: 0.3s all ease-in-out;
        box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    }
    .toggle__input:checked ~ .toggle__slider::after {
        transform: translateX(calc(var(--toggle-width) - var(--toggle-diameter) - var(--toggle-offset)));
        box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
    }
    .toggle__slider::after {
        content: "";
        display: inline-block;
        width: var(--toggle-diameter);
        height: var(--toggle-diameter);
        background-color: #fff;
        border-radius: calc(var(--toggle-diameter) / 2);
        position: absolute;
        top: var(--toggle-offset);
        transform: translateX(var(--toggle-offset));
        box-shadow: var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
        transition: 0.3s all ease-in-out;
    }

</style>
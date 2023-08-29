<script lang="ts">
    import {clickOutside} from "$lib/utils/clickOutside";
    import CloseIcon from "$lib/components/svgs/CloseIcon.svelte";
    import { modal} from "../../stores/modal";
    const close = () => ($modal.open = false);
</script>
<div
        class="modal__wrapper"
>
    <div
            use:clickOutside={() => close()}
            class="modal__container"
    >
        <slot/>
        <button
                class="close-button modal__close-button"
                on:click|once={close}
        >
            <span class="visually-hidden-title">Close Rules</span>
            <CloseIcon />
        </button>
    </div>
</div>


<style>
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
    }
    .close-button {
        display: flex;
    }
    .close-button :global(svg) {
        width: 20px;
        height: 20px;
    }
    @media (min-width: 1024px) {
        .modal__container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform:  translate(-50%, -50%);
            width: fit-content;
            height: fit-content;
        }

    }

</style>
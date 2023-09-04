<script>
    import { computePosition,  flip, shift, offset } from "@floating-ui/dom";
    export let side = "top";
    let tooltipWrapper;
    let tooltipDropdown;
    const handleTooltipHover = () => {
        computePosition(tooltipWrapper, tooltipDropdown, {
            placement: side,
            middleware: [offset(6), flip(), shift({padding: 5})],
        }).then(({x, y}) => {
            Object.assign(tooltipDropdown.style, {
                left: `${x}px`,
                top: `${y}px`,
            });

        });
    }

</script>

<div
        class="tooltip__wrapper"
        bind:this={tooltipWrapper}
        role="tooltip"
        on:mouseenter={() => handleTooltipHover()}
>
    <div
            class="tooltip__dropdown"
            bind:this={tooltipDropdown}
    >
        <slot name="tooltip__content" />
    </div>
    <slot/>
</div>

<style>
    .tooltip__wrapper {
        position: relative;

    }

    .tooltip__dropdown {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        overflow: hidden;
        font-size: 12px;
        box-sizing:border-box;
        box-shadow:0 1px 8px rgba(0,0,0,0.5);
        padding: 6px 8px;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        border-radius: 4px;
        letter-spacing: 0.25em;
    }
    .tooltip__wrapper:hover .tooltip__dropdown {
        display: block;
    }

</style>
<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {gameMode} from "../../../stores/gameMode";
    import type {Role} from "../../consts/roles";
    import RoleChip from "$lib/components/RoleChip.svelte";
    import Tooltip from "$lib/components/Tooltip.svelte";

    export let roleName: string, roleValues: Role;

    const dispatch = createEventDispatcher<{chipClick: string}>();
    const handleChipClick = (role: string) => {
        dispatch("chipClick", role);
    }
</script>

<li
        class="role roles-list__item"
        class:role--advanced={$gameMode.advanced}
>
    <Tooltip>
        <RoleChip
                isLarge={!$gameMode.advanced}
                role={roleName}
                imageUrl={roleValues.imageUrl}
                shadowColor={roleValues.shadowColor}
                linearGradient={roleValues.linearGradient}
                isButton={true}
                on:click={() => handleChipClick(roleName)}
        />
        <span slot="tooltip__content">{roleName}</span>
    </Tooltip>
</li>


<style>
    .role {
        position: absolute;
        pointer-events: auto;
    }
    .role:nth-child(1){
        top: 0;
        left: 0;
    }
    .role:nth-child(2){
        top: 0;
        right: 0;
    }
    .role:nth-child(3){
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .role--advanced:nth-child(1) {
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .role--advanced:nth-child(2) {
        top: 50%;
        left: 0;
        transform: translate(0, -75%);
    }
    .role--advanced:nth-child(3) {
        top: 50%;
        right: 0;
        left: unset;
        transform: translate(0, -50%);
    }
    .role--advanced:nth-child(4) {
        bottom: 0;
        left: 0;
        transform: translate(50%, 0);
    }
    .role--advanced:nth-child(5) {
        bottom: 0;
        right: 0;
        transform: translate(-50%, 0);
    }
</style>
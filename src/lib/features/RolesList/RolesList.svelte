<script lang="ts">
    import {gameMode} from "../../../stores/gameMode";
    import type {Roles} from "../../consts/roles";
    import RolesListItem from "./RolesListItem.svelte";
    import { createEventDispatcher } from "svelte";


    export let roles: Roles;
    const dispatch = createEventDispatcher<{chipClick: string}>();
    const handleChipClick = (event: CustomEvent) => {
        dispatch("chipClick", event.detail)
    }
</script>

<ul class="roles-list" class:roles-list--advanced={$gameMode.advanced}>
    {#each Object.entries(roles) as [role, roleValues], i (i)}
       <RolesListItem
               roleName={role}
               roleValues={roleValues}
               on:chipClick={handleChipClick}
       />
    {/each}
</ul>


<style>
    .roles-list {
        background-image: url("../../assets/bg-triangle.svg");
        background-repeat: no-repeat;
        background-size: 180px 158px;
        background-position: center;
        height: 310px;
        width: 310px;
        position: relative;
        align-self: center;
    }
    .roles-list--advanced {
        background-image: url("../../assets/bg-pentagon.svg");
        background-size: 209px 215px;
        /*height: 310px;*/
        /*width: 310px;*/
    }
    @media (min-width: 1200px) {
        .roles-list {
            height: 470px;
            width: 470px;
        }
        .roles-list--advanced {
                /*height: 470px;*/
            background-size: 315px 322px;
        }
    }
</style>
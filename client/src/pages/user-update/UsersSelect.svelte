<script lang="ts">
    
    import { onMount, createEventDispatcher } from 'svelte';

    import type User from "../../shared/interfaces/user";
    import type ApiResponse from "../../shared/interfaces/api-response";
    import APIStatusCode from "../../shared/enums/api-status-code";
    import Identity from '../../shared/stores/identity';

    let selected: string;
    let response: ApiResponse<User[]>;
    let users: User[];
    const dispatch = createEventDispatcher(); 

    onMount(refresh);

    function onChange(event: Event) {
        dispatch('change', (event.target as HTMLSelectElement).value);
    }

    export async function refresh() {

        response = await Identity.getAllUsers();
        users = [...response?.data];

    };

    export let isDisabled: boolean;

</script>

{#if $Identity.isFetchingUsers} 
    <span class="inline-block w-full py-2 relative text-slate-600">
        Fetching users
        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block ml-1 h-5 w-5 animate-spin fill-slate-500" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M222.7 32.15C227.7 49.08 218.1 66.9 201.1 71.94C121.8 95.55 64 169.1 64 255.1C64 362 149.1 447.1 256 447.1C362 447.1 448 362 448 255.1C448 169.1 390.2 95.55 310.9 71.94C293.9 66.9 284.3 49.08 289.3 32.15C294.4 15.21 312.2 5.562 329.1 10.6C434.9 42.07 512 139.1 512 255.1C512 397.4 397.4 511.1 256 511.1C114.6 511.1 0 397.4 0 255.1C0 139.1 77.15 42.07 182.9 10.6C199.8 5.562 217.6 15.21 222.7 32.15V32.15z"/></svg>
    </span>
{:else}
    {#if response?.status === APIStatusCode.OK} 
        <select bind:value={selected}
            on:change="{onChange}"
            disabled="{isDisabled}"
            class="rounded w-full" 
            name="users">
            <option value="">Please select a user</option>
        {#each response.data as user}
            <option value="{user.email}">
                {user.email}
            </option>
        {/each}
        </select>
    {:else if response?.status === APIStatusCode.NOT_FOUND} 
        <span class="inline-block w-full text-red-600 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="h-4 w-4 mr-1 -mt-0.5 fill-red-600 inline-block"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
            There are no registered users
        </span>
    {:else if response?.status === APIStatusCode.GENERIC_ERROR}
        <span class="inline-block w-full text-red-600 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="h-4 w-4 mr-1 -mt-0.5 fill-red-600 inline-block"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
            The server is temporarily not available
        </span>
    {/if}
{/if}

<script>

    import { slide } from 'svelte/transition';

    import Authentication from '../stores/authentication';

    import LogoutButton from './LogoutButton.svelte';
    import LoggedUser from './LoggedUser.svelte';

    let menuIsOpen = false;
 
</script>

<nav class="bg-white/50 shadow-lg fixed w-full backdrop-blur-md z-30">

    <div class="max-w-6xl mx-auto p-4 flex flex-row">

        <a href="/app/home">
            <img
                src="/logonuvolaris.jpeg"
                alt="Logo"
                class="h-8 w-auto mr-2"
            />
        </a>
        
        <div class="ml-auto hidden sm:block">
            {#if $Authentication.token}
                <p class="inline pr-4">
                    <LoggedUser/>
                </p>
                <LogoutButton/>
            {/if}
        </div>

        <button on:click={() => { menuIsOpen = !menuIsOpen }}
            class="inline-block bg-white border-none align-middle ml-auto sm:hidden">
            {#if menuIsOpen}
            <svg xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 fill-slate-600 -mt-0.5" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
            {:else}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                class="h-6 w-6 fill-slate-600 -mt-0.5"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>
            {/if}
        </button>
        
    </div>
</nav>

{#if menuIsOpen}
<nav class="bg-white shadow-sm fixed right-4 left-4 z-20 top-16 pt-4
    px-5 pb-5 rounded-b-md sm:hidden text-right" transition:slide="{{ duration: 150 }}">
    {#if $Authentication.token}
        <p class="py-4">
            <LoggedUser/>
        </p>
        <LogoutButton/>
    {:else}
        <button href="app/home" class="bg-white border-blue-600 text-blue-600
            hover:bg-blue-500 hover:text-white active:bg-blue-600
            active:text-white text-sm disabled:bg-white-100
            disabled:border-slate-400 disabled:text-slate-400 rounded px-2 py-1">Sign in</button>
    {/if}
</nav>
{/if}


<script>

    import Home from "./pages/Home.svelte";
    import NavBar from "./shared/components/NavBar.svelte";

    export let page = Home;
    export let menu;
    export let title
    export let hideTitle = false
</script>

<NavBar {menu} {title}/>

{#if !hideTitle}
<div class="bg-gray-800 pt-3">
    <div
        class="rounded-tl-3xl rounded-tr-3xl bg-blue-900 p-4 shadow text-2xl text-white">
        <h3 class="font-bold pl-2">{title}Nuvolaris</h3>
    </div>
</div>
{/if}
<main class="pt-14">
    <svelte:component this={page} />
</main>


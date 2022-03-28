<script>
    
    import ActionsMenu from "./ActionsMenu.svelte"
    import LoginForm from '../shared/components/LoginForm.svelte';

    import Authentication from '../shared/stores/authentication';

</script>

<section class="p-8 max-w-md mx-auto">
    {#if $Authentication.token}
        <ActionsMenu />
    {:else}
        <LoginForm />
    {/if}
</section>




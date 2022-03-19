<script>
    
    import ActionsMenu from "./ActionsMenu.svelte"
    import LoginForm from '../components/LoginForm.svelte';
    import Namespace from './Namespace.svelte';

    import Authentication from '../shared/stores/authentication';

</script>

<section class="p-8 max-w-md mx-auto">
    {#if $Authentication.token}
        <ActionsMenu />
    {:else}
        <LoginForm />
    {/if}
</section>




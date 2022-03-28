<script lang="ts">

    import Authentication from '../../shared/stores/authentication';

</script>

<button on:click={Authentication.logout}
    class="bg-white border-blue-600 text-blue-600
        hover:bg-blue-500 hover:text-white active:bg-blue-600
        active:text-white text-sm disabled:bg-white-100
        disabled:border-slate-400 disabled:text-slate-400 rounded px-2 py-1">Sign out</button>
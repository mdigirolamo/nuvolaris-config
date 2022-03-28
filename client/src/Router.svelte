<script lang='ts'>

    import { onMount } from 'svelte';
    
    import router from 'page';

    import Authentication from './shared/stores/authentication';

    import Layout from './Layout.svelte';
    import Home from './pages/Home.svelte';
    import User from './pages/User.svelte';
    import UserDelete from './pages/UserDelete.svelte';
    import UserUpdate from './pages/user-update/UserUpdate.svelte';
    import Namespace from './pages/Namespace.svelte';
    import NamespaceDelete from './pages/NamespaceDelete.svelte';

    let page = Home;
    let title = 'Home';
    let hideTitle = true;
    let menu = [];

    router('/app/home', () => {
        [page, title, hideTitle] = [Home, 'Home', true];
    });
    router('/app/user', () => {
        [page, title, hideTitle] = [User, 'user', true];
    });
    router('/app/namespace', () => {
        [page, title, hideTitle] = [Namespace, 'namespace', true];
    });
    router('/app/userdelete', () => {
        [page, title, hideTitle] = [UserDelete, 'userdelete', true];
    });
    router('/app/userupdate', () => {
        [page, title, hideTitle] = [UserUpdate, 'userupdate', true];
    });
    router('/app/namespacedelete', () => {
        [page, title, hideTitle] = [NamespaceDelete, 'namespacedelete', true];
    });
    router('/', () => router.redirect('/app/home'));

    onMount(() => {
        router.start();
    });

    Authentication.subscribe((user) => {
        if (!user.token) {
            router.redirect('/app/home');
        }
    });

</script>

<Layout {page} {menu} {title} {hideTitle} />

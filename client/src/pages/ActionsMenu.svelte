<script>

    import Authentication from '../shared/stores/authentication';
    import UserRole from '../shared/enums/user-roles'

</script>

<h1 class="py-2 text-lg font-semibold border-b border-slate-200">Please choose an action.</h1>

<h2 class="py-2 text-slate-500 italic">User management.</h2>

<nav>
    <ul class="flex flex-col mt-4 drop-shadow-sm border border-slate-300 rounded-md overflow-hidden divide-y divide-slate-300 font-normal text-slate-600">
        {#if $Authentication.role == UserRole.ADMINISTRATOR}
            <li class="first:rounded-t-md">
                <a class="block bg-green-100 hover:bg-green-200 w-full p-4" href="/app/user">Add user</a>
            </li>
            <li>
                <a class="block bg-red-100 hover:bg-red-200 w-full p-4" href="/app/userdelete">Delete user and associated namespaces</a>
            </li>
        {/if}
        <li class="last:rounded-b-md only:rounded-md">
            <a class="block bg-orange-100 hover:bg-orange-200 w-full p-4" href="/app/userupdate">Update user</a>
        </li>
    </ul>

        <h2 class="py-4 border-slate-100 text-slate-500 italic">Namespace management.</h2>
        
    <ul class="flex flex-col mt-2 drop-shadow-sm border border-slate-300 rounded-md overflow-hidden divide-y divide-slate-300 font-normal text-slate-600">
        <li class="rounded-t-md">
            <a class="block bg-green-100 hover:bg-green-200 w-full p-4" href="/app/namespace">Add namespace</a>
        </li>
        <li class="rounded-b-md">
            <a class="block bg-red-100 hover:bg-red-200 w-full p-4" href="/app/namespacedelete">Delete namespace</a>
        </li>
    </ul>
</nav>




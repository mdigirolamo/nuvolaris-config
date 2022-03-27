<script>

    import Authentication from '../shared/stores/authentication';
    import UserRole from '../shared/enums/user-roles'

</script>

<h1 class="py-2 text-lg font-semibold border-b border-slate-200">Please choose an action</h1>

<h2 class="py-2 text-slate-500 italic">User management</h2>

<nav>
    <ul class="flex flex-col mt-4 drop-shadow-sm border border-slate-300 rounded-md overflow-hidden divide-y divide-slate-300 font-normal text-slate-600">
        {#if $Authentication.role == UserRole.ADMINISTRATOR}
            <li class="first:rounded-t-md">
                <a class="block bg-green-100 hover:bg-green-200 w-full p-4" href="/app/user">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-4 w-4 mr-1 -mt-1 fill-green-800 inline-block opacity-70"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z"/></svg>
                    Add user
                </a>
            </li>
            <li>
                <a class="block bg-red-100 hover:bg-red-200 w-full p-4" href="/app/userdelete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-4 w-4 mr-1 -mt-1 fill-red-800 inline-block opacity-70"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M284.9 320l-60.9-.0002c-88.36 0-160 71.63-160 159.1C63.1 497.7 78.33 512 95.1 512l448-.0039c.0137 0-.0137 0 0 0l-14.13-.0013L284.9 320zM630.8 469.1l-249.5-195.5c48.74-22.1 82.65-72.1 82.65-129.6c0-79.53-64.47-143.1-143.1-143.1c-69.64 0-127.3 49.57-140.6 115.3L38.81 5.109C34.41 1.672 29.19 0 24.03 0C16.91 0 9.845 3.156 5.127 9.187c-8.187 10.44-6.375 25.53 4.062 33.7L601.2 506.9c10.5 8.203 25.56 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z"/></svg>
                    Delete user and associated namespaces
                </a>
            </li>
        {/if}
        <li class="last:rounded-b-md only:rounded-md">
            <a class="block bg-orange-100 hover:bg-orange-200 w-full p-4" href="/app/userupdate">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-4 w-4 mr-1 -mt-1 fill-orange-800 inline-block opacity-70"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M223.1 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 223.1 256zM274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512h286.4c-1.246-5.531-1.43-11.31-.2832-17.04l14.28-71.41c1.943-9.723 6.676-18.56 13.68-25.56l45.72-45.72C363.3 322.4 321.2 304 274.7 304zM371.4 420.6c-2.514 2.512-4.227 5.715-4.924 9.203l-14.28 71.41c-1.258 6.289 4.293 11.84 10.59 10.59l71.42-14.29c3.482-.6992 6.682-2.406 9.195-4.922l125.3-125.3l-72.01-72.01L371.4 420.6zM629.5 255.7l-21.1-21.11c-14.06-14.06-36.85-14.06-50.91 0l-38.13 38.14l72.01 72.01l38.13-38.13C643.5 292.5 643.5 269.7 629.5 255.7z"/></svg>
                Update user
            </a>
        </li>
    </ul>

        <h2 class="py-4 border-slate-100 text-slate-500 italic">Namespace management</h2>
        
    <ul class="flex flex-col mt-2 drop-shadow-sm border border-slate-300 rounded-md overflow-hidden divide-y divide-slate-300 font-normal text-slate-600">
        <li class="rounded-t-md">
            <a class="block bg-green-100 hover:bg-green-200 w-full p-4" href="/app/namespace">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-4 w-4 mr-1 -mt-1 fill-green-800 inline-block opacity-70"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M464 96h-192l-64-64h-160C21.5 32 0 53.5 0 80v352C0 458.5 21.5 480 48 480h416c26.5 0 48-21.5 48-48v-288C512 117.5 490.5 96 464 96zM336 311.1h-56v56C279.1 381.3 269.3 392 256 392c-13.27 0-23.1-10.74-23.1-23.1V311.1H175.1C162.7 311.1 152 301.3 152 288c0-13.26 10.74-23.1 23.1-23.1h56V207.1C232 194.7 242.7 184 256 184s23.1 10.74 23.1 23.1V264h56C349.3 264 360 274.7 360 288S349.3 311.1 336 311.1z"/></svg>
                Add namespace
            </a>
        </li>
        <li class="rounded-b-md">
            <a class="block bg-red-100 hover:bg-red-200 w-full p-4" href="/app/namespacedelete">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-4 w-4 mr-1 -mt-1 fill-red-800 inline-block opacity-70"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M464 96h-192l-64-64h-160C21.5 32 0 53.5 0 80v352C0 458.5 21.5 480 48 480h416c26.5 0 48-21.5 48-48v-288C512 117.5 490.5 96 464 96zM336 311.1H175.1C162.7 311.1 152 301.3 152 288c0-13.26 10.74-23.1 23.1-23.1h160C349.3 264 360 274.7 360 288S349.3 311.1 336 311.1z"/></svg>
                Delete namespace
            </a>
        </li>
    </ul>
</nav>




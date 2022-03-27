<script lang='ts'>

    import { slide } from 'svelte/transition';

    import { validator } from '@felte/validator-yup';
    import { createForm } from 'felte';
    import * as yup from 'yup';

    import Authentication from '../../shared/stores/authentication';
 
    import APIStatusCode from '../../shared/enums/api-status-code';

    let statusCode: APIStatusCode;

    // TO DO: UI status should be updated depending on a specific
    // interceptor created at store level (e.g.: by employing Axios)
    let isBusy = false;

    const validationSchema = yup.object().shape({
        email: yup.string()
                  .required('Email is required.')
                  .email('A valid email address is required.'),
        password: yup.string()
                     .required('Password is required.')
    });

    const { form,
            errors,
            isValid } = createForm<yup.InferType<typeof validationSchema>>(
                { extend: validator({ schema: validationSchema }),
                  onSubmit(values, context) {

                    isBusy = true;
 
                    Authentication.login(values).then(
                        (response: APIStatusCode) => {
                            statusCode = response;
                        }
                    ).finally(() => {
                        isBusy = false;
                    });

                  }
                }
            );

</script>

<h1 class="py-2 text-lg font-semibold border-b border-slate-200">Welcome to Configurator: sign in.</h1>

<form use:form class="flex flex-col" novalidate>
    
    <label class="py-2" for="email">Email</label>

    <input class="rounded py-2"
           type="email"
           name="email"
    >

    {#if $errors.email}
        <small class="py-2 text-red-600" transition:slide="{{ duration: 250 }}">{$errors.email}</small>
    {/if}

    <label class="py-2" for="password">Password</label>

    <input class="rounded"
           type="password"
           name="password"
    >

    {#if $errors.password}
        <small class="py-2 text-red-600" transition:slide="{{ duration: 250 }}">{$errors.password}</small>
    {/if}

    {#if statusCode == APIStatusCode.NOT_FOUND}
        <small class="py-2 text-red-600" transition:slide="{{ duration: 250 }}">Your credentials appear to be wrong; please try again.</small>
    {/if}

    {#if statusCode == APIStatusCode.GENERIC_ERROR}
        <small class="py-2 text-red-600" transition:slide="{{ duration: 250 }}">The server is temporarily unavailable.</small>
    {/if}

    <button
        type="submit"
        disabled="{!$isValid || isBusy}"
        class="my-2 flex flex-row justify-center drop-shadow-sm py-2 px-8 bg-blue-600 hover:bg-blue-500 active:bg-blue-600 text-sm text-white md:text-base disabled:bg-slate-100 disabled:text-slate-400 rounded w-full">
        {#if isBusy}
            LOGGING IN
            <span class="h-5 w-5 block absolute top-1/2 -translate-y-1/2 right-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full animate-spin fill-slate-500" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M222.7 32.15C227.7 49.08 218.1 66.9 201.1 71.94C121.8 95.55 64 169.1 64 255.1C64 362 149.1 447.1 256 447.1C362 447.1 448 362 448 255.1C448 169.1 390.2 95.55 310.9 71.94C293.9 66.9 284.3 49.08 289.3 32.15C294.4 15.21 312.2 5.562 329.1 10.6C434.9 42.07 512 139.1 512 255.1C512 397.4 397.4 511.1 256 511.1C114.6 511.1 0 397.4 0 255.1C0 139.1 77.15 42.07 182.9 10.6C199.8 5.562 217.6 15.21 222.7 32.15V32.15z"/></svg>
            </span>
        {:else}LOGIN{/if}
    </button>   

</form>


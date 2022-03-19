<script lang='ts'>

    import { slide } from 'svelte/transition';

    import { validator } from '@felte/validator-yup';
    import { createForm } from 'felte';
    import * as yup from 'yup';

    import Authentication from '../shared/stores/authentication';
 
    import APIStatusCode from '../shared/enums/api-status-code';

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
            handleChange,
            handleSubmit,
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

<form use:form class="flex flex-col" on:submit={handleSubmit} novalidate>
    
    <label class="py-2" for="email">Email</label>

    <input on:change={handleChange}
        class="rounded py-2"
        type="email"
        name="email"
        placeholder="Enter your email address"
    >

    {#if $errors.email}
        <small class="py-2 text-red-600" transition:slide="{{ duration: 250 }}">{$errors.email}</small>
    {/if}

    <label class="py-2" for="password">Password</label>

    <input on:change={handleChange}
        class="rounded"
        type="password"
        name="password"
        placeholder="Enter your password"
    >

    {#if $errors.password}
        <small class="py-2 text-red-600" transition:slide="{{ duration: 250 }}">{$errors.password}</small>
    {/if}

    {#if statusCode == APIStatusCode.USER_NOT_FOUND}
        <small class="py-2 text-red-600">Your credentials appear to be wrong; please try again.</small>
    {/if}
    {#if statusCode == APIStatusCode.GENERIC_ERROR}
        <small class="py-2 text-red-600">The server is temporarily unavailable.</small>
    {/if}

    <button
        type="submit"
        disabled="{!$isValid || isBusy}"
        class="my-2 text-white drop-shadow-sm py-2 bg-blue-500 hover:bg-blue-600
            disabled:bg-slate-100 rounded">
        {#if isBusy}Logging in...{:else}LOGIN{/if}
    </button>   

</form>


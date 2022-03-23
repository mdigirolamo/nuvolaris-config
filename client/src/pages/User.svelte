<script lang='ts'>

  import { onMount } from "svelte";
  import { slide } from 'svelte/transition';

  import { post } from "../util";
  import APIStatusCode from '../shared/enums/api-status-code';
  import UserProfileForm from "../shared/components/UserProfileForm.svelte";

  let response;
  let apiStatusCode = null;

  /**
   * TO DO: in case of error (e.g.: user already exists) server APIs should send
   * an appropriate HTTP code (e.g.: 409) in order to allow the client-side
   * application to handle them in a standard way
   */
  async function onSubmit(formData){
    
    try {

      response = await post('/user', formData.detail);

      if (response?.error) {

        apiStatusCode = APIStatusCode.USER_ALREADY_EXISTS;

      } else {

        apiStatusCode = APIStatusCode.OK;

      }

    } catch (error) {

      apiStatusCode = APIStatusCode.GENERIC_ERROR;

    }

  }

</script>

<section class="p-8 max-w-lg mx-auto">

  <h1 class="py-2 text-slate-500 italic border-b border-slate-200">User management.</h1>

  <h2 class="py-2 text-lg font-semibold">Add a user.</h2>

  {#if apiStatusCode === APIStatusCode.OK}
    <p class="py-2 text-green-600" transition:slide="{{ duration: 250 }}">User has been successfully saved.</p>
  {/if}

  {#if apiStatusCode === APIStatusCode.USER_ALREADY_EXISTS}
    <p class="py-2 text-red-600" transition:slide="{{ duration: 250 }}">Can't create user: an account with same email already exists.</p>
  {/if}

  {#if apiStatusCode === APIStatusCode.GENERIC_ERROR}
    <p class="py-2 text-red-600" transition:slide="{{ duration: 250 }}">The server is temporarily unavailable.</p>
  {/if}

  <UserProfileForm on:form-data="{onSubmit}">
    <svelte:fragment slot="button-label">
      CREATE USER
    </svelte:fragment>
  </UserProfileForm>

</section>

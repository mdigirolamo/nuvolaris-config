<script lang='ts'>

  import { post } from '../util';
  import APIStatusCode from '../shared/enums/api-status-code';
  import UserProfileForm from '../shared/components/user-profile-form/UserProfileForm.svelte';
  import type UserProfile from '../shared/components/user-profile-form/user-profile';

  let response;
  let apiStatusCode;
  let isBusy;

  /**
   * TO DO: in case of error (e.g.: user already exists) server APIs should send
   * an appropriate HTTP code (e.g.: 409) in order to allow the client-side
   * application to handle them in a standard way
   */
  async function onFormData(formData: CustomEvent<UserProfile>) {
    
    try {

      isBusy = true;

      response = await post('/user', formData.detail);

      if (response?.error) {

        apiStatusCode = APIStatusCode.ALREADY_EXISTS;

      } else {

        apiStatusCode = APIStatusCode.OK;

      }

    } catch (error) {

      apiStatusCode = APIStatusCode.GENERIC_ERROR;

    } finally {

      isBusy = false;
      window.scroll({ top: 0, behavior: 'smooth' });

    }

  }

</script>

<section class="p-8 max-w-lg mx-auto">

  <h1 class="py-2 text-slate-500 italic border-b border-slate-200">User management</h1>

  <h2 class="py-2 text-lg font-semibold">Add a user</h2>
  
  {#if apiStatusCode === APIStatusCode.OK && !isBusy}
    <span class="inline-block text-green-600 pb-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-4 w-4 mr-1 -mt-0.5 fill-green-600 inline-block"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
      User has been successfully created
    </span>
  {:else if apiStatusCode === APIStatusCode.ALREADY_EXISTS && !isBusy}
    <span class="inline-block text-red-600 pb-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="h-4 w-4 mr-1 -mt-0.5 fill-red-600 inline-block"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
      Can't create user: an account with same email already exists
    </span>
  {:else if apiStatusCode === APIStatusCode.GENERIC_ERROR && !isBusy}
    <span class="inline-block text-red-600 pb-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="h-4 w-4 mr-1 -mt-0.5 fill-red-600 inline-block"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
      The server is temporarily unavailable
    </span>
  {/if}

  <UserProfileForm on:form-data="{onFormData}" {isBusy}>
    <svelte:fragment slot="submit-button-label">
      CREATE USER
    </svelte:fragment>
    <svelte:fragment slot="submit-button-label-busy">
      CREATING USER
    </svelte:fragment>
  </UserProfileForm>

</section>

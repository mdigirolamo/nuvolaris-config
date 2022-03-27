<script lang="ts">

  import { onMount } from "svelte";

  import { get, post, put } from "../../util";
  import Authentication from '../../shared/stores/authentication';
  import UserRole from '../../shared/enums/user-roles'
  import UsersSelect from "./UsersSelect.svelte";
  import UserProfileForm from "../../shared/components/user-profile-form/UserProfileForm.svelte";
  import type User from '../../shared/interfaces/user';
  import type ApiResponse from "../../shared/interfaces/api-response";
  import APIStatusCode from "../../shared/enums/api-status-code";

  let isDisabled: boolean = false;
  let isBusy: boolean = false;
  let user: User;
  let apiStatusCode: APIStatusCode;
  let response: ApiResponse<User>;
  let isAdmin: boolean = $Authentication.role === UserRole.ADMINISTRATOR;
  let form: UserProfileForm;

  async function onUserSelected(email: string) {

    try {

      isBusy = true;

      response = await get(`/user/${email}`);

      if (response?.error) {

        apiStatusCode = APIStatusCode.NOT_FOUND;

      } else {

        apiStatusCode = APIStatusCode.OK;
        user = response.data;
        form.setFields(user);

      }

    } catch (error) {

      console.log(error);

      apiStatusCode = APIStatusCode.GENERIC_ERROR;

    } finally {

      isBusy = false;
      window.scroll({ top: 0, behavior: 'smooth' });

    }

  }

  function updateUser(user: User) {
    


  }

  onMount(() => {

    console.log(form);

    if (!isAdmin) {
      onUserSelected($Authentication.email);
    }

  });

</script>

<section class="p-8 max-w-lg mx-auto">

  <h1 class="py-2 text-slate-500 italic border-b border-slate-200">User management</h1>

  <h2 class="py-2 text-lg font-semibold">Update user</h2>

  {#if isAdmin}
    <div class="pt-4 pb-2">
      <UsersSelect on:on-change="{(event) => { onUserSelected(event.detail); }}" {isDisabled}/>
    </div>
  {/if}

  <UserProfileForm bind:this={form} {isBusy}/>

</section>

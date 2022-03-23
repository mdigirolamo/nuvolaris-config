<script lang='ts'>

    import { onMount } from "svelte";
    import { slide } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
  
    import { validator } from '@felte/validator-yup';
    import { createForm } from 'felte';
    import * as yup from 'yup';
  
    import UserRole from '../../shared/enums/user-roles';

    let roles = [UserRole.ADMINISTRATOR, UserRole.USER];

    const dispatch = createEventDispatcher();
  
    onMount(()=>{});
  
      // TO DO: UI status should be updated depending on a specific
      // interceptor created at store level (e.g.: by employing Axios)
      let isBusy = false;
      
      /**
       * Async validation is employed in cases where validators order matters:
       * https://github.com/jquense/yup/issues/851#issuecomment-931295671
      */
      const validationSchema = yup.object().shape({
          role: yup.string()
                   .required('Role is required'),
          email: yup.string()
                    .required('Email address is required')
                    .email('A valid email address is required'),
          password: yup.string().test(async(value, context) => {
            try {
              await yup.string()
                       .required('Password is required')
                       .min(5, 'Password should be minimum five characters long')
                       .max(20, 'Password can be maximum twenty characters long')
                       .test('passwordMatch', 'Passwords must match', function(password) {
                          return context.parent.confirmPassword === password;
                        })
                       .validate(value);
            } catch({message}) {
              return context.createError({message});
            }
            return true;
          }),
          namespace: yup.string().test(async(value, context)=>{
            try {
              await yup.string()
                       .required('A namespace is required')
                       .matches(/^[a-zA-Z-]+$/, { message: 'Namespace can only contain letters and minuses; e.g.: my-namespace', excludeEmptyString: true } )
                       .min(5, 'Namespace should be minimum five characters long')
                       .max(20, 'Namespace can be maximum twenty characters long')
                       .validate(value);
            } catch ({message}) {
              return context.createError({message});
            }
            return true;
          }),
          name: yup.string()
                   .optional()
                   .max(20, 'Name can be maximum twenty characters long'),
          surname: yup.string()
                      .optional()
                      .max(20, 'Surname can be maximum twenty characters long'),
          address: yup.string()
                      .optional()
                      .max(20, 'Address can be maximum fourty characters long'),
          phone: yup.string().test(async (value, context) => {
            try {
              await yup.string()
                       .optional()
                       .matches(/^[0-9]+$/, { message: 'Phone number can only contain digits', excludeEmptyString: true })
                       .test(
                         'minimum-length',
                         'Phone should be minimum six digits long',
                         (phone) => { return phone? phone.length >= 6 : true; }
                       )
                       .max(20, 'Phone can be maximum twenty digits long')
                       .validate(value)
            } catch ({message}) {
              return context.createError({message});
            }
            return true;
          })
                     
      });
  
      const { form,
              errors,
              isValid } = createForm<yup.InferType<typeof validationSchema>>(
                  { extend: validator({ schema: validationSchema }),
                    onSubmit(values, context) {
                        dispatch('form-data', values);
                    }
                  }
              );
  
  </script>
  
  <form use:form class="mt-8" novalidate>

    <div class="grid grid-cols-2 gap-4">

      <div class="col-span-2">

          <label for="role" class="small mb-1">Role</label>

          <select
            class="rounded w-full"
            class:border-red-500="{$errors.role}"
            name="role"
            value="{UserRole.USER}"
          >
            {#each roles as role}
              <option value={role}>
                {role}
              </option>
            {/each}

          </select>

        </div>

        {#if $errors.role}
        <div class="col-span-2 -mt-2 lowercase first-letter:capitalize" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{$errors.role}</small>
        </div>
        {/if}

        <div class="col-span-2">
          <label for="exampleEmail" class="small mb-1">Email*</label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.email}"
            type="email"
            name="email"
            placeholder="Insert email"
          />
        </div>

        {#if $errors.email}
        <div class="col-span-2 -mt-2 lowercase first-letter:capitalize" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{$errors.email}</small>
        </div>
        {/if}
      
        <div class="col-span-2 sm:col-span-1">
          <label for="password" class="small mb-1">Password*</label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.password || $errors.passwordMatch}"
            type="password"
            name="password"
            placeholder="Inserisci password"
          />
        </div>

        <div class="col-span-2 sm:col-span-1">
          <label for="confirmPassword" class="small mb-1">
            Confirm password*
          </label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.password || $errors.passwordMatch}"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
          />
        </div>

        {#if $errors.password || $errors.passwordMatch}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{[$errors.password, $errors.passwordMatch].filter((value) => value).join('; ')}</small>
          </div>
        {/if}

        <div class="col-span-2">
          <label for="namespace" class="small mb-1">Namespace*</label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.namespace}"
            type="text"
            name="namespace"
            placeholder="Insert namespace"
          />
        </div>

        {#if $errors.namespace}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{$errors.namespace}</small>
          </div>
        {/if}

        <div class="col-span-2 sm:col-span-1">
          <label for="name" class="small mb-1">Name</label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.name}"
            type="text"
            name="name"
            placeholder="Insert name"
          />
        </div>

        <div class="col-span-2 sm:col-span-1">
          <label for="surname" class="small mb-1">Surname</label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.surname}"
            type="text"
            name="surname"
            placeholder="Insert surname"
          />
        </div>

        {#if $errors.name || $errors.surname}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{[$errors.name, $errors.surname].filter((value) => value).join('; ')}</small>
          </div>
        {/if}

        <div class="col-span-2 sm:col-span-1">
            <label for="address" class="small mb-1">Address</label>
            <input
              class="rounded w-full"
              class:border-red-500="{$errors.address}"
              type="text"
              name="address"
              placeholder="Insert address"
            />
        </div>

        <div class="col-span-2 sm:col-span-1">
            <label for="phone" class="small mb-1">Phone</label>
            <input
              class="rounded w-full"
              class:border-red-500="{$errors.phone}"
              type="text"
              name="phone"
              placeholder="Phone number"
            />
        </div>

        {#if $errors.address || $errors.phone}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{[$errors.address, $errors.phone].filter((value) => value).join('; ')}</small>
          </div>
        {/if}
      
        <div class="col-span-2">
          <button  disabled="{!$isValid}" class="my-2 text-white drop-shadow-sm py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-400 rounded w-full">
            <slot name="button-label">SAVE USER</slot>
          </button>
        </div>

      </div>

  </form>
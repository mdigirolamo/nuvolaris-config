<script lang='ts'>

    import { slide } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
  
    import { validator } from '@felte/validator-yup';
    import { createForm } from 'felte';
    import * as yup from 'yup';
  
    import UserRole from '../../../shared/enums/user-roles';

    let roles = [UserRole.ADMINISTRATOR, UserRole.USER];

    const dispatch = createEventDispatcher();
      
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
                      .validate(value);
          } catch({message}) {
            return context.createError({message});
          }
          return true;
        }),
        confirmPassword: yup.string().test(async(value, context) => {
          try {
            await yup.string()
                      .required('Password confirmation is required')
                      .test('passwordMatch', 'Passwords must match', function(confirmPassword) {
                        return context.parent.password === confirmPassword;
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
                    .max(40, 'Address can be maximum fourty characters long'),
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

    const formWithValidation = createForm<yup.InferType<typeof validationSchema>>(
                { extend: validator({ schema: validationSchema }),
                  onSubmit(values) {
                      dispatch('form-data', values);
                  }
                }
            );

    const { form,
            errors,
            isValid } = formWithValidation;

    export const { reset, data, setFields } = formWithValidation;
    
    // TO DO: UI status should be updated depending on a specific
    // interceptor created at store level (e.g.: by employing Axios)
    export let isBusy: boolean;
  
  </script>
  
  <form use:form novalidate>

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
          <label for="exampleEmail" class="small mb-1">Email</label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.email}"
            type="email"
            name="email"
          />
        </div>

        {#if $errors.email}
        <div class="col-span-2 -mt-2 lowercase first-letter:capitalize" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{$errors.email}</small>
        </div>
        {/if}
      
        <div class="col-span-2 sm:col-span-1">
          <label for="password" class="small mb-1">Password</label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.password || $errors.confirmPassword}"
            type="password"
            name="password"
          />
        </div>

        {#if $errors.password}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize md:hidden" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{$errors.password}</small>
          </div>
        {/if}

        <div class="col-span-2 sm:col-span-1">
          <label for="confirmPassword" class="small mb-1">
            Confirm password
          </label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.password || $errors.confirmPassword}"
            type="password"
            name="confirmPassword"
          />
        </div>

        {#if $errors.confirmPassword}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize block md:hidden" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{$errors.confirmPassword}</small>
          </div>
        {/if}

        {#if $errors.password || $errors.confirmPassword}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize hidden md:block" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{[$errors.password, $errors.confirmPassword].filter((value) => value).join('; ')}</small>
          </div>
        {/if}

        <div class="col-span-2">
          <label for="namespace" class="small mb-1">Namespace</label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.namespace}"
            type="text"
            name="namespace"
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
          />
        </div>

        {#if $errors.name}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize block md:hidden" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{$errors.name}</small>
          </div>
        {/if}

        <div class="col-span-2 sm:col-span-1">
          <label for="surname" class="small mb-1">Surname</label>
          <input
            class="rounded w-full"
            class:border-red-500="{$errors.surname}"
            type="text"
            name="surname"
          />
        </div>

        {#if $errors.surname}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize block md:hidden" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{$errors.surname}</small>
          </div>
        {/if}

        {#if $errors.name || $errors.surname}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize hidden md:block" transition:slide="{{ duration: 250 }}">
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
            />
        </div>

        {#if $errors.address}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize block md:hidden" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{$errors.address}</small>
          </div>
        {/if}

        <div class="col-span-2 sm:col-span-1">
            <label for="phone" class="small mb-1">Phone</label>
            <input
              class="rounded w-full"
              class:border-red-500="{$errors.phone}"
              type="text"
              name="phone"
            />
        </div>

        {#if $errors.phone}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize block md:hidden" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{$errors.phone}</small>
          </div>
        {/if}

        {#if $errors.address || $errors.phone}
          <div class="col-span-2 -mt-2 lowercase first-letter:capitalize hidden md:block" transition:slide="{{ duration: 250 }}">
            <small class="py-2 text-red-600">{[$errors.address, $errors.phone].filter((value) => value).join('; ')}</small>
          </div>
        {/if}
      
        <div class="col-span-2">
          <button  disabled="{!$isValid || isBusy}" class="my-2 flex flex-row justify-center drop-shadow-sm py-2 px-8 bg-blue-600 hover:bg-blue-500 active:bg-blue-600 text-sm text-white md:text-base disabled:bg-slate-100 disabled:text-slate-400 rounded w-full">
            {#if !isBusy}
              <slot name="submit-button-label">SAVE USER</slot>
            {:else}
              <slot name="submit-button-label-busy">...SAVING USER</slot>
              <span class="h-5 w-5 block absolute top-1/2 -translate-y-1/2 right-2">
                <slot name="submit-button-spinner"></slot>
              </span>
            {/if}
          </button>
        </div>

      </div>

  </form>
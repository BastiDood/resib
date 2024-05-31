<script>
    let keys = ['userID', 'firstName', 'middleName', 'lastName', 'purchaseDate', 'address', 'sex', 'bloodType', 'nationality', 'weight', 'height', 'phoneNumber', 'email'];

    import { enhance } from '$app/forms';
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    /** @type {import('./$types').PageData} */

    let formLoading = false;
</script>

<div class="flex items-center justify-center p-[80px] bg-gradient-to-r from-slate-600 to-slate-800">
    <h1 class="h1 text-center font-bold drop-shadow">
        <span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
            Issue Warranty
        </span>
    </h1>
</div>

{#if formLoading}
	<div class="h-screen flex flex-col items-center justify-center">
		<ProgressRadial />
		<span class="p-5">
			Loading...
		</span>
	</div>
{:else}
	<div class="p-4">
		<button type="button" class="btn variant-filled">
			<span>
				<a href="/" class="hover:underline">Go Back</a>
			</span>
		</button>
	</div>

	<div class="flex justify-center">
		<form method="POST" action="" class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 w-full md:w-4/5 lg:w-3/5 card p-4 mb-4 bg-[#E5E5E5]" 
		use:enhance={() => {
			formLoading = true;
			return async ({ update }) => {
				formLoading = false;
				// doneAPL.set(true);
				update();
				window.history.back();
			};
		}} 
		>
			{#each keys as key}
                <label>
                    {#if key == "purchaseDate"}
                        <span>Purchase Date</span>
                        <input name={key} class="input variant-form-material" type="date" required>
                    {:else if key == "sex"}
                        <span>Sex</span>
                        <select name={key} class="select variant-form-material" required>
                            <option value = 'sel' disabled selected>Select Sex</option>
                            <option value = 'M'>Male</option>
                            <option value = 'F'>Female</option>
                        </select>
                    {:else if key == "bloodType"}
                        <span>Blood Type</span>
                        <select name={key} class="select variant-form-material" required>
                            <option value = 'sel' disabled selected>Select Blood Type</option>
                            <option value = 'O-'>O-</option>
                            <option value = 'O+'>O+</option>
                            <option value = 'A-'>A-</option>
                            <option value = 'A+'>A+</option>
                            <option value = 'B-'>B-</option>
                            <option value = 'B+'>B+</option>
                            <option value = 'AB-'>AB-</option>
                            <option value = 'AB+'>AB+</option>
                        </select>
                    {:else if key == "weight"}
                        <span>Weight (kg)</span>
                        <div class="input-group input-group-divider grid-cols-[1fr_auto] variant-form-material">
                            <input name={key} type="number"  placeholder="Enter weight" required/>
                            <div class="input-group-shim">kg</div>
                        </div>
                    {:else if key == "height"}
                        <span>Height (cm)</span>
                        <div class="input-group input-group-divider grid-cols-[1fr_auto] variant-form-material">
                            <input name={key} type="number" placeholder="Enter height" required/>
                            <div class="input-group-shim">cm</div>
                        </div>
                    {:else if key == "phoneNumber"}
                        <span>Mobile Number</span>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] variant-form-material">
                            <div class="input-group-shim">+63</div>
                            <input name={key} type="tel" placeholder="1234567890" required/>
                        </div>
                    {:else if key == "email"}
                        <span>Email Address</span>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] variant-form-material">
                            <div class="input-group-shim">@</div>
                            <input name={key} type="email" placeholder="email@example.com" required/>
                        </div>
                    {:else}
                        <span>{key}</span> 
                        <input name={key} class="input variant-form-material" type="text" required>
                    {/if}
                </label>
			{/each}
			<div class="col-span-1 md:col-span-2 flex justify-center">
				<input type="submit" class="btn variant-filled bg-[#374FE7] text-white mt-5" value="Submit APL"/>
			</div>
		</form>
	</div>
{/if}
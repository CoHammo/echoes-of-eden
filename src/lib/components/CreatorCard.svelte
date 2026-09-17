<script lang="ts">
	import spotify from '$lib/assets/spotify.svg';

	let { pic, name, desc, featured }: { pic: string; name: string; desc: string; featured: URL[] } =
		$props();
	let expanded = $state(false);
	let image: HTMLImageElement | undefined = $state();
	let dialog: HTMLDialogElement | undefined = $state();
	let closeButton: HTMLButtonElement | undefined = $state();

	function setDialogStart() {
		if (image !== undefined && dialog !== undefined) {
			const imgRect = image.getBoundingClientRect();
			const imgX = imgRect.left + imgRect.width / 2;
			const imgY = imgRect.top + imgRect.height / 2;
			const centerX = document.documentElement.clientWidth / 2;
			const centerY = document.documentElement.clientHeight / 2;
			dialog.style.setProperty('--width', `${imgRect.width}px`);
			dialog.style.setProperty('--height', `${imgRect.height}px`);
			dialog.style.setProperty('--delta-x', `${imgX - centerX}px`);
			dialog.style.setProperty('--delta-y', `${imgY - centerY}px`);
		}
	}

	function closeDialog() {
		closeButton!.style.zIndex = '0';
		setDialogStart();
		expanded = false;
		setTimeout(() => {
			dialog?.close();
		}, 350);
	}
</script>

<div class="flex flex-col items-center rounded-lg">
	<button
		onclick={() => {
			setDialogStart();
			dialog?.showModal();
			expanded = true;
			closeButton!.style.zIndex = '1';
		}}
		class="rounded-lg hover:cursor-pointer"
	>
		<img
			bind:this={image}
			src={pic}
			alt="An Echoes of Eden Creative Partner"
			class="w-88 rounded-lg"
		/>
		<h3 class="mt-2 text-center font-lexend text-[1.35rem]">{name}</h3>
	</button>

	<dialog
		class:expanded
		bind:this={dialog}
		oncancel={(event) => {
			event.preventDefault();
			closeDialog();
		}}
		onclick={(event) => {
			if (event.target === dialog) {
				closeDialog();
			}
		}}
	>
		<div class="dialog-container">
			<button
				bind:this={closeButton}
				onclick={() => {
					closeDialog();
				}}
				class="close-button">X</button
			>
			<div class="carousel min-h-fit">
				<img src={pic} alt="An Echoes of Eden Creative Partner" class="w-88 rounded-lg" />
			</div>
			<div class="content-grid-container">
				<div class="content-container">
					<h2 class="mt-2 mb-2 font-lexend text-[1.6rem]">{name}</h2>
					<p class="mb-4 max-w-reading text-lg">
						{desc}
					</p>
					{#if featured.length > 0}
						<div class="flex flex-wrap items-center justify-center gap-3">
							{#each featured as link (link.pathname)}
								<a
									rel="external"
									target="_blank"
									href={link.href}
									class="flex flex-row items-center justify-center gap-2.5 rounded bg-zinc-800 px-3 py-2 text-lg text-gray-100"
								>
									<img src={spotify} alt="Spotify Logo" class="h-8 w-8" />
									Beautiful Reminder
								</a>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</dialog>
</div>

<style lang="postcss">
	@reference '../../routes/layout.css';

	dialog {
		@apply place-self-center rounded-lg shadow;
		transform: translate(var(--delta-x), var(--delta-y));
		max-height: 90dvh;
		transition-duration: 400ms;
		transition: transform 0.35s ease-in-out;

		.dialog-container {
			@apply flex scrollbar-none flex-col items-center justify-center overflow-hidden overflow-y-auto bg-mountain2;
			width: var(--width);
			transition: all 0.35s ease-in-out;

			.close-button {
				@apply btn absolute top-2 right-2 btn-circle border-none bg-black/20 hover:bg-black/30;
			}

			.carousel {
			}

			.content-grid-container {
				transition: all 0.35s ease-in-out;
				display: grid;
				grid-template-rows: 0fr;

				.content-container {
					@apply flex flex-col items-center justify-center overflow-hidden text-center;
					transition: all 0.35s ease-in-out;
					transform: scale(0);
				}
			}
		}

		::backdrop {
			background-color: rgba(0, 0, 0, 0);
			@apply transition-all;
		}
	}

	dialog.expanded {
		transform: translate(0, 0);

		.dialog-container {
			width: 90dvw;
			@apply scrollbar-auto p-4;

			.carousel {
			}

			.content-grid-container {
				grid-template-rows: 1fr;

				.content-container {
					transform: scale(1);
				}
			}
		}

		::backdrop {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}
</style>

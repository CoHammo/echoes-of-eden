<script lang="ts">
	import spotify from '$lib/assets/spotify.svg';

	let { pic, name, desc, featured }: { pic: string; name: string; desc: string; featured: URL[] } =
		$props();
	let expanded = $state(false);
	let image: HTMLImageElement | undefined = $state();
	let dialog: HTMLDialogElement | undefined = $state();
	let closeButton: HTMLButtonElement | undefined = $state();

	function getDialogStart() {
		if (image !== undefined && dialog !== undefined) {
			const imgRect = image.getBoundingClientRect();
			const imgX = imgRect.left + imgRect.width / 2;
			const imgY = imgRect.top + imgRect.height / 2;
			const centerX = document.documentElement.clientWidth / 2;
			const centerY = document.documentElement.clientHeight / 2;
			dialog.style.setProperty('--width', `${imgRect.width}px`);
			dialog.style.setProperty('--delta-x', `${imgX - centerX}px`);
			dialog.style.setProperty('--delta-y', `${imgY - centerY}px`);
		}
	}

	function closeDialog() {
		closeButton!.style.zIndex = '0';
		document.startViewTransition(() => {
			getDialogStart();
			expanded = false;
		});
		setTimeout(() => {
			dialog?.close();
		}, 350);
	}
</script>

<div class="flex flex-col items-center rounded-lg">
	<button
		onclick={() => {
			getDialogStart();
			dialog?.showModal();
			document.startViewTransition(() => {
				expanded = true;
			});
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
			<!-- <div class="expanded-container">
				<div class="overflow-hidden">
					<h2 class="mt-2 mb-2 font-lexend text-[1.6rem]">{name}</h2>
					<p class="max-w-reading text-lg">{desc}</p>
				</div>
			</div> -->
			<!-- <div class="expanded-container">
				<div class="overflow-hidden">
					<div class="flex w-full flex-col pb-4 text-center">
						<h2 class="mt-2 mb-2 font-lexend text-[1.6rem]">{name}</h2>
						<p class="max-w-reading text-lg">{desc}</p>
					</div>
				</div>
			</div> -->
		</div>
	</dialog>
</div>

<style lang="postcss">
	@reference '../../routes/layout.css';

	dialog {
		@apply place-self-center rounded-lg shadow;
		transform: translate(var(--delta-x), var(--delta-y));
		view-transition-name: match-element;
		max-height: 90dvh;

		.dialog-container {
			@apply relative flex scrollbar-none flex-col items-center justify-center overflow-y-auto bg-mountain2;
			width: var(--width);

			.close-button {
				@apply btn absolute top-2 right-2 btn-circle border-none bg-black/20 hover:bg-black/30;
				view-transition-name: match-element;
			}

			.carousel {
				view-transition-name: match-element;
			}

			.content-container {
				@apply hidden flex-col items-center justify-center text-center;
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

			.content-container {
				@apply flex;
			}
		}

		::backdrop {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}

	::view-transition-group(*) {
		animation-duration: 0.35s;
	}
	::view-transition-old(*),
	::view-transition-new(*) {
		height: 100%;
	}

	/*dialog {
		.dialog-container {
			@apply flex w-88 flex-col items-center justify-center bg-mountain2 p-0 shadow transition-all duration-1000;
			.expanded-container {
				@apply grid transition-all duration-900;
				grid-template-rows: 0fr;
			}
		}
		@apply place-self-center overflow-hidden rounded;
		transform: translate(var(--delta-x), var(--delta-y));
		transition:
			transform 1s ease,
			overlay 1s ease allow-discrete,
			display 1s ease allow-discrete;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0);
		transition:
			background-color 1s ease,
			overlay 1s ease allow-discrete,
			display 1s ease allow-discrete;
	}

	dialog[open] {
		.dialog-container {
			width: 90dvw;
			@apply px-4 pt-4;
			.expanded-container {
				grid-template-rows: 1fr;
			}
		}
		transform: translate(0, 0);
	}

	dialog[open]::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}

	@starting-style {
		dialog[open] {
			.dialog-container {
				@apply flex w-88 flex-col items-center justify-center bg-mountain2 p-0 transition-all duration-1000;
				.expanded-container {
					grid-template-rows: 0fr;
				}
			}
			transform: translate(var(--delta-x), var(--delta-y));
		}

		dialog[open]::backdrop {
			background-color: rgba(0, 0, 0, 0);
		}
	}*/
</style>

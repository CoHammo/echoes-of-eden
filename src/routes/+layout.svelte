<script lang="ts">
	// import type { Pathname } from '$app/types';
	import { beforeNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import menu from '$lib/assets/basil--menu-outline.svg';
	import close from '$lib/assets/basil--cross-solid.svg';
	// import { page } from '$app/state';
	// import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import flower from '$lib/assets/eoe_flower.png';
	import { slide } from 'svelte/transition';

	let { children } = $props();
	let opened = $state(false);

	beforeNavigate((nav) => {
		if (nav.from?.route.id !== nav.to?.route.id) {
			opened = false;
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Echoes of Eden</title>
</svelte:head>

<header class="relative flex h-28 items-center bg-mountain2 py-3 text-black">
	<nav class="relative flex h-fit w-full flex-row items-center px-8 max-[550px]:hidden">
		<a href={resolve('/')} class="absolute z-1 w-20 overflow-hidden rounded-lg"
			><img src={flower} alt="A white flower" /></a
		>
		<div
			class="flex w-full justify-center gap-6 font-signika text-[1.5rem] max-[800px]:justify-end"
		>
			<a href={resolve('/about')}>About</a>
			<a href={resolve('/creators')}>Creators</a>
			<a href={resolve('/works')}>Works</a>
			<a href={resolve('/articles')}>Articles</a>
		</div>
	</nav>
	<nav class="relative flex w-full flex-row items-center justify-end px-4 min-[550px]:hidden">
		<div class="flex w-full justify-center">
			<a href={resolve('/')} class="w-20 justify-center overflow-hidden rounded-lg"
				><img src={flower} alt="A white flower" /></a
			>
		</div>
		<button
			onclick={() => (opened = !opened)}
			class="btn absolute z-1 w-11 rounded-lg border-none p-0 hover:bg-black/20"
			><img src={menu} alt="Menu Icon" /></button
		>
	</nav>
</header>

{#if opened}
	<div
		transition:slide={{ axis: 'x' }}
		class="absolute top-0 right-0 z-2 flex w-50 flex-col gap-4 rounded-lg bg-mountain2 p-4 text-center font-signika text-2xl shadow"
	>
		<div class="mt-5 flex flex-row justify-end">
			<button
				onclick={() => (opened = !opened)}
				class="btn w-12 rounded-lg border-none p-0 hover:bg-black/20"
				><img src={close} alt="Close Menu Icon" /></button
			>
		</div>
		<a href={resolve('/about')}>About</a>
		<a href={resolve('/creators')}>Creators</a>
		<a href={resolve('/works')}>Works</a>
		<a href={resolve('/articles')}>Articles</a>
	</div>
{/if}

<main class="z-2 flex min-h-[33.6rem] w-full flex-col overflow-hidden">
	{@render children()}
</main>

<footer
	class="flex h-25 items-center justify-center bg-zinc-900 p-4 font-lexend text-lg text-gray-200"
>
	<p class="mr-3">© 2026 Collin Hammond</p>
	<a rel="external" aria-label="GitHub icon" href="https://github.com/CoHammo" target="_blank">
		<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
			<path d="M0 0h24v24H0z" fill="none" />
			<path
				fill="currentColor"
				d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
			/>
		</svg>
	</a>
</footer>

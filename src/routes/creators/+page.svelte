<script>
	import { CreatorCard } from '$lib';
	import hjr from '$lib/assets/hope-jr.avif';

	const people = [
		{
			pic: hjr,
			name: 'Keepers of the Garden',
			desc: 'Hope and J.R. Street, co-founders of Echoes of Eden, started this band when they got married in 2026. They make fun and genuine songs inspired by their faith in God. The first song they released together is called Beautiful Reminder, which J.R. wrote and sang for Hope when he proposed to her. Give it a listen on Spotify!',
			featured: [new URL('https://open.spotify.com/track/1CUrG8zz2pBlTX46WXzkP6')]
		}
	];
</script>

<div class="m-6">
	<div class="flex w-full flex-col items-center text-center">
		<h1 class="mt-2 mb-4 font-lexend text-4xl font-bold">Creators</h1>
		<p class="max-w-reading font-pt text-xl">
			These are creators (musicians, artists, authors, etc.) who partner with Echoes of Eden to
			share what they've made. Click on someone to see more about them and to explore their work!
		</p>
	</div>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-4 p-2">
		{#each people as person (person.name)}
			<CreatorCard
				name={person.name}
				pic={person.pic}
				desc={person.desc}
				featured={person.featured}
			/>
		{/each}
		<!-- <CreatorCard
		name="Keepers of the Garden"
		pic={hjr}
		desc="Hope and J.R. Street, co-founders of Echoes of Eden, make up this band with fun and genuine songs."
	/>
	<CreatorCard
		name="Keepers of the Garden"
		pic={hjr}
		desc="Hope and J.R. Street, co-founders of Echoes of Eden, make up this band with fun and genuine songs."
	/> -->
	</div>
</div>

<style>
	/*
	::view-transition-group(expanding-card) {
		animation-duration: 0.3s;
		animation-timing-function: unset;
		 Custom cubic-bezier creates an elastic "pop" or spring effect
		animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
	}*/
</style>

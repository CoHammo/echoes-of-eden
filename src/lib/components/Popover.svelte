<script lang="ts">
	let { id }: { id: string } = $props();

	let pop: HTMLDivElement | undefined = $state();
</script>

<div bind:this={pop} {id} popover class="absolute rounded-lg bg-mountain2 p-2">Hello there</div>

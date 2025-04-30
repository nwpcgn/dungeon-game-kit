<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	import { game } from '$lib/game2.svelte.ts'
</script>

<section class="page nwp">
	<div class="flex min-h-full flex-col justify-between">
		<div class="flex justify-center text-2xl">@ vs M</div>
		<div class="mt-4 border p-2">
			{#each game.battleLog as log}
				<p>> {log}</p>
			{/each}
		</div>
		<div class="mt-4 text-center">
			<button
				class="mx-2 border p-1"
				onclick={() => game.battleLog.push('You attack!')}>Fight</button>
			<button class="mx-2 border p-1">Item</button>
			<button class="mx-2 border p-1">Run</button>
		</div>
	</div>
</section>

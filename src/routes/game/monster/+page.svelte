<script lang="ts">
	import type { PageData } from './$types'
	let { data }: { data: PageData } = $props()
	import { game } from '$lib/game2.svelte.ts'
</script>

<section class="page-layer nwp">
	<article class="content">
		<div class="grid grid-cols-3 gap-2">
			{#each game.monsters as monster}
				<div class="border p-2 text-center">
					<div>ASCII-{monster.name.charAt(0)}</div>
					<div class="mt-1">{monster.name}</div>
				</div>
			{/each}
		</div>
	</article>
</section>

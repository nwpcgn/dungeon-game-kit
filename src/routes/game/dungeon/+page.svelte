<script lang="ts">
	import type { PageData } from './$types'
	let { data }: { data: PageData } = $props()
	import { game } from '$lib/game2.svelte.ts'
</script>

<section class="page-layer nwp">
	<article class="content">
		<section>
			<div class="grid grid-cols-20 gap-0.5 text-center text-sm leading-tight">
				{#each Array(200) as _, i}
					<div class="h-4 w-4">
						{i === game.player.y * 20 + game.player.x
							? '@'
							: i % 7 === 0
								? '#'
								: '.'}
					</div>
				{/each}
			</div>
			<div class="mt-4 text-xs opacity-70">
				Legend: @ = Player, # = Wall, . = Floor
			</div>
		</section>
	</article>
</section>

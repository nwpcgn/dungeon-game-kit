<script lang="ts">
	import Dialog from '$lib/dialoges/Dialog.svelte'
	import type { PageData } from './$types'
	let { data }: { data: PageData } = $props()
	import { game } from '$lib/game.svelte.ts'
	$inspect(game)

	let dialog = $state()
</script>

<section class="page-layer nwp">
	<article class="content">
		<div class="grid grid-cols-2 gap-4">
			<div class="overflow-y-auto border p-2">
				<nav>
					{#each game.player.inventory as item}
						<button
							onclick={() => {
								dialog.showModal()
								console.log('open')
							}}
							class="hover:bg-base cursor-pointer">* {item.name}</button>
					{/each}
				</nav>
			</div>
			<div class="border p-2">
				<p>Select an item to view details.</p>
			</div>
		</div>
	</article>
</section>

<Dialog bind:dialog onClose={() => console.log('closed')}>
	This is amazingly simple! (press esc to close)
	<form method="dialog"><button value="cancel">Cancel</button></form>
</Dialog>

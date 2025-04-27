<script lang="ts">
	import { onMount } from 'svelte'
	import { game } from '$lib/game.svelte.ts'
	let { data } = $props()

	onMount(() => {
		game.initializeGame()
		console.log('-----------OUTPUT------------------')
		console.log('\nSpielerzustand:')
		console.log(game.player)

		console.log('\nAktuelles Level:')
		console.log(game.currentLevel)

		console.log('\nKarte des aktuellen Levels:')
		game.currentLevel.printMap()

		console.log('\nKampfsimulation:')
		game.startCombat(game.currentLevel.enemies[0])

		console.log('\nAufheben eines Items:')
		game.player.addItem(game.currentLevel.items[0])

		console.log('\nVerwendung des Items:')
		game.player.useItem(0)

		console.log('\nFinaler Spielerzustand:')
		console.log(game.player)
	})
</script>


<section class="page nwp">
	<article class="content">
		<h1>{data.title}</h1>
		<h4 class="text-2xl">Character</h4>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-4">
				
			</div>
			<div>
			
			</div>
		</div>
	</article>
</section>
{#snippet templ1(char)}
	<div class="bg-base-200 rounded-box flex flex-col gap-2 p-4 shadow-sm">
		<div class="flex items-center justify-between gap-4">
			<h1>{char['name']}</h1>

			<div class="text-4xl font-thin tabular-nums opacity-30">{char['hp']}</div>
		</div>

		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">position</div>
			<div>{char.position.x} / {char.position.y}</div>
		</div>
		<div>
			<button
				onclick={() => {
					if (char.id == 0) {
						char.attack(ch2)
					} else {
						char.attack(ch1)
					}
				}}
				class="btn">Attack</button>
		</div>

		<details>
			<summary>Info</summary>
			<div class="flex items-center justify-between gap-4">
				<div class="capitalize">atk</div>
				<div>{char['atk']}</div>
			</div>
			<div class="flex items-center justify-between gap-4">
				<div class="capitalize">def</div>
				<div>{char['def']}</div>
			</div>
			<div class="flex items-center justify-between gap-4">
				<div class="capitalize">mana</div>
				<div>{char['mana']}</div>
			</div>
			<div class="flex items-center justify-between gap-4">
				<div class="capitalize">sp</div>
				<div>{char['sp']}</div>
			</div>
		</details>
	</div>
{/snippet}

{#snippet templ2(char)}
	<div class="bg-base-200 rounded-box p-4 shadow-sm">
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">id</div>
			<div>{char['id']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">name</div>
			<div>{char['name']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">hp</div>
			<div>{char['hp']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">atk</div>
			<div>{char['atk']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">def</div>
			<div>{char['def']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">mana</div>
			<div>{char['mana']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">sp</div>
			<div>{char['sp']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">position</div>
			<div>{char.position.x} / {char.position.y}</div>
		</div>
		<button
			onclick={() => {
				if (char.id == 0) {
					char.attack(ch2)
				} else {
					char.attack(ch1)
				}
			}}
			class="btn">Attack</button>
	</div>
{/snippet}

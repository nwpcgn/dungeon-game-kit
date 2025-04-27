<script lang="ts">
	import './dungeon-grid.scss'
	let { tileMap, player, style, doors } = $props()
</script>

<div class="rogue-grid" {style}>
	{#each tileMap as row, y}
		{#each row as col, x}
			<span
				onpointerdown={() => {
					console.log({ col, x, y })
				}}
				data-x={x}
				data-y={y}
				data-col={col}
				class="tile"
				class:blank={col === 'x'}
				class:wall={col === '#'}
				class:floor={col === '.'}
				class:obs={col === 'o'}
				class:room={col === 'r'}
				class:door={col === 'D'}>
				{#if player.x == x && player.y == y}
					<span class="player"></span>
				{/if}
			</span>
		{/each}
	{/each}
</div>

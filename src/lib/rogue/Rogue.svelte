<script lang="ts">
	import Modal from '$lib/toast/Modal.svelte'
	import { notes, messages } from '$lib/toast/toast.svelte.ts'
	let msgs = $state([...messages.combat, ...messages.info])
	import RogueGrid from './RogueGrid.svelte'
	import generateDungeon from './generateDungeon'
	import { Spring } from 'svelte/motion'
	export interface GameObj {
		x: number
		y: number
	}
	let showModal = $state(false)
	let coords = new Spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.05,
			damping: 0.5
		}
	)

	let config = $state({
		frame: 520,
		rows: 60,
		cols: 100,
		gap: 1,
		size: 32
	})

	let style = $derived(
		`--gg-size: ${config.size}px;	--gg-gap: ${config.gap}px;	--gg-cols: ${config.cols};`
	)
	let styleCam = $derived(
		`--cam-x: ${coords.current.x}px; --cam-y: ${coords.current.y}px; --cam-size: ${config.frame}px;`
	)
	let ready = $state(false)
	let tileMap: string[][] = $state([])
	let doors = $state([])
	let player: GameObj = $state({ x: 0, y: 0 })
	let atlas = $state({
		x: {
			name: 'blank',
			style: 'blank',
			canMove: false,
			hidden: false,
			action: false,
			color: '#ecf0f1'
		},
		'#': {
			name: 'wall',
			style: 'wall',
			canMove: false,
			hidden: false,
			action: false,
			color: '#ecf0f1'
		},
		'.': {
			name: 'ground',
			style: 'floor',
			canMove: true,
			hidden: false,
			action: false,
			color: '#95a5a6'
		},
		r: {
			name: 'room',
			style: 'room',
			canMove: true,
			hidden: false,
			action: false,
			color: '#7f8c8d'
		},
		D: {
			name: 'door',
			style: 'door',
			canMove: true,
			hidden: false,
			action: true,
			color: '#e74c3c'
		},
		o: {
			name: 'obstacle',
			style: 'obs',
			canMove: true,
			hidden: false,
			action: false,
			color: '#f1c40f'
		},
		'€': {
			name: 'loot',
			style: 'loot',
			canMove: true,
			hidden: false,
			action: true,
			color: '#56524c'
		},
		$: {
			name: 'chest',
			style: 'chest',
			canMove: true,
			hidden: false,
			action: true,
			color: '#56524c'
		}
	})

	const drawDungeon = (width = 50, height = 30) => {
		ready = false
		const dungeon = generateDungeon(width, height)
		const areals = dungeon.areals
		const rooms = dungeon.rooms
		tileMap = dungeon.displayMap
		doors = dungeon.doors
		for (const key of areals) {
			var parts = key.split(',')
			var x = parseInt(parts[0])
			var y = parseInt(parts[1])
			tileMap[y][x] = 'r'
		}
		doors.forEach(({ x, y }) => {
			tileMap[y][x] = 'D'
		})
		const { centerX, centerY } = rooms[0]
		player = { x: centerX, y: centerY }
		ready = true
	}

	const initDungeon = () => {
		drawDungeon(config.cols, config.rows)
	}

	initDungeon()

	$effect(() => {
		if (player) {
			coords.target = {
				x:
					player.x * config.size -
					config.frame / 2 +
					config.size / 2 +
					player.x * config.gap,
				y:
					player.y * config.size -
					config.frame / 2 +
					config.size / 2 +
					player.y * config.gap
			}
		}
	})
	function canMove(a: GameObj, b: GameObj) {
		return !(a.x == b.x || a.y == b.y)
	}
	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') movePlayer(0, -1)
		if (e.key === 'ArrowDown') movePlayer(0, 1)
		if (e.key === 'ArrowLeft') movePlayer(-1, 0)
		if (e.key === 'ArrowRight') movePlayer(1, 0)
	}

	function movePlayer(dx: number, dy: number) {
		const newX = player.x + dx
		const newY = player.y + dy
		if (tileMap[newY][newX] === '#') {
			return
		}
		if (tileMap[newY][newX] === 'x') {
			return
		}
		player.x = newX
		player.y = newY
		if (tileMap[newY][newX] === '€') {
			if (!msgs.length) {
				msgs = [...messages.info]
			}

			let o = msgs.shift()
			notes.addNote(o)
		}
		// console.log({ newX, newY })
	}
</script>

<article class="flex justify-center py-4">
	<h1 class="text-4xl font-bold">Dungeon Generator 2</h1>
</article>
<article class="flex flex-col items-center gap-4 py-4">
	<div class="join">
		<button
			class="btn join-item"
			onclick={() => {
				showModal = true
			}}>Settings</button>
		<button class="btn btn-neutral join-item" onclick={initDungeon}
			>Generate</button>
	</div>
</article>
<div class="text-center">{player.x} {player.y}</div>

<section class="camera-frame" style={styleCam}>
	<div class="camera-canvas">
		<RogueGrid {player} {tileMap} {style} {doors}></RogueGrid>
	</div>
</section>

<Modal bind:showModal>
	{#snippet header()}
		<h3 class="text-lg font-bold">Settings</h3>
	{/snippet}

	<div class="grid grid-cols-2 gap-2 py-2">
		<div class="join join-vertical">
			<label class="input join-item">
				<span>Cols</span>
				<input type="number" bind:value={config.cols} min={10} max={100} />
			</label>
			<label class="input join-item">
				<span>Rows</span>
				<input type="number" bind:value={config.rows} min={10} max={100} />
			</label>
			<label class="input join-item">
				<span>Size</span>
				<input type="number" bind:value={config.size} min={1} max={100} />
			</label>
			<label class="input join-item">
				<span>Gap</span>
				<input type="number" bind:value={config.gap} min={0} max={10} />
			</label>
		</div>
		<div class="join join-vertical">
			<label class="input join-item">
				<span>Frame</span>
				<input type="number" bind:value={config.frame} min={100} max={1000} />
			</label>

			<label class="input join-item">
				<span>Stiff ({coords.stiffness})</span>
				<input
					bind:value={coords.stiffness}
					type="number"
					min="0.01"
					max="1"
					step="0.01" />
			</label>

			<label class="input join-item">
				<span>Damp ({coords.damping})</span>
				<input
					bind:value={coords.damping}
					type="number"
					min="0.01"
					max="1"
					step="0.01" />
			</label>
			<button class="btn btn-info join-item" onclick={initDungeon}
				>Generate</button>
		</div>
	</div>
</Modal>

<svelte:window onkeydown={handleKey} />

<style lang="scss">
	:root {
		--cam-size: 512px;
		--cam-x: 0px;
		--cam-y: 0px;
		--cam-w: var(--cam-size);
		--cam-h: var(--cam-size);
	}
	.camera-frame {
		width: var(--cam-size);
		height: var(--cam-size);
		position: relative;
		overflow: hidden;
		border: 2px solid var(--color-neutral);
		margin: 0 auto;
	}
	.camera-canvas {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(calc(-1 * var(--cam-x)), calc(-1 * var(--cam-y)));
	}
</style>

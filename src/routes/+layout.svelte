<script lang="ts">
	import '../app.css'
	import '../assets/webtui/main.scss'
	import { fly } from 'svelte/transition'

	import { Sprites } from '$lib'
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { quadInOut } from 'svelte/easing'

	let { children, data } = $props()
	let visible = $state(true)
	let status = $state('waiting...')
	let key = $state()
	let menuOpen = $state(false)

	const onKeyDown = (event) => {
		if (event.defaultPrevented) {
			return
		}
		key = event.key
		switch (key) {
			case 'ArrowDown':
				// Do something for "down arrow" key press.
				break
			case 'ArrowUp':
				// Do something for "up arrow" key press.
				break
			case 'ArrowLeft':
				// Do something for "left arrow" key press.
				break
			case 'ArrowRight':
				// Do something for "right arrow" key press.
				break
			case 'Enter':
				goto('#/game/dungeon')
				break
			case ' ':
				// Do something for "space" key press.
				break
			case 'Escape':
				menuOpen = !menuOpen
				break
			default:
				return // Quit when this doesn't handle the key event.
		}

		event.preventDefault()
	}
</script>

<svelte:window onkeydown={onKeyDown} />

<div
	class="nwp-terminal relative flex min-h-screen flex-col">
	<header class="mb-2 border-b p-2 text-center">
		{#if page.error}
			<span class="red">Problem detected</span>
		{:else}
			<span class="small">All systems operational</span>
		{/if}
	</header>
	<main class="main border-double">
		{@render children?.()}
	</main>
	<footer class="mt-2 border-t p-2 text-center text-xs opacity-70">
		RPG Game © 2025 - Press ESC for Menu
	</footer>

	{#if menuOpen}
		<div class="page-layer nwp menu-overlay">
			<div
				class="content-sm rounded-xl p-4"
				transition:fly={{ y: 300, duration: 600, easing: quadInOut }}>
				<h2 class="mb-4 text-2xl">Menu</h2>
				<nav class="grid min-w-96 gap-2 p-2 text-center">
					{#each data.menu as { name, href, icon, avatar, image }}
						<button
							onclick={() => {
								goto(`#${href}`)
								menuOpen = false
							}}
							class="menu-link gap-4">
							<span>[{name}]</span>
							{@render iconT(icon)}
						</button>
					{/each}

					<button class="menu-link" onclick={() => (menuOpen = false)}>
						[Close Menu]
					</button>
				</nav>
			</div>
		</div>
	{/if}
</div>
{#snippet iconT(name)}
	<svg class="nwp-icon game"><use xlink:href="#{name}"></use></svg>
{/snippet}
<Sprites></Sprites>

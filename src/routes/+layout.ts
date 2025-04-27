import type { LayoutLoad } from './$types'
import { initAssets, game } from '$lib/game.svelte.ts'

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch('/data/gameData.json')
	const data = await res.json()
	if (data) {
		initAssets(data)
	}
	return {
		name: 'Nwp-Studio',
		menu: [
			{
				name: 'Start',
				title: 'Rpg-Game',
				href: '/',
				icon: 'game-start',
				avatar: 'game-roll',
				image: '/img/rpg/menu-start.png',
				hidden: false
			},
			{
				name: 'Inventory',
				title: 'Game Items',
				href: '/game/inventory',
				icon: 'game-items',
				avatar: 'game-potion',
				image: '/img/rpg/menu-inventory.png',
				hidden: false
			},
			{
				name: 'Map',
				title: 'Dungeon Map',
				href: '/game/dungeon',
				icon: 'game-map1',
				avatar: 'game-map',
				image: '/img/rpg/menu-map.png',
				hidden: false
			},
			{
				name: 'Heroes',
				title: 'Monster',
				href: '/game/monster',
				icon: 'game-hero',
				avatar: 'game-knight',
				image: '/img/rpg/menu-hero.png',
				hidden: false
			},
			{
				name: 'Arena',
				title: 'Battle Arena',
				href: '/game/battle',
				icon: 'game-arena',
				avatar: 'game-armor',
				image: '/img/rpg/menu-arena.png',
				hidden: false
			},
			{
				name: 'Settings',
				title: 'Options',
				href: '/game/settings',
				icon: 'game-settings',
				avatar: 'game-book',
				image: '/img/rpg/menu-spell.png',
				hidden: false
			}
		]
	}
}

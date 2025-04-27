import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Game Dungeon'
	}
}) satisfies PageLoad

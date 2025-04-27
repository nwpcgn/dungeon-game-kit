import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Game Battle'
	}
}) satisfies PageLoad

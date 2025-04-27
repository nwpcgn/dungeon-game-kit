import { browser } from '$app/environment'

function fromLocalStorage(storageKey: string, fallbackValue: any) {
	if (browser) {
		const storedValue = window.localStorage.getItem(storageKey)

		if (storedValue !== 'undefined' && storedValue !== null) {
			return typeof fallbackValue === 'object'
				? JSON.parse(storedValue)
				: storedValue
		}
	}

	return fallbackValue
}

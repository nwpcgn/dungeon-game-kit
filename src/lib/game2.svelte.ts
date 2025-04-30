class Game2 {
	assets = $state()
	player = $state(null)
	currentLevel = $state(null)
	levels = $state([])
	roomWidth = $state(0)
	roomHeight = $state(0)
	inventory = $state(['Potion', 'Sword', 'Shield'])
	battleLog = $state([])
	monsters = $state([
		{ name: 'Slime', hp: 10 },
		{ name: 'Goblin', hp: 15 },
		{ name: 'Bat', hp: 8 }
	])

	constructor() {
		this.player = { x: 0, y: 0 }
		this.currentLevel = null
		this.levels = []
		// this.roomWidth = roomWidth
		// this.roomHeight = roomHeight
	}
}

export let game = new Game2(50, 30)

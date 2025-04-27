import * as ROT from 'rot-js'

type Room = {
	x1: number
	y1: number
	x2: number
	y2: number
	centerX: number
	centerY: number
}

type DungeonResult = {
	displayMap: string[][]
	rooms: Room[]
	corridors: { x: number; y: number }[]
}

export function generateDungeon(width = 40, height = 20): DungeonResult {
	const digger = new ROT.Map.Digger(width, height)
	const displayMap: string[][] = Array.from({ length: height }, () =>
		Array(width).fill(' ')
	)

	// Dungeon-Zellen setzen ('.' für Boden, 'x' für Wand)
	digger.create((x, y, wall) => {
		displayMap[y][x] = wall ? 'x' : '.'
	})

	// Räume extrahieren
	const rooms: Room[] = []
	const doors = []
	const drawDoor = (x, y) => {
		doors.push({ x, y })
	}

	digger.getRooms().forEach((room) => {
		const [centerX, centerY] = room.getCenter()
		rooms.push({
			x1: room.getLeft(),
			y1: room.getTop(),
			x2: room.getRight(),
			y2: room.getBottom(),
			centerX,
			centerY
		})
		room.getDoors(drawDoor)
	})

	// Korridore sind '.'-Zellen, die **nicht** in einem Raum liegen
	const roomArea = new Set<string>()
	for (const r of rooms) {
		for (let y = r.y1; y <= r.y2; y++) {
			for (let x = r.x1; x <= r.x2; x++) {
				roomArea.add(`${x},${y}`)
			}
		}
	}

	const corridors = []
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (displayMap[y][x] === '.' && !roomArea.has(`${x},${y}`)) {
				corridors.push({ x, y })
			}
		}
	}

	return { displayMap, rooms, corridors, doors }
}

export function renderDungeonToDOM(container: HTMLElement, map: string[][]) {
	container.innerHTML = '' // Reset
	container.style.display = 'grid'
	container.style.gridTemplateColumns = `repeat(${map[0].length}, 1rem)`

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			const tile = document.createElement('div')
			tile.style.width = '1rem'
			tile.style.height = '1rem'

			const cell = map[y][x]
			if (cell === 'x') {
				tile.style.background = '#333' // Wand
			} else if (cell === '.') {
				tile.style.background = '#ccc' // Boden
			} else {
				tile.style.background = 'transparent' // unbekannt
			}

			container.appendChild(tile)
		}
	}
}

export function renderDungeonToCanvas(
	canvas: HTMLCanvasElement,
	map: string[][]
) {
	const ctx = canvas.getContext('2d')
	if (!ctx) return

	const cellSize = 4 // Mini-Maßstab
	canvas.width = map[0].length * cellSize
	canvas.height = map.length * cellSize

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			const cell = map[y][x]
			if (cell === 'x') {
				ctx.fillStyle = '#444' // Wand
			} else if (cell === '.') {
				ctx.fillStyle = '#eee' // Boden
			} else {
				ctx.fillStyle = 'transparent'
			}
			ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
		}
	}
}

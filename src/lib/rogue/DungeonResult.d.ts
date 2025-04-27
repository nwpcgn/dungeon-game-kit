export interface DungeonResult {
	displayMap?: (string[] | null)[] | null
	rooms?: Room[] | null
	Corridor?: Corridor[] | null
	Door?: Door[] | null
}
export interface Room {
	x1: number
	y1: number
	x2: number
	y2: number
	centerX: number
	centerY: number
}
export interface Corridor {
	x: number
	y: number
}
export interface Door {
	x: number
	y: number
}

// import type {DungeonResult,Door,Room,Corridor} from './DungeonResult'

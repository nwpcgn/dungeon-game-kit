import generateDungeon from './game/generateDungeon'
import shuffle from './utils/shuffle'
export let assets = $state({})
export const initAssets = (obj = {}) => {
	const { character, loot, menu, alerts } = obj
	assets.character = shuffle(character)
	assets.loot = shuffle(loot)
	assets.alert = shuffle(alerts)
	assets.menu = menu
}

class Display {
	list = $state([])
	count = $derived(this.list?.length)

	logText(text, style = '') {}

	addMsg(note = {}) {
		const id = crypto.randomUUID()
		const def = {
			id,
			text: 'Alert',
			style: 'alert-info',
			type: 'info'
		}
		const obj = { ...def, ...note }
		this.list.push(obj)
	}
}
export let display = new Display()
class Character {
	id: number = $state()
	x: number = $state(0)
	y: number = $state(0)
	name: string = $state()
	hp: number = $state()
	atk: number = $state()
	def: number = $state()
	mana: number = $state()
	sp: number = $state()
	hpOrigin: number = $state()
	atkOrigin: number = $state()
	defOrigin: number = $state()
	manaOrigin: number = $state()
	spOrigin: number = $state()
	constructor(
		id: number,
		name: string,
		hp: number,
		atk: number,
		def: number,
		mana: number,
		sp: number
	) {
		this.id = id
		this.name = name
		this.hp = hp
		this.atk = atk
		this.def = def
		this.mana = mana
		this.sp = sp
		this.hpOrigin = this.hp
		this.atkOrigin = this.atk
		this.defOrigin = this.def
		this.manaOrigin = this.mana
		this.spOrigin = this.sp
	}

	get position() {
		const x = this.x
		const y = this.y
		return { x, y }
	}
	set position(obj = { x: 0, y: 0 }) {
		this.x = obj.x
		this.y = obj.y
	}

	takeDamage(amount) {
		this.hp = Math.max(0, this.hp - amount)
		console.log(
			`${this.name} nimmt ${amount} Schaden. Verbleibende Gesundheit: ${this.hp}`
		)
		if (this.hp <= 0) {
			console.log(`${this.name} ist gestorben. Game Over!`)
		}
	}

	attack(target) {
		const gamble = Math.random()
		const damage = Math.round(this.atk + this.atk * Math.random()) - target.def
		let damageDone = 0
		let logObj = null
		if (gamble > 0.9) {
			damageDone = damage * 3
			logObj = {
				text: `IT WAS A CRITICAL HIT ${this.name}!!!! ${damageDone} points of damage were dealt`,
				style: 'alert-success'
			}
		} else {
			logObj = {
				text: `${this.name} attacks ${target.name} dealing ${damage} points of damage`,
				style: 'alert-warning'
			}
			damageDone = damage
		}

		target.takeDamage(damage)
		display.addMsg(logObj)

		return damage
	}
}

class Player extends Character {
	inventory = $state([])
	level = $state(1)
	experience = $state(0)
	constructor(
		id: number,
		name: string,
		hp: number,
		atk: number,
		def: number,
		mana: number,
		sp: number
	) {
		super(id, name, hp, atk, def, mana, sp)
		this.inventory = []
		this.level = 1
		this.experience = 0
	}

	addItem(item) {
		this.inventory.push(item)
		console.log(`${item.name} zum Inventar hinzugefügt.`)
	}

	useItem(itemIndex) {
		if (itemIndex >= 0 && itemIndex < this.inventory.length) {
			const item = this.inventory[itemIndex]
			item.use(this)
			this.inventory.splice(itemIndex, 1)
		} else {
			console.log('Ungültiger Item-Index.')
		}
	}

	gainExperience(amount) {
		this.experience += amount
		console.log(`${this.name} erhält ${amount} Erfahrungspunkte.`)
		if (this.experience >= this.level * 100) {
			this.levelUp()
		}
	}

	levelUp() {
		this.level++
		this.hpOrigin += 10
		this.health = this.hpOrigin
		this.atk += 2
		this.experience = 0
		console.log(
			`${this.name} erreicht Level ${this.level}! Gesundheit und Angriff erhöht.`
		)
	}
}

class Level {
	constructor(name, width, height) {
		this.name = name
		this.enemies = []
		this.items = []
		this.width = width
		this.height = height
		this.map = this.generateMap()
		this.generateContent()
	}

	generateMap() {
		const dungeon = generateDungeon(this.width, this.height)
		let map = dungeon.displayMap
		for (const key of dungeon.areals) {
			let parts = key.split(',')
			let x = parseInt(parts[0])
			let y = parseInt(parts[1])
			map[y][x] = 'o'
		}
		dungeon.doors.forEach(({ x, y }) => {
			map[y][x] = 'D'
		})
		return map
	}

	generateContent() {
		if (assets.character.length) {
			let enemyList = [
				assets.character.shift(),
				assets.character.shift(),
				assets.character.shift()
			]
			enemyList.forEach(({ id, name, hp, atk, def, mana, sp }) => {
				this.enemies.push(new Character(id, name, hp, atk, def, mana, sp))
			})
		}
		if (assets.loot.length) {
			let itemList = [
				assets.loot.shift(),
				assets.loot.shift(),
				assets.loot.shift()
			]
			itemList.forEach(({ name, type, value }) => {
				this.items.push(new Item(name, type, value))
			})
		}
	}

	printMap() {
		console.log(this.map.map((row) => row.join('')).join('\n'))
	}
}

class Item {
	constructor(name, type, value) {
		this.name = name
		this.type = type
		this.value = value
	}

	use(player) {
		switch (this.type) {
			case 'medkit':
				const healAmount = Math.min(
					this.value,
					player.maxHealth - player.health
				)
				player.health += healAmount
				console.log(
					`${player.name} heilt um ${healAmount} Punkte. Neue Gesundheit: ${player.health}`
				)
				break
			case 'energiezelle':
				player.attackPower += this.value
				console.log(
					`${player.name}'s Angriffskraft erhöht sich um ${this.value}. Neue Angriffskraft: ${player.attackPower}`
				)
				break
			case 'munition':
				console.log(
					`${player.name} füllt Munition auf. Nächster Angriff verursacht zusätzlichen Schaden.`
				)
				// Implement logic for extra damage in the next attack
				break
		}
	}
}

class Game {
	assets = $state({})
	player = $state(null)
	currentLevel = $state(null)
	levels = $state([])
	roomWidth = $state(0)
	roomHeight = $state(0)

	constructor(roomWidth = 20, roomHeight = 10) {
		this.player = null
		this.currentLevel = null
		this.levels = []
		this.roomWidth = roomWidth
		this.roomHeight = roomHeight
	}

	initializeGame() {
		this.player = new Player(62, 'Abby', 30, 5, 6, 5, 3)
		this.generateLevels()
		this.currentLevel = this.levels[0]
		console.log('Spiel initialisiert. Willkommen in Neon Wasteland!')
	}

	generateLevels() {
		this.levels.push(
			new Level('Industriegebiet', this.roomWidth, this.roomHeight)
		)
		this.levels.push(
			new Level('Untergrundbunker', this.roomWidth, this.roomHeight)
		)
		this.levels.push(
			new Level('Wolkenkratzerruinen', this.roomWidth, this.roomHeight)
		)
	}

	startCombat(enemy) {
		console.log(`\nKampf beginnt: ${this.player.name} vs ${enemy.name}`)
		let isPlayerTurn = Math.random() < 0.5

		while (this.player.hp > 0 && enemy.hp > 0) {
			if (isPlayerTurn) {
				this.player.attack(enemy)
			} else {
				enemy.attack(this.player)
			}
			isPlayerTurn = !isPlayerTurn
		}

		if (this.player.hp > 0) {
			console.log(`\n${this.player.name} hat den Kampf gewonnen!`)
			this.player.gainExperience(enemy.mana)
		} else {
			console.log(`\n${this.player.name} wurde besiegt. Game Over!`)
		}
	}
}

export let game = new Game(50, 30)

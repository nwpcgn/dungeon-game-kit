<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	export interface Displays {
		list?: ListEntity[] | []
	}
	export interface ListEntity {
		id?: string | null
		type: string
		style: string
		text: string
	}

	class Display {
		list: ListEntity = $state([])
		count: number = $derived(this.list?.length)

		addMsg(note: ListEntity) {
			const id = crypto.randomUUID()
			const def = {
				id,
				text: 'Alert',
				style: 'alert-info',
				type: 'info'
			}

			const obj = { ...def, ...note }
			this.list.push(obj)

			console.log(this.list)
		}
	}

	let display = new Display()

	class Character {
		id: number = $state()
		x: number = $state(0)
		y: number = $state(0)
		name: string = $state()
		#hp: number = $state()
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

		get hp() {
			return this.#hp
		}
		set hp(value) {
			this.#hp = Math.max(value, 0)
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

		attack(target) {
			const gamble = Math.random()
			const damage =
				Math.round(this.atk + this.atk * Math.random()) - target.def

			const style = this.id == 1 ? 'alert-warning' : 'alert-info'
			let damageDone
			if (gamble > 0.9) {
				const critHit = damage * 3
				damageDone = target.hp - critHit
				target.hp = damageDone

				display.addMsg({
					text: `IT WAS A CRITICAL HIT ${this.name}!!!! ${critHit} points of damage were dealt`,
					style
				})
				return critHit
			}

			damageDone = target.hp - damage
			target.hp = damageDone
			display.addMsg({
				text: `${this.name} attacks ${target.name} dealing ${damage} points of damage`,
				style
			})

			return damage
		}
	}

	class Game {
		constructor(roomWidth = 20, roomHeight = 10) {
			this.player = null
			this.currentLevel = null
			this.levels = []
			this.roomWidth = roomWidth
			this.roomHeight = roomHeight
		}

		initializeGame() {
			this.player = new Character(0, 'Abby', 30, 5, 3, 100, 10)
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
					enemy.attackPlayer(this.player)
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

	class Player {
		constructor(name, hp, atk) {
			this.name = name
			this.hp = hp
			this.hpOrigin = hp
			this.atk = atk
			this.inventory = []
			this.level = 1
			this.mana = 0
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

		attack(enemy) {
			const damage = Math.floor(this.atk * (0.8 + Math.random() * 0.4))
			console.log(
				`${this.name} greift ${enemy.name} an und verursacht ${damage} Schaden.`
			)
			enemy.takeDamage(damage)
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
			this.mana += amount
			console.log(`${this.name} erhält ${amount} Erfahrungspunkte.`)
			if (this.mana >= this.level * 100) {
				this.levelUp()
			}
		}

		levelUp() {
			this.level++
			this.hpOrigin += 10
			this.hp = this.hpOrigin
			this.atk += 2
			this.mana = 0
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
			const map = []
			for (let y = 0; y < this.height; y++) {
				map.push(Array(this.width).fill('.'))
			}
			return map
		}

		generateContent() {
			const enemyTypes = ['Roboter', 'Mutant', 'Drohne']
			const itemTypes = ['Medkit', 'Energiezelle', 'Munition']

			for (let i = 0; i < 3; i++) {
				const enemyType =
					enemyTypes[Math.floor(Math.random() * enemyTypes.length)]
				this.enemies.push(
					new Enemy(enemyType, 30 + Math.random() * 20, 5 + Math.random() * 5)
				)

				const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)]
				this.items.push(
					new Item(itemType, itemType.toLowerCase(), 20 + Math.random() * 10)
				)
			}
		}

		printMap() {
			console.log(this.map.map((row) => row.join('')).join('\n'))
		}
	}

	class Enemy {
		constructor(name, hp, atk) {
			this.name = name
			this.hp = hp
			this.atk = atk
			this.mana = Math.floor(hp / 2)
		}

		attackPlayer(player) {
			const damage = Math.floor(this.atk * (0.8 + Math.random() * 0.4))
			console.log(
				`${this.name} greift ${player.name} an und verursacht ${damage} Schaden.`
			)
			player.takeDamage(damage)
		}

		takeDamage(amount) {
			this.hp = Math.max(0, this.hp - amount)
			console.log(
				`${this.name} nimmt ${amount} Schaden. Verbleibende Gesundheit: ${this.hp}`
			)
			if (this.hp <= 0) {
				console.log(`${this.name} wurde besiegt!`)
			}
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
					const healAmount = Math.min(this.value, player.hpOrigin - player.hp)
					player.hp += healAmount
					console.log(
						`${player.name} heilt um ${healAmount} Punkte. Neue Gesundheit: ${player.hp}`
					)
					break
				case 'energiezelle':
					player.atk += this.value
					console.log(
						`${player.name}'s Angriffskraft erhöht sich um ${this.value}. Neue Angriffskraft: ${player.atk}`
					)
					break
				case 'munition':
					console.log(
						`${player.name} füllt Munition auf. Nächster Angriff verursacht zusätzlichen Schaden.`
					)
					// Implement logic for extra damage in the next atk
					break
			}
		}
	}

	const charList = []

	// Beispiel für die Verwendung der Klassen mit variabler Raumgröße
	const game = new Game(30, 15) // Erstelle ein Spiel mit Räumen der Größe 30x15
	game.initializeGame()
	console.clear()
	console.log('-----------OUTPUT------------------')
	console.log('\nSpielerzustand:')
	console.log(game.player)

	console.log('\nAktuelles Level:')
	console.log(game.currentLevel)

	console.log('\nKarte des aktuellen Levels:')
	game.currentLevel.printMap()

	// console.log('\nKampfsimulation:')
	// game.startCombat(game.currentLevel.enemies[0])

	// console.log('\nAufheben eines Items:')
	// game.player.addItem(game.currentLevel.items[0])

	// console.log('\nVerwendung des Items:')
	// game.player.useItem(0)

	// console.log('\nFinaler Spielerzustand:')
	// console.log(game.player)
</script>

<section class="page nwp">
	<article class="content">
		<h1>{data.title}</h1>
	</article>
</section>

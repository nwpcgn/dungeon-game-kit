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
			const damage =
				Math.round(this.atk + this.atk * Math.random()) - target.def
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
			const map = Array.from({ length: this.height }, () =>
				Array(this.width).fill('.')
			)
			return map
		}

		generateContent() {
			const enemyList = [
				{
					id: 63,
					name: 'Abra',
					hp: 26,
					atk: 6,
					def: 3,
					mana: 7,
					sp: 3
				},
				{
					id: 142,
					name: 'Aerodactyl',
					hp: 33,
					atk: 5,
					def: 5,
					mana: 4,
					sp: 8
				},
				{
					id: 65,
					name: 'Alakazam',
					hp: 34,
					atk: 5,
					def: 4,
					mana: 8,
					sp: 5
				}
			]
			const itemList = [
				{
					name: 'anvil',
					type: 'Weapon',
					value: 1
				},
				{
					name: 'augur',
					type: 'Armor',
					value: 3
				},
				{
					name: 'axe',
					type: 'Weapon',
					value: 5
				}
			]

			enemyList.forEach(({ id, name, hp, atk, def, mana, sp }) => {
				this.enemies.push(new Character(id, name, hp, atk, def, mana, sp))
			})
			itemList.forEach(({ name, type, value }) => {
				this.items.push(new Item(name, type, value))
			})
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
		constructor(roomWidth = 20, roomHeight = 10) {
			this.player = null
			this.currentLevel = null
			this.levels = []
			this.roomWidth = roomWidth
			this.roomHeight = roomHeight
		}

		initializeGame() {
			this.player = new Player(63, 'Abra', 26, 6, 3, 7, 3)
			this.generateLevels()
			this.currentLevel = this.levels[0]
			console.log('Spiel initialisiert. Willkommen in Neon Wasteland!')
		}

		generateLevels() {
			// console.log('Generate Levels')
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
			// console.log(`\nKampf beginnt: ${this.player.name} vs ${enemy.name}`)
			// let isPlayerTurn = Math.random() < 0.5
			// while (this.player.health > 0 && enemy.health > 0) {
			// 	if (isPlayerTurn) {
			// 		this.player.attack(enemy)
			// 	} else {
			// 		enemy.attackPlayer(this.player)
			// 	}
			// 	isPlayerTurn = !isPlayerTurn
			// }
			// if (this.player.health > 0) {
			// 	console.log(`\n${this.player.name} hat den Kampf gewonnen!`)
			// 	this.player.gainExperience(enemy.experienceValue)
			// } else {
			// 	console.log(`\n${this.player.name} wurde besiegt. Game Over!`)
			// }
		}
	}

	let game = new Game(30, 15)
	game.initializeGame()
	console.log('-----------OUTPUT------------------')
	console.log('\nSpielerzustand:')
	display.addMsg({ text: `${game.player.name}` })

	console.log('\nAktuelles Level:')
	console.log(game.currentLevel)

	console.log('\nKarte des aktuellen Levels:')
	game.currentLevel.printMap()

	console.log('\nKampfsimulation:')
	game.startCombat(game.currentLevel.enemies[0])

	console.log('\nAufheben eines Items:')
	game.player.addItem(game.currentLevel.items[0])

	console.log('\nVerwendung des Items:')
	game.player.useItem(0)

	console.log('\nFinaler Spielerzustand:')
	console.log(game.player)
</script>

<section class="page nwp">
	<article class="content">
		<h1>{data.title}</h1>
		<!-- <h4 class="text-2xl">Character</h4>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-4">
				{#each [ch1, ch2] as char}
					{@render templ1(char)}
				{/each}
			</div>
			<div>
				{#if display.count}
					<div class="grid gap-2">
						{#each display.list as { id, type, style, text } (id)}
							<div role="alert" class="alert {style} alert-soft">
								<span>{text}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div> -->
	</article>
</section>
{#snippet templ1(char)}
	<div class="bg-base-200 rounded-box flex flex-col gap-2 p-4 shadow-sm">
		<div class="flex items-center justify-between gap-4">
			<h1>{char['name']}</h1>

			<div class="text-4xl font-thin tabular-nums opacity-30">{char['hp']}</div>
		</div>

		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">position</div>
			<div>{char.position.x} / {char.position.y}</div>
		</div>
		<div>
			<button
				onclick={() => {
					if (char.id == 0) {
						char.attack(ch2)
					} else {
						char.attack(ch1)
					}
				}}
				class="btn">Attack</button>
		</div>

		<details>
			<summary>Info</summary>
			<div class="flex items-center justify-between gap-4">
				<div class="capitalize">atk</div>
				<div>{char['atk']}</div>
			</div>
			<div class="flex items-center justify-between gap-4">
				<div class="capitalize">def</div>
				<div>{char['def']}</div>
			</div>
			<div class="flex items-center justify-between gap-4">
				<div class="capitalize">mana</div>
				<div>{char['mana']}</div>
			</div>
			<div class="flex items-center justify-between gap-4">
				<div class="capitalize">sp</div>
				<div>{char['sp']}</div>
			</div>
		</details>
	</div>
{/snippet}

{#snippet templ2(char)}
	<div class="bg-base-200 rounded-box p-4 shadow-sm">
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">id</div>
			<div>{char['id']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">name</div>
			<div>{char['name']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">hp</div>
			<div>{char['hp']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">atk</div>
			<div>{char['atk']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">def</div>
			<div>{char['def']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">mana</div>
			<div>{char['mana']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">sp</div>
			<div>{char['sp']}</div>
		</div>
		<div class="flex items-center justify-between gap-4">
			<div class="capitalize">position</div>
			<div>{char.position.x} / {char.position.y}</div>
		</div>
		<button
			onclick={() => {
				if (char.id == 0) {
					char.attack(ch2)
				} else {
					char.attack(ch1)
				}
			}}
			class="btn">Attack</button>
	</div>
{/snippet}

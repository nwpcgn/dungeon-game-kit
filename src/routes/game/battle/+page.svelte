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

	let ch1 = new Character(0, 'Abby', 30, 5, 3, 100, 10)
	let ch2 = new Character(1, 'Ybba', 35, 6, 2, 70, 5)

	ch1.position = { x: 3, y: 4 }
</script>

<section class="page nwp">
	<article class="content">
		<h1>{data.title}</h1>
		<h4 class="text-2xl">Character</h4>
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
		</div>
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

<script lang="ts">
	import type { Notification } from './Notification'
	import { notes } from './notification.svelte.ts'
	import { typewriter } from './transition.js'
	import { messages } from './loading-messages'
	let i = $state(0)
	messages.forEach((m) => {
		notes.addNote(m)
	})

	$effect(() => {
		const interval = setInterval(() => {
			i += 1
			i %= notes.list.length
		}, 2500)

		return () => {
			clearInterval(interval)
		}
	})
</script>

<div class="flex w-full flex-col p-4 lg:flex-row">
	<div class="card bg-base-300 rounded-box flex-1 p-4">
		<div>
			{#if notes.list.length}
				<div>
					{#each notes.list as item, id}
						{#if id == i}
							<div in:typewriter={{ speed: 10 }}>
								{item.text || ''}
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="divider lg:divider-horizontal">OR</div>
	<div class="card bg-base-300 rounded-box min-h-32 flex-1 p-4">
		<div>
			{#if notes.list.length}
				<div>
					{#each notes.list as item, id}
						{#if id == i}
							<div in:typewriter={{ speed: 10 }}>
								{item.text || ''}
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

{#snippet alertT({ id, style, text })}
	<div
		role="alert"
		class="alert alert-vertical sm:alert-horizontal alert-soft {style}">
		{@render iconT('nwp-info')}
		<span>{text}</span>
		<div>
			<button
				class="btn btn-ghost btn-sm btn-circle"
				onclick={() => {
					notes.delNote(id)
				}}>
				{@render iconT('nwp-close')}
			</button>
		</div>
	</div>
{/snippet}
{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}

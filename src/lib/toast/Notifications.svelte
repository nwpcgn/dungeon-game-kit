<script lang="ts">
	import { notes } from './notification.svelte.ts'
	const atlas = {
		success: {
			style: 'alert-success',
			icon: 'nwp-star'
		},
		error: {
			style: 'alert-error',
			icon: 'nwp-warning'
		},
		loot: {
			style: 'alert-warning',
			icon: 'nwp-warning'
		},
		npc: {
			style: 'alert-info',
			icon: 'nwp-user'
		},
		combat: {
			style: 'alert-success',
			icon: 'nwp-skull-1'
		},
		info: {
			style: 'alert-info',
			icon: 'nwp-info'
		},
		quest: {
			style: 'alert-warning',
			icon: 'nwp-key'
		}
	}
</script>

{#if notes.list?.length}
	<div class="toast toast-top toast-end z-50">
		{#each notes.list as { id, type, style, text }}
			{@render alertT({ id, type, style, text })}
		{/each}
	</div>
{/if}
{#snippet alertT({ id, type, style, text })}
	<div
		role="alert"
		class="alert alert-vertical sm:alert-horizontal alert-soft {atlas[style]
			.style}">
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

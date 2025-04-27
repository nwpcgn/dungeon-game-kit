<script>
	let { isOpen, payload, children, component } = $props()
</script>

{#if $payload.length && $isOpen}
	{#each $payload as { component, props }, modalIndex}
		{@render component?.({ ...props })}
	{/each}
{/if}

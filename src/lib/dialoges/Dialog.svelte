<script>
	let { dialog = $bindable(), children, onClose } = $props()
</script>

<dialog bind:this={dialog} onclose={onClose}>
	{@render children?.()}
</dialog>

<style>
	:root {
		--blue: #2452e5;
		--dark-blue: #113092;
	}

	dialog {
		/* padding: 50px;
		border-radius: 5px;
		border: 0; */

		&::backdrop {
			background: rgba(0, 0, 0, 0.4);
		}

		&[open],
		&::backdrop {
			animation: show 500ms ease;
		}
	}
</style>

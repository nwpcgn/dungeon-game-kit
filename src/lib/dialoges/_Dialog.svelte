<script lang="ts">
	import Dialog from './Dialog.svelte'
	let dialog = $state()
</script>

<button
	onclick={() => {
		dialog.showModal()
		console.log('open')
	}}>Open It!</button>

<Dialog bind:dialog onClose={() => console.log('closed')}>
	This is amazingly simple! (press esc to close)
	<form method="dialog"><button value="cancel">Cancel</button></form>
</Dialog>

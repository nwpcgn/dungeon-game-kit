<script lang="ts">
	import LoadingPage from '../lib/game/LoadingPage.svelte'

	let { data } = $props()
</script>

<LoadingPage></LoadingPage>

<style>
	@keyframes blink {
		0%,
		50%,
		100% {
			opacity: 1;
		}
		25%,
		75% {
			opacity: 0;
		}
	}
	.animate-blink {
		animation: blink 1.5s infinite;
	}
</style>

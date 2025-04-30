<script lang="ts">
	import type { PageData } from './$types'
	import Rogue from '$lib/rogue/Rogue.svelte'
	let { data }: { data: PageData } = $props()
</script>

<section class="page nwp">
	<!-- <article class="content">
		<h1>{data.title}</h1>
	</article> -->
	<Rogue></Rogue>
</section>

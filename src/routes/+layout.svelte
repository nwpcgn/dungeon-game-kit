<script lang="ts">
	import '../app.css'
	import '../assets/webtui/main.scss'
	import { Sprites } from '$lib'
	let { children } = $props()
</script>

{@render children()}

<Sprites></Sprites>

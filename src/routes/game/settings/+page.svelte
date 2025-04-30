<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<section class="page-layer nwp">
	<article class="content">
		<div class="flex flex-col gap-2">
			<label><input type="checkbox" checked /> Enable Sound</label>
			<label><input type="checkbox" /> Show FPS</label>
			<label
				>Difficulty:
				<select>
					<option>Easy</option>
					<option selected>Normal</option>
					<option>Hard</option>
				</select>
			</label>
		</div>
	</article>
</section>

<script lang="ts">
	let { children, data } = $props()
</script>

<div class="app-layout">
	<aside class="sidebar">
		<div class="p-4">
			<ul class="menu bg-base-300 rounded-box w-36">
				{#each data.menu as { name, href, icon, avatar }}
					<li>
						<a href="#{href}">
							{@render iconT(icon)}
							<span>{name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
	<header class="header">
		<div class="navbar bg-neutral text-neutral-content">
			<a href="#/" class="btn btn-neutral text-xl">{data.name}</a>
		</div>
	</header>
	<div class="main-content">
		{@render children?.()}
	</div>
</div>

{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}

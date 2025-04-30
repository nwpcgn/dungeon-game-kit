<script lang="ts">
</script>

<div class="stack-wrapper bg-base-neutral">
	<section class="page nwp center">
		<div class="flex flex-col items-center justify-center gap-8 p-8">
			<div
				class="box opacity-50 transition-opacity delay-100 duration-400 ease-in hover:opacity-100">
			</div>
			<span
				class="animate-blink-x animate-duration-[800ms] animate-ease-in animate-bounce text-3xl font-bold"
				>Press [Enter] to Start</span>
		</div>
	</section>
</div>

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

	.box {
		width: 200px;
		height: 200px;
		display: inline-block;
		margin: 20px;
		position: relative;
		border: 6px solid #ccc;
		border-radius: 50%;
		background-image:
			-moz-radial-gradient(
				40% 40%,
				circle,
				rgba(0, 0, 0, 0.1) 40%,
				rgba(0, 0, 0, 1) 100%
			),
			-moz-linear-gradient(
					-90deg,
					#f33 45%,
					#333 45%,
					#3f3f3f 50%,
					#333 55%,
					#fff 55%
				);
		background-image:
			-webkit-radial-gradient(
				40% 40%,
				circle,
				rgba(0, 0, 0, 0.1) 40%,
				rgba(0, 0, 0, 1) 100%
			),
			-webkit-linear-gradient(
					-90deg,
					#f33 45%,
					#333 45%,
					#3f3f3f 50%,
					#333 55%,
					#fff 55%
				);
	}
	.box1 {
		background-image:
			-moz-radial-gradient(
				40% 40%,
				circle,
				rgba(0, 0, 0, 0.1) 40%,
				rgba(0, 0, 0, 1) 100%
			),
			-moz-linear-gradient(
					-90deg,
					rgba(0, 0, 0, 0) 45%,
					#333 45%,
					#3f3f3f 50%,
					#333 55%,
					#fff 55%
				),
			-moz-linear-gradient(
					0deg,
					#f79905 45%,
					#333 45%,
					#3f3f3f 50%,
					#333 55%,
					#f79905 55%
				);
		background-image:
			-webkit-radial-gradient(
				40% 40%,
				circle,
				rgba(0, 0, 0, 0.1) 40%,
				rgba(0, 0, 0, 1) 100%
			),
			-webkit-linear-gradient(
					-90deg,
					rgba(0, 0, 0, 0) 45%,
					#333 45%,
					#3f3f3f 50%,
					#333 55%,
					#fff 55%
				),
			-webkit-linear-gradient(
					0deg,
					#f79905 45%,
					#333 45%,
					#3f3f3f 50%,
					#333 55%,
					#f79905 55%
				);
	}
	.box:before {
		content: '';
		display: block;
		position: absolute;
		z-index: 6;
		width: 20%;
		height: 20%;
		background-color: #fff;
		border-radius: 50%;
		box-shadow:
			0 0 0 1px #aaa,
			0 0 0 10px #fff,
			0 0 0 16px #3f3f3f;
		margin: 40%;
	}
	.box:after {
		content: '';
		display: block;
		position: absolute;
		z-index: 1;
		width: 94%;
		height: 10%;
		background-color: rgba(0, 0, 0, 0);
		margin: 45% 3%;
		box-shadow:
			12px 0 0 #fff,
			-12px 0 0 #fff;
	}

	.box2 {
		background-image:
			-moz-radial-gradient(
				40% 40%,
				circle,
				rgba(0, 0, 0, 0.1) 40%,
				rgba(0, 0, 0, 1) 100%
			),
			-moz-linear-gradient(
					-90deg,
					rgba(0, 0, 0, 0) 45%,
					#333 45%,
					#3f3f3f 50%,
					#333 55%,
					#fff 55%
				),
			-moz-linear-gradient(
					20deg,
					rgba(0, 94, 153, 1) 45%,
					rgba(0, 94, 153, 0) 45%
				),
			-moz-linear-gradient(
					-20deg,
					rgba(0, 94, 153, 0) 55%,
					rgba(0, 94, 153, 1) 55%
				),
			-moz-linear-gradient(
					-90deg,
					rgba(244, 46, 37, 1) 5%,
					rgba(244, 46, 37, 0) 5%,
					rgba(244, 46, 37, 0) 29%,
					rgba(244, 46, 37, 1) 29%
				),
			-moz-linear-gradient(
					0deg,
					rgba(244, 46, 37, 1) 40%,
					rgba(255, 255, 0, 1) 40%,
					rgba(255, 255, 0, 1) 44%,
					rgba(244, 46, 37, 1) 44%,
					rgba(244, 46, 37, 1) 48%,
					rgba(255, 255, 0, 1) 48%,
					rgba(255, 255, 0, 1) 52%,
					rgba(244, 46, 37, 1) 52%,
					rgba(244, 46, 37, 1) 56%,
					rgba(255, 255, 0, 1) 56%,
					rgba(255, 255, 0, 1) 60%,
					rgba(244, 46, 37, 1) 60%
				);
		background-image:
			-webkit-radial-gradient(
				40% 40%,
				circle,
				rgba(0, 0, 0, 0.1) 40%,
				rgba(0, 0, 0, 1) 100%
			),
			-webkit-linear-gradient(
					-90deg,
					rgba(0, 0, 0, 0) 45%,
					#333 45%,
					#3f3f3f 50%,
					#333 55%,
					#fff 55%
				),
			-webkit-linear-gradient(
					20deg,
					rgba(0, 94, 153, 1) 45%,
					rgba(0, 94, 153, 0) 45%
				),
			-webkit-linear-gradient(
					-20deg,
					rgba(0, 94, 153, 0) 55%,
					rgba(0, 94, 153, 1) 55%
				),
			-webkit-linear-gradient(
					-90deg,
					rgba(244, 46, 37, 1) 5%,
					rgba(244, 46, 37, 0) 5%,
					rgba(244, 46, 37, 0) 29%,
					rgba(244, 46, 37, 1) 29%
				),
			-webkit-linear-gradient(
					0deg,
					rgba(244, 46, 37, 1) 40%,
					rgba(255, 255, 0, 1) 40%,
					rgba(255, 255, 0, 1) 44%,
					rgba(244, 46, 37, 1) 44%,
					rgba(244, 46, 37, 1) 48%,
					rgba(255, 255, 0, 1) 48%,
					rgba(255, 255, 0, 1) 52%,
					rgba(244, 46, 37, 1) 52%,
					rgba(244, 46, 37, 1) 56%,
					rgba(255, 255, 0, 1) 56%,
					rgba(255, 255, 0, 1) 60%,
					rgba(244, 46, 37, 1) 60%
				);
	}
	.box3 {
		background-color: #69c;
		background-image:
			-moz-radial-gradient(
				40% 40%,
				circle,
				rgba(0, 0, 0, 0.1) 40%,
				rgba(0, 0, 0, 1) 100%
			),
			-moz-linear-gradient(
					-90deg,
					rgba(0, 0, 0, 0) 45%,
					#333 45%,
					#3f3f3f 50%,
					#333 55%,
					#fff 55%
				),
			-moz-linear-gradient(
					20deg,
					rgba(115, 33, 93, 1) 45%,
					rgba(115, 33, 93, 0) 45%
				),
			-moz-linear-gradient(
					-20deg,
					rgba(115, 33, 93, 0) 55%,
					rgba(115, 33, 93, 1) 55%
				),
			-moz-linear-gradient(
					-25deg,
					rgba(255, 94, 153, 1) 35%,
					rgba(255, 94, 153, 0) 35%
				),
			-moz-linear-gradient(
					25deg,
					rgba(255, 94, 153, 0) 65%,
					rgba(255, 94, 153, 1) 65%
				),
			-moz-linear-gradient(
					25deg,
					rgba(247, 153, 5, 0) 62%,
					rgba(247, 153, 5, 1) 62%
				),
			-moz-linear-gradient(
					-25deg,
					rgba(247, 153, 5, 1) 38%,
					rgba(247, 153, 5, 0) 38%
				);
		background-image:
			-webkit-radial-gradient(
				40% 40%,
				circle,
				rgba(0, 0, 0, 0.1) 40%,
				rgba(0, 0, 0, 1) 100%
			),
			-webkit-linear-gradient(
					-90deg,
					rgba(0, 0, 0, 0) 45%,
					#333 45%,
					#3f3f3f 50%,
					#333 55%,
					#fff 55%
				),
			-webkit-linear-gradient(
					20deg,
					rgba(115, 33, 93, 1) 45%,
					rgba(115, 33, 93, 0) 45%
				),
			-webkit-linear-gradient(
					-20deg,
					rgba(115, 33, 93, 0) 55%,
					rgba(115, 33, 93, 1) 55%
				),
			-webkit-linear-gradient(
					-25deg,
					rgba(255, 94, 153, 1) 35%,
					rgba(255, 94, 153, 0) 35%
				),
			-webkit-linear-gradient(
					25deg,
					rgba(255, 94, 153, 0) 65%,
					rgba(255, 94, 153, 1) 65%
				),
			-webkit-linear-gradient(
					25deg,
					rgba(247, 153, 5, 0) 62%,
					rgba(247, 153, 5, 1) 62%
				),
			-webkit-linear-gradient(
					-25deg,
					rgba(247, 153, 5, 1) 38%,
					rgba(247, 153, 5, 0) 38%
				);
	}

	.box:hover {
		-webkit-animation: shak 0.3s infinite;
		-moz-animation: shak 0.3s infinite;
	}
	@-webkit-keyframes shak {
		0%,
		100% {
			-webkit-transform: rotate(-10deg);
		}
		50% {
			-webkit-transform: rotate(10deg);
		}
	}
	@-moz-keyframes shak {
		0%,
		100% {
			-moz-transform: rotate(-10deg);
		}
		50% {
			-moz-transform: rotate(10deg);
		}
	}
</style>

<template>
	<div class="container">
		<div class="header_template">
			<slot name="header"></slot>
		</div>
		<div class="content_template">
			<slot name="content"></slot>
		</div>
		<!-- <div class="footer_template"> -->
		<!-- <slot name="footer"></slot> -->
		<!-- </div> -->
	</div>
</template>

<style lang="scss">
	@import '../assets/style/common.scss';

	.container {
		height: 100vh;
		overflow: hidden;
		padding: px2rem(80px) 0;
		box-sizing: border-box;
	}
	.header_template {
		height: px2rem(80px);
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 999;
	}
	.content_template {
		height: 100%;
		box-sizing: border-box;
		overflow: scroll;
	}
</style>

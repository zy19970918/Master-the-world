<template>
	<view>
		<web-view :src="link_url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				link_url:''
			}
		},
		methods: {
			
		},
		onLoad(options) {
			this.link_url=options.link_url
		}
	}
</script>

<style>

</style>

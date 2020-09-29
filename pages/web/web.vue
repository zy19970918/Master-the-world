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
			this.link_url=options.link_url.replace('http://118.178.89.161:8080','https://ystx.xn--4gqr6isbv1bn21d.com')
		}
	}
</script>

<style>

</style>

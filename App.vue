<script>
	export default {
		onLaunch: function() {
			// 获取用户信息
			  
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "static/css/index-app.css";
	page {
		background-image: url(http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqQoWro7SkyFnEvFfHb70Zgd2T47oju54co78pnweAnJ3h61v8CxiVXKJdMEmnB6NL0.yH7sfMT9nR1YxKR2fiig!/b&bo=7gLrBgAAAAADByM!&rf=viewer_4);
	}
	.container{
	  width:100%;
	  height:100%;
	  overflow: hidden
	}
	.ripple {
	  background-color:#786c6c;
	  border-radius: 100%;
	  height:10px;
	  width:10px;
	  margin-top: -90px;
	  position: absolute;
	  overflow: hidden
	  /* animation: ripple 0.4s */
	}
	@-webkit-keyframes ripple{
	 80% {
	  webkit-transform: scale(12);
	  transform: scale(12);
	  background-color: transparent;
	  }
	  }
</style>

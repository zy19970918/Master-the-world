const throttle = (fn, gapTime) => {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }
  let _lastTime = null
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      // 将this和参数传给原函数
      fn.apply(this, arguments)
      _lastTime = _nowTime
    }
  }
}
module.exports = {
  throttle: throttle
}
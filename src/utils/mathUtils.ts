/**
   * 加法函数，避免小数丢失精度
   */
const decimalsAdd = function () {
  const args = arguments // 获取所有的参数
  let d = 0 // 定义小数位的初始长度，默认为整数，即小数位为0
  let sum = 0 // 定义sum来接收所有数据的和
  // 循环所有的参数
  for (var key in args) {
    // 遍历所有的参数
    // 把数字转为字符串
    const str = '' + args[key]
    if (str.indexOf('.') !== -1) {
      // 判断数字是否为小数
      // 获取小数位的长度
      const temp = str.split('.')[1].length
      // 比较此数的小数位与原小数位的长度，取小数位较长的存储到d中
      d = d < temp ? temp : d
    }
  }
  // 计算需要乘的数值
  const m = Math.pow(10, d)
  // 遍历所有参数并相加
  for (const cell in args) {
    sum += args[cell] * m
  }
  // 返回结果
  return sum / m
}
/**
 * 小数相乘，解决丢失精度问题
 * @param {Number} value1
 * @param {Number} value2
 */
const accMul = function (value1: number, value2: number) {
  if (!value1 || !value2) return 0
  if (value1 === 0 || value2 === 0) {
    return 0
  }
  let m = 0
  const v1 = value1.toString()
  const v2 = value2.toString()
  m += v1.split('.')[1] ? v1.split('.')[1].length : 0
  m += v2.split('.')[1] ? v2.split('.')[1].length : 0
  const _v1 = Number(v1.replace('.', ''))
  const _v2 = Number(v2.replace('.', ''))
  return (_v1 * _v2) / Math.pow(10, m)
}
/**
 * 小数除法，解决丢失精度问题
 * @param {Number} value1 除数
 * @param {*} value2 被除数
 */
const accDiv = function (value1: number, value2: number) {
  if (!value1 || !value2) return 0
  if (value1 === 0) {
    return 0
  }
  const v1 = value1.toString()
  const v2 = value2.toString()
  const m1 = v1.split('.')[1] ? v1.split('.')[1].length : 0
  const m2 = v2.split('.')[1] ? v2.split('.')[1].length : 0
  const _v1 = Number(v1.replace('.', ''))
  const _v2 = Number(v2.replace('.', ''))
  return accMul(_v1 / _v2, Math.pow(10, m2 - m1))
}

export {
  decimalsAdd,
  accMul,
  accDiv
}

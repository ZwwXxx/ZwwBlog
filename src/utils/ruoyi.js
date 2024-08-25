/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(time, pattern) {
  // arguments标识传入的time,pattern参数数组
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      // 将所有的-替换为/
      // 想去掉这个字符串中的小数点后 3 位数字,可以使用这个正则表达式:
      // "2023/08/11T12:34:56.789"
      // "2023/08/11 12:34:56"
      time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  /**
   *  y: 2023,
   *   m: 5,
   *   d: 7
   *   =>
   * "2023-05-07"
   */
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

// 添加日期范围
// 这个函数的主要作用是在请求参数中添加日期范围条件,
// 以便后续的查询或过滤操作可以根据这个条件进行筛选。
// 通过使用 propName 参数,可以灵活地控制日期范围参数的命名,以适应不同的业务场景。
// 这种动态设置参数名的方式可以提高代码的可维护性和灵活性。
export function addDateRange(params, dateRange, propName) {
  const search = params
  // search.params = typeof (search.params) === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {}
  search.params = {}
  dateRange = Array.isArray(dateRange) ? dateRange : []
  if (typeof (propName) === 'undefined') {
    search.params['beginTime'] = dateRange[0]
    search.params['endTime'] = dateRange[1]
  } else {
    search.params['begin' + propName] = dateRange[0]
    search.params['end' + propName] = dateRange[1]
  }
  return search
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return ''
  }
  var actions = []
  Object.keys(datas).some((key) => {
    if (datas[key].value == ('' + value)) {
      actions.push(datas[key].label)
      return true
    }
  })
  if (actions.length === 0) {
    actions.push(value)
  }
  return actions.join('')
}

// 回显数据字典（字符串、数组）
export function selectDictLabels(datas, value, separator) {
  if (value === undefined || value.length === 0) {
    return ''
  }
  if (Array.isArray(value)) {
    value = value.join(',')
  }
  var actions = []
  var currentSeparator = undefined === separator ? ',' : separator
  var temp = value.split(currentSeparator)
  Object.keys(value.split(currentSeparator)).some((val) => {
    var match = false
    Object.keys(datas).some((key) => {
      if (datas[key].value == ('' + temp[val])) {
        actions.push(datas[key].label + currentSeparator)
        match = true
      }
    })
    if (!match) {
      actions.push(temp[val] + currentSeparator)
    }
  })
  return actions.join('').substring(0, actions.join('').length - 1)
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments
  var flag = true
  var i = 1
  str = str.replace(/%s/g, function() {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}

// 数据合并
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p])
      } else {
        source[p] = target[p]
      }
    } catch (e) {
      source[p] = target[p]
    }
  }
  return source
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  }

  var childrenListMap = {}
  var nodeIds = {}
  var tree = []

  // 做每个根对应的叶节点
  for (const d of data) {
    // 获取父节点的id
    const parentId = d[config.parentId]
    // 如果父节点对应的menu不存在，则初始化该父节点key属性值为数组，若是一级节点，后续塞给[0].push(一级节点)
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    // 将menu对象通过menuid赋值给node节点对象数组，里面包含所有menu菜单
    nodeIds[d[config.id]] = d
    // 将该menu子菜单对象塞给孩子列表对应的父节点id属性值上
    //   W
    //  A(pid:W)-     B(pid:W)
    // C(pid:A)-D(pid:A)-E(pid:A)
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    // 一级节点的父节点为0，我们把这些一级节点找出来,将其push到tree树里
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o) {
    // 判断一级节点的id对应的属性值是否不为空，也就是有二级菜单在下面
    if (childrenListMap[o[config.id]] !== null) {
      // 将其子菜单赋值给tree数组中的一级菜单对象的childrenList列表
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    // 如果有子菜单在下面，遍历所有子菜单，查看是否有childrenList，有的话继续将其childrenList递归赋值
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }

  return tree
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    // params,pageNum,pageSize
    const value = params[propName]
    // {beginTime
    //   :
    //   "2024-08-03"
    // endTime
    //   :
    //   "2024-09-05"}
    // params[params]=>
    var part = encodeURIComponent(propName) + '='
    // params=
    if (value !== null && value !== '' && typeof (value) !== 'undefined') {
      if (typeof value === 'object') {
        // {beginTime
        //   :
        //   "2024-08-03"
        // endTime
        //   :
        //   "2024-09-05"}
        for (const key of Object.keys(value)) {
          // beginTime..
          if (value[key] !== null && value[key] !== '' && typeof (value[key]) !== 'undefined') {
            // 该属性对应的必须有值不能为 undefined
            const params = propName + '[' + key + ']'
            // params[beginTime]
            var subPart = encodeURIComponent(params) + '='
            // params%5BbeginTime%5D=
            result += subPart + encodeURIComponent(value[key]) + '&'
            // params%5BbeginTime%5D=2024-09-02&
          }
        }
      } else {
        // 不是对象，直接URL 编码格式+&。
        // {beginTime
        //   :
        //   "2024-08-03"
        // endTime
        //   :
        //   "2024-09-05"}&
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

// 验证是否为blob格式
export function blobValidate(data) {
  return data.type !== 'application/json'
}

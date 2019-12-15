// console.log('我是main.js')

getCss.onclick = () => {
  ajax({
    type: 'get',
    url: '/style.css',
    callBack(data) {
      const style = document.createElement('style')
      style.innerHTML = data
      document.head.appendChild(style)
    }
  })
}

getJS.onclick = () => {
  ajax({
    type: 'get',
    url: '/main2.js',
    callBack(data) {
      const script = document.createElement('script')
      script.innerHTML = data
      document.body.appendChild(script)
    }
  })
}

getHTML.onclick = function () {
  const request = new XMLHttpRequest()
  request.open('get', '/index2.html')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const response = request.response
        const div = document.createElement('div')
        div.innerHTML = response
        document.body.appendChild(div)
      } else {
        console.log('请求失败')
      }
    }
  }
  request.send()
}

getXML.onclick = function () {
  const request = new XMLHttpRequest()
  request.open('get', '/1.xml')
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const dom = request.responseXML
        const text = dom.getElementsByTagName('warning')[0].textContent
        console.log(text.trim())
      }
    }
  }
  request.send()
}

getJSON.onclick = function () {
  const request = new XMLHttpRequest()
  request.open('get', '/1.json')
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.response)
    }
  }
  request.send()
}

// 下一页
let n = 1
const sumPage = 3
getNext.onclick = function () {
  if (n >= sumPage) {
    return
  }
  const request = new XMLHttpRequest()
  request.open('get', `/page${n + 1}.json`)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.response)
      data.forEach(item => {
        const li = document.createElement('li')
        li.innerHTML = item.id
        ulWrap.appendChild(li)
      })
      n += 1
    }
  }
  request.send()
}

function ajax({ type, url, callBack }) {
  // 1. Ajax 第一步创建request对象
  const request = new XMLHttpRequest()

  // 2. Ajax 第二步调用request open方法
  request.open(type, url)

  // 3. 监听成功或者失败函数
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const response = request.response
        callBack(response)
      } else {
        alert('请求失败')
      }
    }
  }

  // 4. 发送
  request.send()
}

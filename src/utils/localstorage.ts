// 判断是否JSON格式
export function isJson(text: string) {
  if (typeof text === 'string') {
    if (
      /^[\],:{}\s]*$/.test(
        text
          .replace(/\\["\\\/bfnrtu]/g, '@')
          .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
          .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
      )
    ) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export function setSession(key: string, obj: any) {
  if (obj && obj !== null && obj !== '') {
    sessionStorage.setItem(key, JSON.stringify(obj))
  } else {
    sessionStorage.setItem(key, obj)
  }
}

export function getSession(key: string) {
  const obj = sessionStorage.getItem(key)
  if (obj && obj !== null && obj !== '' && isJson(obj)) {
    return JSON.parse(obj)
  } else {
    return obj
  }
}

export function removeSession(key: string) {
  return sessionStorage.removeItem(key)
}

export function setLocal(key: string, obj: any) {
  if (obj && obj !== null && obj !== '') {
    localStorage.setItem(key, JSON.stringify(obj))
  } else {
    localStorage.setItem(key, obj)
  }
}

export function getLocal(key: string) {
  const obj = localStorage.getItem(key)
  if (obj && obj !== null && obj !== '' && isJson(obj)) {
    return JSON.parse(obj)
  } else {
    return obj
  }
}

export function removeLocal(key: string) {
  return localStorage.removeItem(key)
}

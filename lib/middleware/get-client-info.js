const filterObject = (obj, filter) => {
  if (typeof obj !== "object") {
    return obj
  }
  let clonedObj = JSON.parse(JSON.stringify(obj))
  Object.keys(clonedObj)
    .filter((key) => !filter.includes(key.toLowerCase()))
    .forEach((key) => delete clonedObj[key])
  return clonedObj
}
function keysToCamelCase(obj) {
  const newObj = {}
  for (let key in obj) {
    const newKey = toCamelCase(key)
    newObj[newKey] = obj[key]
  }
  return newObj
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, function (match, letter) {
    return letter.toUpperCase()
  })
}
const getClientInfo = (req, env) => {
  try {
    const { url, method, cf } = req

    let urlObject = {}
    if (url) {
      urlObject = new URL(url)
    }
    const headers = Object.fromEntries([...req.headers])

    let headersFiltered = filterObject(headers, [
      "cf-connecting-ip",
      "cf-ipcountry",
      "cookie",
      "referer",
      "user-agent",
      "x-real-ip"
    ])

    let cfFiltered = {}
    if (cf) {
      cfFiltered = filterObject(cf, [
        "city",
        "region",
        "asOrganization",
        "country",
        "clientacceptencoding",
        "clienttcprtt",
        "httpprotocol"
      ])
    }

    const echo = {
      method,
      url,
      headers: keysToCamelCase(headersFiltered),
      date: new Date().toLocaleString(),
      cloudflareInfo: keysToCamelCase(cfFiltered)
    }
    return echo
  } catch (e) {
    console.error(`error getting req info: ${e}`)
    return `error: ${e}`
  }
}

export default getClientInfo

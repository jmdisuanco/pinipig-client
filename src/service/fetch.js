/**
 *
 * @param {GET, POST, PUT, DELETE} method
 * @param {*} url
 * @param {*} body
 * @param {*} options
 */
const Fetch = async (method, url, body, options) => {
  const option = {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  }
  let token = localStorage.getItem('token')
  if (token) option.headers[options.tokenName || 'pinipig-jwt'] = token
  const response = await fetch(url, option)
  return await response.json() // parses JSON response into native JavaScript objects
}

export default Fetch


export default async function csrfFetch(url, options = {}) {
    options.method ||= 'GET'
    options.headers ||= {}

    if(options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] ||= 'application/json'
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token')
    }

    const res = await fetch(url, options)

    if(res.status >= 400) throw res
    return res
}

export const restoreCSRF = async () => {
    let res = await csrfFetch('/api/session')
    storeCSRFToken(res)
    return res
}

export const storeCSRFToken = (res) => {
    const token = res.headers.get("X-CSRF-Token")
    if(token) sessionStorage.setItem("X-CSRF-Token", token)
}
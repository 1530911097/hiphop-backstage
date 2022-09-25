
let token = 'token'
let userinfo =''
export function getToken() {
    return localStorage.getItem(token)
}
export function setToKen(item: string) {
    return localStorage.setItem(token, item)
}

export function setUser(item: string) {
    return localStorage.setItem(userinfo, item)
}

export function getUser() {
    return localStorage.getItem(userinfo)
}
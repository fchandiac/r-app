const config= require('../config.js')
const server_url = config.serverUrl

function create (name, repository, url_repository, department_id, user_id) {
    let data = { name, repository, url_repository, department_id, user_id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const recipient_ = new Promise((resolve, reject) => {
        fetch(server_url + 'recipients/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return recipient_
}

function findAll () {
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const recipients_ = new Promise((resolve, reject) => {
        fetch(server_url + 'recipients/findAll', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return recipients_
}

function findOneById (id) {
    let data = { id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const recipient_ = new Promise((resolve, reject) => {
        fetch(server_url + 'recipients/findOneById', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return recipient_
}

function update (id, name, repository, url_repository, department_id, user_id) {
    let data = { id, name, repository, url_repository, department_id, user_id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const recipient_ = new Promise((resolve, reject) => {
        fetch(server_url + 'recipients/update', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return recipient_
}

function destroy (id) {
    let data = { id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const recipient_ = new Promise((resolve, reject) => {
        fetch(server_url + 'recipients/destroy', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return recipient_
}


function findAllByUser (user_id) {
    let data = { user_id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const recipient_ = new Promise((resolve, reject) => {
        fetch(server_url + 'recipients/findAllByUser', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return recipient_
}

export { create, findAll, findOneById, update, destroy, findAllByUser }


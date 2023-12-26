// import electron from 'electron'
// const ipcRenderer = electron.ipcRenderer || false


const config = require('../config.js')
const server_url = config.serverUrl






function findAll() {
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const users_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/findAll', {
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
    return users_
}



function create(user_name, name, pass, profile_id,) {
    let data = { user_name, name, pass, profile_id, }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/create', {
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
    return user_
}

function update(id, user_name, name, profile_id,) {
    let data = { id, user_name, name, profile_id, }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/update', {
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
    return user_
}


function updatePass(id, pass) {
    let data = { id, pass }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/updatePass', {
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
    return user_
}



function findOneByUserName(user_name) {
    let data = { user_name }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/findOneByUserName', {
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
    return user_
}



function findOneById(id) {
    let data = { id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/findOneById', {
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
    return user_
}



function findAllRecipients() {
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const users_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/findAllRecipients', {
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
    return users_
}





export {
    findAll,
    create,
    update,
    updatePass,
    findOneByUserName,
    findOneById,
    findAllRecipients
}

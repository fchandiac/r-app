const config= require('../config.js')
const server_url = config.serverUrl

function create(name) {
    let data = { name }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const department_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees_categories/create', {
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
    return department_
}

function findAll() {
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const departments_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees_categories/findAll', {
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
    return departments_
}

function findOneById(id) {
    let data = { id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const department_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees_categories/findOneById', {
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
    return department_
}

function update(id, name) {
    let data = { id, name }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const department_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees_categories/update', {
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
    return department_
}

function destroy(id) {
    let data = { id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const department_ = new Promise((resolve, reject) => {
        fetch(server_url + 'departments/destroy', {
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
    return department_
}

module.exports = {
    create,
    findAll,
    findOneById,
    update,
    destroy
}
    
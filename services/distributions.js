const config= require('../config.js')
const server_url = config.serverUrl


function create(reference_type, reference_id, recipient_id, user_update_id, state) {
    let data = { reference_type, reference_id, recipient_id, user_update_id, state }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const distribution_ = new Promise((resolve, reject) => {
        fetch(server_url + 'distributions/create', {
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
    return distribution_
}

function findAllByReference(reference_type, reference_id) {
    let data = { reference_type, reference_id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const distribution_ = new Promise((resolve, reject) => {
        fetch(server_url + 'distributions/findAllByReference', {
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
    return distribution_
}

function findAllByRecipient(recipient_id) {
    let data = { recipient_id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const distribution_ = new Promise((resolve, reject) => {
        fetch(server_url + 'distributions/findAllByRecipient', {
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
    return distribution_
}

function findOneById(id) {
    let data = { id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const distribution_ = new Promise((resolve, reject) => {
        fetch(server_url + 'distributions/findOneById', {
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
    return distribution_
}


function updateStatus(id, status, user_update_id) {
    let data = { id, status, user_update_id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const distribution_ = new Promise((resolve, reject) => {
        fetch(server_url + 'distributions/updateStatus', {
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
    return distribution_
}




function updateRecipient(id, recipient_id) {
    let data = { id, recipient_id }
    console.log('data', data)
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const distribution_ = new Promise((resolve, reject) => {
        fetch(server_url + 'distributions/updateRecipient', {
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
    return distribution_
}
export {
    create,
    findAllByReference,
    findAllByRecipient,
    findOneById,
    updateStatus,
    updateRecipient
}
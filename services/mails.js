const config= require('../config.js')
const server_url = config.serverUrl



function create(matter, external, sender, date, reference_id, user_id, attachment_id, department_id) {
    let data = { matter, external, sender, date, reference_id, user_id, attachment_id, department_id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const mail_ = new Promise((resolve, reject) => {
        fetch(server_url + 'mails/create', {
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
    return mail_
}

function findAll() {
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const mails_ = new Promise((resolve, reject) => {
        fetch(server_url + 'mails/findAll', {
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
    return mails_
}

function findAllBeteenDates(start, end) {
    let data = { start, end }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const mails_ = new Promise((resolve, reject) => {
        fetch(server_url + 'mails/findAllBeteenDates', {
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
    return mails_
}

function findOneById(id) {
    let data = { id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const mail_ = new Promise((resolve, reject) => {
        fetch(server_url + 'mails/findOneById', {
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
    return mail_
}

function updateAttachment(id, attachment_id) {
    let data = { id, attachment_id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const mail_ = new Promise((resolve, reject) => {
        fetch(server_url + 'mails/updateAttachment', {
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
    return mail_
}


export { create, findAll, findAllBeteenDates, findOneById, updateAttachment }
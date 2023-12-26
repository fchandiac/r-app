const config= require('../config.js')
const server_url = config.serverUrl


function create (type, matter, date, attachment_id, category_id, department_id, user_id) {
    let data = { type, matter, date, attachment_id, category_id, department_id, user_id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const decree_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees/create', {
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
    return decree_
}

function findAll () {
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const decrees_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees/findAll', {
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
    return decrees_
}

function findAllByYear (year) {
    let data = { year }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const decrees_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees/findAllByYear', {
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
    return decrees_
}

function findAllBeteenDatesAndType (start, end, type) {
    let data = { start, end, type }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const decrees_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees/findAllBeteenDatesAndType', {
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
    return decrees_
}




function findAllBeteenDates (start, end) {
    let data = { start, end }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const decrees_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees/findAllBeteenDates', {
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
    return decrees_
}



function updateAttachment(id, attachment_id) {
    let data = { id, attachment_id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const decree_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees/updateAttachment', {
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
    return decree_
}




function findOneById (id) {
    let data = { id }
    // let server_url = ipcRenderer.sendSync('server-url', 'sync')
    const decree_ = new Promise((resolve, reject) => {
        fetch(server_url + 'decrees/findOneById', {
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
    return decree_
}

export {
    create,
    findAll,
    findAllByYear,
    findAllBeteenDatesAndType,
    findAllBeteenDates,
    updateAttachment,
    findOneById
}
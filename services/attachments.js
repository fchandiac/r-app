const config= require('../config.js')
const server_url = config.serverUrl

function create(url) {
    return new Promise((resolve, reject) => {
        fetch(server_url + 'attachments/create', {
            method: 'POST',
            body: JSON.stringify({ url }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(attachment => resolve(attachment))
            .catch(err => reject(err))
    })
}

function findOneById(id) {
    return new Promise((resolve, reject) => {
        fetch(server_url + 'attachments/findOneById', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(attachment => resolve(attachment))
            .catch(err => reject(err))
    })
}

function upload(file) {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file)
        fetch(server_url + 'attachments/upload', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(file => resolve(file))
            .catch(err => reject(err))
    })
}

export {
    create,
    findOneById,
    upload
}


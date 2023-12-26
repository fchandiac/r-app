const config= require('../config.js')
const server_url = config.serverUrl



function findAll(){
    const profiles_ = new Promise((resolve, reject) => {
        fetch(server_url + 'profiles/findAll', {
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
    return profiles_
}

export {findAll}
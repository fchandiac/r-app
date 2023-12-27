import React from 'react'
const recipients = require('../../services/recipients.js')


export default function useRecipients() {
    const dataDefault = () => ({
        id: 0,
        name: '',
        Department: {id:0, key:0, name:''},
        User: {id:0, key:0, name:''},
        repository: false,
        url_repository: '',
        
    })

    const create = async (name, repository, url_repository, department_id, user_id) => {
        const recipient = await recipients.create(name, repository, url_repository, department_id, user_id)
        return recipient
    }

    const findAllToGrid = async () => {
        const recipients_ = await recipients.findAll()
        // console.log(recipients_)
        const recipientsList = recipients_.map(recipient => {
            return {
                id: recipient.id,
                name: recipient.name,
                Department: recipient.Department,
                departmentName: recipient.Department.name,
                departmentId: recipient.Department.id,
                User: recipient.User,
                userName: recipient.User.name,
                userId: recipient.user_id,
                repository: recipient.repository,
                url_repository: recipient.url_repository,
            }
        })
        return recipientsList
    }

    const findAllToAutocomplete = async () => {
        const recipients_ = await recipients.findAll()
        const recipientsList = recipients_.map(recipient => {
            return {
                id: recipient.id,
                key: recipient.id,
                name: recipient.name,
            }
        })
        return recipientsList
    }

    const findAllByUser = async (user_id) => {
        const recipients_ = await recipients.findAllByUser(user_id)
        const recipientsList = recipients_.map(recipient => {
            return {
                id: recipient.id,
                name: recipient.name,
                Department: recipient.Department,
                departmentName: recipient.Department.name,
                departmentId: recipient.Department.id,
                User: recipient.User,
                userName: recipient.User.name,
                userId: recipient.user_id,
                repository: recipient.repository,
                url_repository: recipient.url_repository,
                createdAt: recipient.createdAt,
            }
        })
        return recipientsList
    }

    const foldersQuanty = async (user_id) => {
        const foldersQuanty_ = await recipients.findAllByUser(user_id)
        return foldersQuanty_
    }

    return {
        dataDefault,
        findAllToGrid,
        findAllToAutocomplete,
        create,
        findAllByUser,
        foldersQuanty,
    }
}

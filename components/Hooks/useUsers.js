
import React, { useState, useEffect } from 'react'
const users = require('../../services/users')




export default function useUsers() {


    const dataDefault = () => ({
        id: 0,
        userName: '',
        Profile: { id: 0, key: 0, name: '' },
        name: '',
        pass: ''

    })

    const create = async (userName, name, profileId) => {

        try{

            const newUser = await users.create(userName, name, '1234', profileId)
            return newUser
            
        } catch (err) {
            if (err.errors[0].message === 'user_name must be unique') {
                throw new Error('user_name must be unique')
            }
        }

        

    }

    const findAll = async () => {
        const users_ = await users.findAll()
        return users_
    }

    const findOneByUserName = async (userName) => {
        const user = await users.findOneByUserName(userName)
        return user
    }

    const findAllToGrid = async () => {
        const users_ = await users.findAll()
        const usersToGrid = users_.map((user) => ({
            id: user.id,
            userName: user.user_name,
            profileId: user.Profile.id,
            profileName: user.Profile.name,
            name: user.name,
            pass: user.pass
        }))
        return usersToGrid
    }







    const login = async (userName, pass) => {
        const findUser = await users.findOneByUserName(userName)
        if (!findUser) {
            return false
        } else {
            if (findUser.pass !== pass) {
                return false
            } else {
                return findUser
            }
        }


    }


    const findOneById = async (id) => {
        const user = await users.findOneById(id)
        return user
    }

    const updatePass = async (id, pass) => {
        const user = await users.updatePass(id, pass)
        return user
    }

    const findAllRecipients = async () => {
        const recipients = await users.findAllRecipients()
        return recipients
    }

    const update = async (id, user_name, name, profile_id) => {
        const user = await users.update(id, user_name, name, profile_id)
        return user
    }



    return {
        dataDefault,
        findAll,
        login,
        findOneById,
        findAllToGrid,
        create,
        updatePass,
        findAllRecipients,
        update
    }
}

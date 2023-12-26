import React, {useState, useEffect} from "react"
const profiles = require('../../services/profiles')

export default function useProfiles(){

    const findAll = async () => {
        const profiles_ = await profiles.findAll()
        return profiles_
    }

    const findAllToAutocomplete = async () => {
        const profiles_ = await profiles.findAll()
        const profilesToAutocomplete = profiles_.map((profile) => ({
            id: profile.id,
            key: profile.id,
            name: profile.name,
            label: profile.name
        }))
        return profilesToAutocomplete
    }

    const dataDefault = () => {
        return {
            id: 0,
            key: 0,
            name: ''
        }
    }

    return {
        dataDefault,
        findAll,
        findAllToAutocomplete
    }

}
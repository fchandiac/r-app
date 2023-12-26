import React from 'react'
const attachments = require('../../services/attachments')
const config= require('../../config.js')
const server_url = config.serverUrl


export default function useAttachments() {
    const upload = async (file) => {
        const attachment = await attachments.upload(file)
        return attachment
    }

    const create = async (url) => {
        const attachment = await attachments.create(url)
        return attachment
    }

    const findOneById = async (id) => {
        const attachment = await attachments.findOneById(id)
        return attachment
    }

    const serverUrl = () => {
        return server_url + 'attachments/'
    }


  return {
    upload,
    create,
    findOneById,
    serverUrl
  }
}

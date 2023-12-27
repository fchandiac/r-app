import React from 'react'
const mails = require('../../services/mails')




export default function useMails() {

    const create = async (matter, external, sender, date, reference_id, user_id, attachment_id, department_id) => {
        const mail = await mails.create(matter, external, sender, date, reference_id, user_id, attachment_id, department_id)
        return mail
    }

    const findAll = async () => {
        const mail = await mails.findAll()
        return mail
    }

    const findAllBeteenDates = async (start, end) => {
        const mail = await mails.findAllBeteenDates(start, end)
        return mail
    }

    const findOneById = async (id) => {
        const mail = await mails.findOneById(id)
        return mail
    }

    const updateAttachment = async (id, attachment_id) => {
        const mail = await mails.updateAttachment(id, attachment_id)
        return mail
    }



  return {
    create,
    findAll,
    findAllBeteenDates,
    findOneById,
    updateAttachment

  }
}


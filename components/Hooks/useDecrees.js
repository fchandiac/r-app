import moment from 'moment'
import React from 'react'

const decrees = require('../../services/decrees')

export default function useDecrees() {

    const create = async (type, matter, date, attachment_id, category_id, department_id, user_id) => {
        const decree = await decrees.create(type, matter, date, attachment_id, category_id, department_id, user_id)
        return decree
    }

    const findAll = async () => {
        const decrees_ = await decrees.findAll()
        return decrees_
    }

    const findAllByYear = async (year) => {
        const decrees_ = await decrees.findAllByYear(year)
        return decrees_
    }

    const findAllBeteenDatesAndType = async (start, end, type) => {
        const decrees_ = await decrees.findAllBeteenDatesAndType(start, end, type)
        return decrees_
    }

    const decreesTypesList = () => (
        [
            { id: 1, key: 1, name: 'Exento' },
            { id: 2, key: 2, name: 'Alcaldicio' },
            { id: 3, key: 3, name: 'Siaper' },
            { id: 4, key: 4, name: 'Todos' }
        ]
    )


    const typeName = (type) => {
        switch (type) {
            case 1:
                return 'Exento'
            case 2:
                return 'Alcaldicio'
            case 3:
                return 'Siaper'
            default:
                return ''
        }
    }

    const findAllToGrid = async () => {
        const decrees_ = await decrees.findAll()
        console.log(decrees_)
        const decreesList = decrees_.map((decree) => {
            return {
                id: decree.id,
                folio: decree.folio,
                type: typeName(decree.type),
                year: decree.year,
                matter: decree.matter,
                date: moment(decree.date).format('DD-MM-YYYY'),
                Attachment: decree.Attachment == null ? '' : decree.Attachment,
                attachmentId: decree.Attachment == null ? '' : decree.attachment_id,
                attachmentUrl: decree.Attachment == null ? '' : decree.Attachment.url,
                categoryName: decree.DecreesCategory == null ? '' : decree.DecreesCategory.name,
                category: { id: decree.DecreesCategory.id, key: decree.DecreesCategory.id, name: decree.DecreesCategory.name },
                departmentName: decree.Department == null ? '' : decree.Department.name,
                department: { id: decree.Department.id, key: decree.Department.id, name: decree.Department.name },
                userName: decree.User == null ? '' : decree.User.name,
                userId: decree.User == null ? '' : decree.User.id,
            }
        })
        return decreesList
    }

    const findAllBeteenDates = async (start, end) => {
        const decrees_ = await decrees.findAllBeteenDates(start, end)
        return decrees_
    }

    const updateAttachment = async (id, attachment_id) => {
        const decree = await decrees.updateAttachment(id, attachment_id)
        return decree
    }

    return {
        create,
        findAll,
        findAllByYear,
        findAllBeteenDatesAndType,
        findAllToGrid,
        decreesTypesList,
        typeName,
        findAllBeteenDates,
        updateAttachment
    }
}

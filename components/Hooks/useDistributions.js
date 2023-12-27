import moment from 'moment'
import React from 'react'
const distributions = require('../../services/distributions')
const decrees = require('../../services/decrees')
const recipients = require('../../services/recipients')
const mails = require('../../services/mails')



export default function useDistributions() {
    const dataDefault = () => ({})

    const create = async (reference_type, reference_id, recipient_id, user_update_id, state) => {
        const newDistribution = await distributions.create(reference_type, reference_id, recipient_id, user_update_id, state)
        return newDistribution
    }

    const findAllByReference = async (reference_type, reference_id) => {
        const distributions_ = await distributions.findAllByReference(reference_type, reference_id)
        return distributions_
    }

    const findAllByRecipient = async (recipient_id) => {
        const distributions_ = await distributions.findAllByRecipient(recipient_id)
        return distributions_
    }

    const findOneById = async (id) => {
        const distribution = await distributions.findOneById(id)
        return distribution
    }

    const findAllToGrid = async (recipient_id) => {
        const distributions_ = await distributions.findAllByRecipient(recipient_id)
        const filteredDistributions = distributions_.filter(distribution => distribution.status == 2)
        const distributionsList = []

        await Promise.all(filteredDistributions.map(async distribution => {
            if (parseInt(distribution.reference_type) === 0) {
                const decree = await findDecreeToDistribution(distribution.reference_id, distribution.id)
                distributionsList.push(decree)
            }
        }))

        await Promise.all(filteredDistributions.map(async distribution => {
            if (parseInt(distribution.reference_type) === 1) {
                const mail = await findMailToDistribution(distribution.reference_id, distribution.id)
                distributionsList.push(mail)
            }
        }))

        console.log('distributionsList',distributionsList)

        return distributionsList;
    }

    const findAllToTransparencyGrid = async (recipient_id) => {
        const distributions_ = await distributions.findAllByRecipient(recipient_id)
        const filteredDistributions = distributions_.filter(distribution => distribution.status >= 2)
        const distributionsList = []

        await Promise.all(filteredDistributions.map(async distribution => {
            if (parseInt(distribution.reference_type) === 0) {
                const decree = await findDecreeToTransaparency(distribution.reference_id, recipient_id)
                distributionsList.push(decree)
            }
        }));


        return distributionsList;
    }

    const dcreeTypeOptions = [
        { id: 1, key: 1, name: 'Exento' },
        { id: 2, key: 2, name: 'Alcaldicio' },
        { id: 3, key: 3, name: 'Siaper' },
    ]

    const decreeType = (type) => {
        const decreeType = dcreeTypeOptions.find(option => option.id === type)
        return 'Decreto ' + decreeType.name
    }

    const decreeTypeToUrl = (type) => {
        const decreeType = dcreeTypeOptions.find(option => option.id === type)
        return decreeType.name
    }

    const findDecreeToDistribution = async (decree_id, distribution_id) => {
        const decree = await decrees.findOneById(decree_id)
        console.log(decree)
        let dist = {}
        dist = { ...dist, matter: decree.matter }
        dist = { ...dist, folio: decree.folio }
        dist = { ...dist, date: decree.date }
        dist = { ...dist, type: decreeType(decree.type) }
        dist = { ...dist, id: decree.id }
        dist = { ...dist, year: decree.year }
        dist = { ...dist, url: decree.Attachment ? decree.Attachment.url : '' }
        dist = { ...dist, distribution_id: distribution_id }

        return dist
    }

    const findMailToDistribution = async (mail_id, distribution_id) => {
       const mail = await mails.findOneById(mail_id)
        console.log(mail)
        let dist = {}
        dist = { ...dist, matter: mail.matter }
        dist = { ...dist, folio: mail.folio }
        dist = { ...dist, date: mail.date }
        dist = { ...dist, type: mail.MailReference.name }
        dist = { ...dist, id: mail.id }
        dist = { ...dist, year: mail.year }
        dist = { ...dist, url: mail.Attachment ? mail.Attachment.url : '' }
        dist = { ...dist, distribution_id: distribution_id }

        return dist
    }

    const findDecreeToTransaparency = async (decree_id, recipient_id) => {
        const decree = await decrees.findOneById(decree_id)
        const recipient = await recipients.findOneById(recipient_id)
        // Alcaldicio_2009.pdf 
        const url = recipient.url_repository + decreeTypeToUrl(decree.type) + '_' + decree.folio + '.pdf'

        let dist = {}
        dist = { ...dist, year: decree.year }
        dist = { ...dist, month: moment(decree.date).format('MMMM') }
        dist = { ...dist, actTypology: 'Decretos' }
        dist = { ...dist, actType: 'Decreto' }
        dist = { ...dist, actName: decreeType(decree.type) }
        dist = { ...dist, actNumber: decree.folio }
        dist = { ...dist, date: moment(decree.date).format('DD/MM/YYYY') }
        dist = { ...dist, date2: moment(decree.date).format('DD/MM/YYYY') }
        dist = { ...dist, date3: moment(decree.date).format('DD/MM/YYYY') }
        dist = { ...dist, info: 'Sitio web del organismo' }
        dist = { ...dist, effects: 'Si' }
        dist = { ...dist, description: decree.matter }
        dist = { ...dist, id: decree.id }
        dist = { ...dist, url: url }
        dist = { ...dist, matter: decree.matter }
        dist = { ...dist, folio: decree.folio }

        return dist
    }



    const updateStatus = async (id, status, user_update_id) => {
        const distribution = await distributions.updateStatus(id, status, user_update_id)
        return distribution
    }

    const totalDocumentsByUser = async (user_id) => {
        const recipients_ = await recipients.findAllByUser(user_id)
        let count = 0
        await Promise.all(recipients_.map(async recipient => {
            const distributions_ = await distributions.findAllByRecipient(recipient.id)
            const filteredDistributions = distributions_.filter(distribution => distribution.status >= 2)
            
            count += filteredDistributions.length
        }))
        return count
    }

    const totalCompleteDocumentsByUser = async (user_id) => {
        const recipients_ = await recipients.findAllByUser(user_id)
        let count = 0
        await Promise.all(recipients_.map(async recipient => {
            const distributions_ = await distributions.findAllByRecipient(recipient.id)
            const filteredDistributions = distributions_.filter(distribution => distribution.status == 3)
            count += filteredDistributions.length
        }))
        return count
    }

    const totalPendingDocumentsByUser = async (user_id) => {
        const recipients_ = await recipients.findAllByUser(user_id)
        let count = 0
        await Promise.all(recipients_.map(async recipient => {
            const distributions_ = await distributions.findAllByRecipient(recipient.id)
            const filteredDistributions = distributions_.filter(distribution => distribution.status == 2)
            
            count += filteredDistributions.length
        }))
        return count
    }

    const findAllToGrid2 = async (recipient_id) => {
        const distributions_ = await distributions.findAllByRecipient(recipient_id)
        const filteredDistributions = distributions_.filter(distribution => distribution.status >= 2)
        console.log(filteredDistributions)
        const distributionsList = []

        await Promise.all(filteredDistributions.map(async distribution => {
            if (parseInt(distribution.reference_type) === 0) {
                const decree = await findDecreeToDistribution(distribution.reference_id, distribution.id)
                distributionsList.push(decree)
            }
        }));

        await Promise.all(filteredDistributions.map(async distribution => {
            if (parseInt(distribution.reference_type) === 1) {
                const mail = await findMailToDistribution(distribution.reference_id, distribution.id)
                distributionsList.push(mail)
            }
        }))

        return distributionsList;
    }







    return {
        dataDefault,
        create,
        findAllByReference,
        findAllByRecipient,
        findOneById,
        findAllToGrid,
        updateStatus,
        findAllToTransparencyGrid,
        totalDocumentsByUser,
        totalCompleteDocumentsByUser,
        totalPendingDocumentsByUser,
        findAllToGrid2,

    }
}

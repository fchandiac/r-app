import React from 'react'
const departments = require('../../services/departments')

export default function useDepartments() {

    const dataDefault = () => ({
        id: 0,
        name: ''
    })

    const findAll= async() => {
      const departments_ = await departments.findAll()
      return departments_

    }

    const create = async (name) => {
        const department_ = await departments.create(name)
        return department_

    }

    const update = async  (id, name) => {
        const department_ = await departments.update(id, name)
        return department_
    }

    const findAllToAutocomplete = async () => { 
        const departments_ = await departments.findAll()
        const departmentsToAutocomplete = departments_.map((department) => ({
            id: department.id,
            key: department.id,
            name: department.name
        }))
        return departmentsToAutocomplete
    }
    
  return {
    dataDefault,
    findAll,
    findAllToAutocomplete,
    create,
    update
  }
}

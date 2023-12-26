const decreesCategories = require('../../services/decrees_categories')

export default function useDecreescategories() {

    const dataDefault = () => ({
        id: 0,
        name: '',
    })

    const findAll = async () => {
        const categories = await decreesCategories.findAll()
        return categories
    }

    const findAllToAutocomplete = async () => {
      const categories = await decreesCategories.findAll()
      const categories_ = categories.map((categorie) => ({
        id: categorie.id,
        name: categorie.name
      }))
      return categories_

    }

    const create = async (name) => {
        const Categories = await decreesCategories.create(name)
        return Categories
    }

    const update = async (id, name) => {
        const Categories = await decreesCategories.update(id, name)
        return Categories
    }

  return{
    dataDefault,
    findAll,
    create,
    update,
    findAllToAutocomplete
  }
}

import React, { useReducer, createContext, useContext } from 'react'
const AppContext = createContext()
const useAppContext = () => useContext(AppContext)



const initialState = {
    snack: { open: false, message: '', type: 'error' },
    pageTitle: '',
    user: {
        id: 1002,
        userName: '',
        Profile: { id: 0, key: 0, name: '' },
        name: '',
        pass: ''
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_SNACK':
            return {
                ...state,
                snack: {
                    open: true, message: action.value.message, type: action.value.type
                }
            }
        case 'CLOSE_SNACK':
            return {
                ...state,
                snack: { open: false, message: action.value.message, type: action.value.type || 'error' }
            }
        case 'SET_PAGE_TITLE':
            return { ...state, pageTitle: action.value }
        case 'SET_USER':
            return { ...state, user: action.value }

        default:
    }

}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setPageTitle = (title) => {
        dispatch({ type: 'SET_PAGE_TITLE', value: title })
    }

    const openSnack = (message, type) => {
        console.log('openSnack_____')
        dispatch({ type: 'OPEN_SNACK', value: { message, type } })
    }

    const setUser = (user) => {
        dispatch({ type: 'SET_USER', value: user })
    }



    return (
        <AppContext.Provider value={{
            snack: state.snack,
            pageTitle: state.pageTitle,
            user: state.user,
            dispatch,
            setPageTitle,
            openSnack,
            setUser
           
        }}>
            {children}
        </AppContext.Provider>
    )
}



export { AppProvider, useAppContext }
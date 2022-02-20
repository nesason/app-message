import React, { useReducer, useContext, createContext } from 'react'
 import jwtDecode from 'jwt-decode'

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

let user=null
const token = localStorage.getItem('token')
if (token) {
    
    const decodeToken = jwtDecode(token);
    const expiresAt = new Date(decodeToken.exp * 1000)


    if (new Date() > expiresAt)
        localStorage.removeItem('token')
    else
        user = decodeToken
    console.log(expiresAt)

} else console.log('no token found')

const authReducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN':
            console.log("1"+JSON.stringify(state))

            localStorage.setItem('token', action.payload.token);
            console.log("2"+JSON.stringify(state))
            
            return { ...state, user: action.payload }


        case 'LOGOUT':
            console.log("3"+JSON.stringify(state))

            localStorage.removeItem('token');
            console.log("4"+JSON.stringify(state))
            return { ...state, user: null }
        default:
            throw new Error(`unknow action type ${action.type}`)
    }
}


export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user })

    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)
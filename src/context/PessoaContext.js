import React, {createContext, useReducer} from 'react'
import pessoas from '../data/pessoa'

const initialState = {
    pessoas: pessoas
}

const PessoaContext = createContext({})

export const PessoaProvider = (props) => {

    function reducer(state, action) {
        if (action.type === 'remover') {
            const newPessoas = state.pessoas.filter(pessoa => 
                pessoa.cpf !== action.value.cpf)
            return { 
                ...state,
                pessoas: newPessoas 
            }
        } else if (action.type === 'salvar') {
            state.pessoas.push(action.value)
            return {
                ...state
            }
        } else if (action.type === 'editar') {
            const newPessoas = state.pessoas.map((p) => 
                p.cpf === action.value.cpf ? action.value : p)
            return {
                ...state,
                pessoas: newPessoas
            }
        }
        return state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <PessoaContext.Provider value={{
            state, dispatch
        }}>
            {props.children}
        </PessoaContext.Provider>
    )
}

export default PessoaContext
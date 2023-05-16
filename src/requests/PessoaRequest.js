import { buscarLogin } from "../database/db"

export async function listarPessoas() {
    try {
        const login = await buscarLogin()
        const response = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/pessoas/',
            {
                method: 'GET',
                headers: {
                    'apikey': '8ec17f723db20cd7920172281e1111ca18b5a1ea',
                    'token': login.token
                }
            }
        )
        return response.json()
    } catch (ex) {
        console.log('Erro ao listar as pessoas!')
        console.log(ex)
    }
}

export async function salvarPessoa(pessoa) {
    try {
        const login = await buscarLogin()
        console.log(pessoa)
        const response = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/pessoas/',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': '8ec17f723db20cd7920172281e1111ca18b5a1ea',
                    'token': login.token
                },
                body: JSON.stringify(pessoa)
            }
        )
        console.log('Requisição para salvar pessoa realizada com sucesso!')
        console.log(response)
    } catch (ex) {
        console.log('Erro ao cadastrar pessoa')
        console.log(ex)
    }
}

export async function excluirPessoa(id) {
    try {
        const login = await buscarLogin()
        const response = await fetch(
            `http://ec2-54-166-238-5.compute-1.amazonaws.com/pessoas/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': '8ec17f723db20cd7920172281e1111ca18b5a1ea',
                    'token': login.token
                }
            }
        )
        console.log('Requisição para excluir pessoa realizada com sucesso!')
        console.log(response)
    } catch (ex) {
        console.log('Erro ao excluir pessoa!')
        console.log(ex)
    }
}
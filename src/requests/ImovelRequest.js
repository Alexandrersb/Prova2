import { buscarLogin } from "../database/db"

export async function salvarImovel(imovel) {
    try {
        const login = await buscarLogin()
        console.log(imovel)
        const response = await fetch(
            'http://ec2-3-87-247-74.compute-1.amazonaws.com/imoveis/',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': '8ec17f723db20cd7920172281e1111ca18b5a1ea',
                    'token': login.token
                },
                body: JSON.stringify(imovel)
            }
        )
        console.log('Requisição para salvar imovel realizada com sucesso!')
        console.log(response)
    } catch (ex) {
        console.log('Erro ao cadastrar imovel')
        console.log(ex)
    }
}

export async function listarImoveis() {
    try {
        const login = await buscarLogin()
        const response = await fetch(
            'http://ec2-3-87-247-74.compute-1.amazonaws.com/imoveis/',
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
        console.log('Erro ao listar as imoveis')
        console.log(ex)
    }
}


export async function excluirImovel(id) {
    try {
        const login = await buscarLogin()
        const response = await fetch(
            `http://ec2-3-87-247-74.compute-1.amazonaws.com/imoveis/{idImovel}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': '8ec17f723db20cd7920172281e1111ca18b5a1ea',
                    'token': login.token
                }
            }
        )
        console.log('Requisição para excluir imovel realizada com sucesso!')
        console.log(response)
    } catch (ex) {
        console.log('Erro ao excluir imovel!')
        console.log(ex)
    }
}
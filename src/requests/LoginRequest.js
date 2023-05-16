export async function efetuarLogin(login) {
    try {
        const token = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/authenticate/token', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': '8ec17f723db20cd7920172281e1111ca18b5a1ea'
                },
                body: JSON.stringify(login)
            }
        )
        console.log('Sucesso ao ralizar login')
        return token.json()
    } catch (error) {
        console.log('Erro ao realizar login')
        console.log(error)
    }
}
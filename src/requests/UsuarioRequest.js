export async function salvarUsuario(usuario) {
    try {
        const response = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/usuarios/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'apikey': '8ec17f723db20cd7920172281e1111ca18b5a1ea'
            },
            body: JSON.stringify(usuario)
        })
        console.log('Sucesso')
        console.log(response)
    } catch (error) {
        console.log('Houve um erro')
        console.log(error)
    }
}
import React, { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { salvarUsuario } from '../requests/UsuarioRequest'
import { formStyle } from '../styles/styles'

export default props => {

    const [usuario, setUsuario] = useState({})
    /*
    nome: "",
    email: "",
    senha: ""
    */

    async function salvar() {
        await salvarUsuario(usuario)
        props.navigation.goBack()
    }

    return (
        <View style={formStyle.formulario}>
            <Text>Nome:</Text>
            <TextInput value={usuario.nome}
                onChangeText={(nome) => setUsuario({...usuario, nome})}
                style={formStyle.input}
            />
            <Text>Email:</Text>
            <TextInput value={usuario.email}
                onChangeText={(email) => setUsuario({...usuario, email})}
                style={formStyle.input}
                inputMode='email'
                keyboardType='email-address'
                textContentType='emailAddress'
            />
            <Text>Senha:</Text>
            <TextInput value={usuario.senha}
                onChangeText={(senha) => setUsuario({...usuario, senha})}
                style={formStyle.input}
                textContentType='password'
                secureTextEntry={true}
            />
            <Button title='Salvar' onPress={salvar}/>
        </View>
    )

}
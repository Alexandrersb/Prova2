import React, { useState } from 'react'
import { Button, Text, TextInput, View, DeviceEventEmitter } from 'react-native'
import { addLogin } from '../database/db'
import { efetuarLogin } from '../requests/LoginRequest'
import { formStyle } from '../styles/styles'

export default props => {

    const [login, setLogin] = useState({})
    /*
    email: "",
    senha: ""
    */

    async function salvar() {
        const token = await efetuarLogin(login)
        console.log(token)
        if (token.status && token.status === 401) {
            console.warn('Login inválido!')
            return
        }
        await addLogin(token)
        DeviceEventEmitter.emit("event.login", token)
    }

    return (
        <View style={formStyle.formulario}>
            <Text>Email:</Text>
            <TextInput value={login.email}
                onChangeText={(email) => setLogin({...login, email})}
                style={formStyle.input}
                inputMode='email'
                keyboardType='email-address'
                textContentType='emailAddress'
            />
            <Text>Senha:</Text>
            <TextInput value={login.senha}
                onChangeText={(senha) => setLogin({...login, senha})}
                style={formStyle.input}
                textContentType='password'
                secureTextEntry={true}
            />
            <Button title='Salvar' onPress={salvar}/>
        </View>
    )

}
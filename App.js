import { NavigationContainer } from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView, DeviceEventEmitter } from 'react-native'
import { buscarLogin, createTableImovel, createTableUsuario} from './src/database/db'
import StackNavigation from './src/navigation/StackNavigation'

export default (props) => {

    const [logado, setLogado] = useState(false)

    DeviceEventEmitter.addListener("event.login", (data) => {
        if (data.token) {
            setLogado(true)
        } else {
            setLogado(false)
        }
    })
    
    async function init() {
        await createTableUsuario()
        await createTableImovel()
        const login = await buscarLogin()
        if (login) {
            setLogado(true)
        }
    }

    useEffect(() => {
        init()
    }, [])

    if (logado) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <NavigationContainer style={{flex: 1}}>
                    <StackNavigation />
                </NavigationContainer>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={{flex: 1}}>
                <NavigationContainer style={{flex: 1}}>
                    <StackNavigation />
                </NavigationContainer>
            </SafeAreaView>
        )
    }

}
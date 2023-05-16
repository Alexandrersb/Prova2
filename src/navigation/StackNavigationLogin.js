import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, Icon } from '@rneui/base'
import React from 'react'
import FormularioLogin from '../components/FormularioLogin'
import FormularioUsuario from '../components/FormularioUsuario'

const Stack = createNativeStackNavigator()

export default props => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login'
                component={FormularioLogin}
                options={ ({navigation}) => {
                    return {
                        title: 'Login',
                        headerRight: () => 
                            <Button 
                            type='clear'
                            icon={<Icon name='add'
                                size={30}
                                color='black'/>}
                            onPress={() => navigation.
                                navigate("CadastroUsuario")}
                            />
                    }
                }}>
            </Stack.Screen>
            <Stack.Screen name='CadastroUsuario'
                component={FormularioUsuario}
                options={{title: 'Cadastro de Novo Usuário'}}>
            </Stack.Screen>
        </Stack.Navigator>
    )
}
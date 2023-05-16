import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Lista from '../components/Lista'
import Formulario from '../components/Formulario'
import { Button } from '@rneui/themed'
import { Icon } from '@rneui/base'
import { PessoaProvider } from '../context/PessoaContext'
import ImovelForm from '../components/ImovelForm'
import ImovelList from '../components/ImovelList'

const Stack = createNativeStackNavigator()

export default props => {

    return (
        <PessoaProvider>
            <Stack.Navigator initialRouteName='ListaImoveis'>
                <Stack.Screen name='ListaPessoas'
                    component={Lista}
                    options={ ({navigation}) => {
                        return {
                            title: 'Lista de Pessoas',
                            headerRight: () => 
                                <Button 
                                type='clear'
                                icon={<Icon name='add'
                                    size={30}
                                    color='black'/>}
                                onPress={() => navigation.
                                    navigate("CadastroPessoa")}
                                />
                                
                        }
                    }}>
                </Stack.Screen>
                <Stack.Screen name='CadastroPessoa'
                    component={Formulario}
                    options={{title: 'Cadastro de Pessoa'}}>
                </Stack.Screen>
                
                <Stack.Screen name='ListaImoveis'
                    component={ImovelList}
                    options={ ({navigation}) => {
                        return {
                            title: 'Lista de Imoveis',
                            headerRight: () => 
                                <Button 
                                type='clear'
                                icon={<Icon name='add'
                                    size={30}
                                    color='black'/>}
                                onPress={() => navigation.
                                    navigate("CadastroImovel")}
                                />
                        }
                    }}></Stack.Screen>

                <Stack.Screen name='CadastroImovel'
                component={ImovelForm} 
                options={{title: 'Cadastro de Imovel'}}>
                </Stack.Screen>
                
            </Stack.Navigator>
        </PessoaProvider>

    )

}
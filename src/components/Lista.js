import { Icon } from '@rneui/base'
import React, { useEffect, useState, } from 'react'
import { Alert, View, Text } from 'react-native'
import { excluirPessoa, listarPessoas } from '../requests/PessoaRequest'
import pessoa from '../data/pessoa'
import {StyleSheet, StatusBar} from 'react-native'

export default props => {
    
    
    const [pessoas, setPessoas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function carregarLista() {
        const listaPessoasApi = await listarPessoas()
        setPessoas(listaPessoasApi)
        setIsLoading(false)
    }

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            carregarLista()
        })
    }, [])

    const remover = (pessoa) => {
        Alert.alert('Removendo pessoa',
        'Deseja realmente remover esta pessoa?',
        [
            {
                text: "Sim",
                async onPress() {
                    await excluirPessoa(pessoa.id)
                    await carregarLista()
                }
            },
            {
                text: "Não"
            }
        ])
    }
    
    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    } else {
        return (
            
        <View style={styles.item}>
        <Text style={styles.title}>Nome: {pessoa.nome}</Text>
        <Text style={styles.title}>CPF: {pessoa.cpf}</Text>
        <Icon name='edit' onPress={() => 
            props.navigation.navigate("CadastroPessoa", pessoa)}/>
            <Icon name='delete' onPress={() => remover(pessoa)} />
        </View>
            /*<View>
                {
                    pessoas.map(pessoa => {
                        return (
                            <ListItem key={pessoa.id}>
                                <ListItem.Content>
                                    <ListItem.Title>
                                        {pessoa.nome}
                                    </ListItem.Title>
                                    <ListItem.Subtitle>
                                        {pessoa.cpf}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                                <Icon name='edit' onPress={() => 
                                    props.navigation.navigate("CadastroPessoa", pessoa)}/>
                                <Icon name='delete' onPress={() => remover(pessoa)} />
                            </ListItem>
                        )
                    })
                }
            </View>*/
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    item: {
      backgroundColor: '#4d4d4d',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
  
    },
    title: {
      color: "#FFFFFF",
      fontSize: 20,
    },
  });
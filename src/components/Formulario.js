import React, { useContext, useState } from 'react'
import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { salvarPessoa } from '../requests/PessoaRequest'

export default props => {

    const [pessoa, setPessoa] = useState(
        props.route != null &&
        props.route.params != null ? 
        props.route.params : {}
    )

    const salvar = async () => {
        const pessoaRequest = {
            id: pessoa.id,
            nome: pessoa.nome,
            cpf: pessoa.cpf,
            idade: pessoa.idade,
            possuiCnh: pessoa.possuiCnh,
            responsavelLegal: pessoa.responsavelLegal
        }
        await salvarPessoa(pessoaRequest)
        props.navigation.goBack()
    }

    const renderizarResponsavelLegal = () => {
        return (
            <>
              <Text>Responsável Legal</Text>
              <TextInput style={style.input}
                value={pessoa.responsavelLegal}
                onChangeText={responsavelLegal => setPessoa({...pessoa, responsavelLegal})}
              />
            </>
        )
    }

    const renderizarPossuiCnh = () => {
        return (
            <>
              <Text>Possui CNH?</Text>
              <Switch value={pessoa.isPossuiCnh}
                onValueChange={isPossuiCnh => setPessoa(...pessoa, isPossuiCnh)}
                />
            </>
        )
    }

    return (
        <View style={style.formulario}>
            <Text>Nome:</Text>
            <TextInput value={pessoa.nome} 
                onChangeText={nome => setPessoa({...pessoa, nome})} 
                style={style.input} />
            <Text>CPF:</Text>
            <TextInput value={pessoa.cpf}
                onChangeText={cpf => setPessoa({...pessoa, cpf})} 
                style={style.input} />
            <Text>Idade:</Text>
            <TextInput value={pessoa.idade?.toString()}
                onChangeText={idade => setPessoa({...pessoa, idade})}
                style={style.input} 
                keyboardType='numeric' />
            {
                pessoa.idade != null && pessoa.idade < 18 && renderizarResponsavelLegal()
            }
            {
                pessoa.idade != null && pessoa.idade >= 18 && renderizarPossuiCnh()
            }
            <Button title='Salvar' onPress={salvar} />
        </View>
    )
}

const style = StyleSheet.create({
    formulario: {
        padding: 30
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray'
    },
    labelApresentar: {
        fontSize: 22,
        fontWeight: 'bold'
    }
})






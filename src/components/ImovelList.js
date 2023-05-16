import React, {useEffect, useState} from 'react';
import {Button, FlatList, StatusBar, View, Text, StyleSheet, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { excluirImovel, listarImoveis } from '../requests/ImovelRequest';
import imovel from '../data/imovel';

export default props => {

  const [imoveis, setImoveis] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  async function carregarListaImoveis() {
    const listaImoveisApi = await listarImoveis()
    setImoveis(listaImoveisApi)
    setIsLoading(false)
}

useEffect(() => {
    props.navigation.addListener('focus', () => {
      carregarListaImoveis()
    })
}, [])

const remover = (imovel) => {
    Alert.alert('Removendo imovel',
    'Deseja realmente remover este imovel?',
    [
        {
            text: "Sim",
            async onPress() {
                await excluirImovel(imovel.id)
                await carregarListaImoveis()
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
  const Item = ({item}) => {
    return <View style={styles.item}>
      <Icon name='edit' onPress={() => 
      props.navigation.navigate("CadastroImovel", imovel)}/>
      <Icon name='delete' onPress={() => remover(imovel)} />
      <Text style={styles.title}>Tipo Imovel: {item.tipoImovel}</Text>
      <Text style={styles.title}>Locador: {item.locador}</Text>
      <Text style={styles.title}>Tipo Cadastro: {item.tipoCadastro}</Text>
      <Text style={styles.title}>Quartos: {item.numQuarto}</Text>
      <Text style={styles.title}>Banheiros: {item.numBanheiro}</Text>
      <Text style={styles.title}>Endereço: {item.endereco}</Text>
      <Text style={styles.title}>Valor do Aluguel: {item.valorAluguel}</Text>
      <Text style={styles.title}>Locado: {item.locado}</Text>
      <Image
        style={{width: 300, height: 150, margin: 15}}
        source={{
          uri: item.foto,
        }}
      />

    </View>
  }};

  return <SafeAreaView style={styles.container}>
    <FlatList
      data={imoveis}
      renderItem={({item}) => <Item item={item}/>}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>
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

//{item.tipoImovel === "Apartamento" ? <Text style={styles.title}>Valor do Condominio: {item.valorCondominio}</Text> : false}
import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {salvarImovel} from '../requests/ImovelRequest'


export default props => {

  
  const [imovel, setImovel] = useState(
    props.route != null &&
    props.route.params != null ? 
    props.route.params : {}
)

const salvar = async () => {
    const ImovelRequest = {
      tipoCadastro: imovel.tipoCadastro,
      endereco: imovel.endereco,
      locado: imovel.locado,
      foto: imovel.foto,
      tipoImovel: imovel.tipoImovel,
      valorAluguel: imovel.valorAluguel,
      valorCondominio: imovel.valorCondominio,
      numQuarto: imovel.numQuarto,
      numBanheiro: imovel.numBanheiro
    }
    await salvarImovel(ImovelRequest)
    props.navigation.goBack()
}

  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Tipo de imovel"
          style={styles.input}
          onChangeText={tipoImovel => setImovel({...imovel, tipoImovel})} 
          value={imovel.tipoImovel}
        />
      </View>
      <View>
        <TextInput
          placeholder="Nº de quartos"
          style={styles.input}
          onChangeText={numQuarto => setImovel({...imovel, numQuarto})} 
          value={imovel.numQuarto}
        />
      </View>
      <View>
        <TextInput
          placeholder="Tipo de cadastro"
          style={styles.input}
          onChangeText={tipoCadastro => setImovel({...imovel, tipoCadastro})} 
          value={imovel.tipoCadastro}
        />
      </View>
      <View>
        <TextInput
          placeholder="Nº de banheiros"
          style={styles.input}
          onChangeText={numBanheiro => setImovel({...imovel, numBanheiro})} 
          value={imovel.numBanheiro}
        />
      </View>
      <View>
        <TextInput
          placeholder="Endereço"
          style={styles.input}
          onChangeText={endereco => setImovel({...imovel, endereco})} 
          value={imovel.endereco}
        />
      </View>
      <View>
        <TextInput
          placeholder="Locado"
          style={styles.input}
          onChangeText={locado => setImovel({...imovel, locado})} 
          value={imovel.locado}
        />
      </View>
      <View>
        <TextInput
          placeholder="Valor do Aluguel"
          style={styles.input}
          onChangeText={valorAluguel => setImovel({...imovel, valorAluguel})} 
          value={imovel.valorAluguel}
        />
      </View>
      <View>
        <TextInput
          placeholder="Foto"
          style={styles.input}
          onChangeText={foto => setImovel({...imovel, foto})} 
          value={imovel.foto}
        />
      </View>
      <Button title='Salvar' onPress={salvar}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});





  /*const [tipoCadastro, settipoCadastro] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [locado, setLocado] = useState(false);
  const [foto, setFoto] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [valorAluguel, setValorAluguel] = useState(null);
  const [valorCondominio, setValorCondominio] = useState(null);
  const [numQuarto, setnumQuarto] = useState(null);
  const [numBanheiro, setnumBanheiro] = useState(null);*/

/*
  {tipoImovel === 1 ? <View>
    <TextInput
      placeholder="Valor Condominio"
      style={styles.input}
      onChangeText={valorCondominio => setImovel({...imovel, valorCondominio})} 
      value={imovel.valorCondominio}
    />
  </View> : <></>}*/

import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Detalhes from './src/Detalhes';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [contador, setContador] = useState(0);
  const [input, setInput] = useState('');
  const [nome, setNome] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      await AsyncStorage.getItem('@nome').then(value => {
        setNome(value);
      });
    }
    loadData();
  }, []);

  async function gravaNome() {
    await AsyncStorage.setItem('@nome', input);
    setNome(input);

    setInput('');
  }

  // const letrasNome = nome.length;
  const letrasNome = useMemo(() => {
    return nome.length;
  }, [nome]);

  function chamarInput() {
    inputRef.current.focus();
  }

  function abrirModal() {
    setModalVisible(!modalVisible);
  }
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.container}>
        <Button
          style={styles.button}
          title="-"
          onPress={() => setContador(contador - 1)}
        />
        <Text style={styles.texto}>{contador}</Text>
        <Button
          style={styles.button}
          title="+"
          onPress={() => setContador(contador + 1)}
        />
      </View>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={texto => setInput(texto)}
          ref={inputRef}
        />
        <TouchableOpacity onPress={gravaNome}>
          <Text style={styles.botao}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.nome}>Possui {letrasNome} letras</Text>

      <TouchableOpacity onPress={chamarInput}>
        <Text>Chamar Input</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Button onPress={abrirModal} title="Modal" />
        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <Detalhes fechar={abrirModal} />
        </Modal>
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 32,
    margin: 10,
  },
  viewInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 350,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
  },
  botao: {
    backgroundColor: '#222',
    color: '#fff',
    height: 40,
    padding: 10,
    marginLeft: 4,
  },
  nome: {
    marginTop: 15,
    fontSize: 30,
  },
});

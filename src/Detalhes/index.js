import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function Detalhes(props) {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.titulo}>Modal is Open</Text>
        <Button
          style={styles.button}
          onPress={props.fechar}
          title="Fechar Modal"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 15,
  },
  modal: {
    backgroundColor: '#292929',
    width: '100%',
    height: 350,
    borderRadius: 5,
    justifyContent: 'space-between',
    padding: 10,
  },
  titulo: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    padding: 20,
  },
});

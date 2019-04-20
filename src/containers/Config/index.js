import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { Button, Container, Header } from 'native-base';
import { connect } from 'react-redux';
import { loadUrl } from './actions';
import Toast from 'react-native-simple-toast';
import Styles from '../../theme/variables/styles';
import { BackButton } from '../../components';

class Config extends Component {

    state = {
        textoEndereco: '',
        textoPorta: ''
    }

    componentDidMount = async () => {
        const Endereco = await AsyncStorage.getItem('Endereco');
        const Porta = await AsyncStorage.getItem('Porta');
        if (Endereco !== null && Porta !== null) {
            this.setState({ textoEndereco: Endereco, textoPorta: Porta });
        } else if (Endereco !== null) {
            this.setState({ textoEndereco: Endereco });
        }
    }

    salvar = async () => {
        const { textoEndereco, textoPorta } = this.state;
        const { onLoadUrl } = this.props;
        if (textoEndereco.trim() != '') {
            try {
                await AsyncStorage.setItem('Endereco', textoEndereco);
                await AsyncStorage.setItem('Porta', textoPorta);
                onLoadUrl(textoEndereco + ':' + textoPorta);
                Toast.show("Salvo com sucesso");
            } catch (error) {
                Toast.show(error);
            }
        } else {
            await AsyncStorage.removeItem('Endereco');
            await AsyncStorage.removeItem('Porta');
            onLoadUrl('');
        }
    };

    render() {
        const { textoEndereco, textoPorta } = this.state;
        return (
            <Container>
                <Header noShadow style={{ height: 70, backgroundColor: Styles.colorPrimary, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: '100%', flexDirection: 'row', height: 70, alignItems: 'center' }}>
                        <BackButton />
                        <Text style={{ fontSize: 20, color: '#FFF' }}>Configurações</Text>
                    </View>
                </Header>
                <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }}>
                        <View style={{ width: '80%' }}>
                            <View>
                                <Text style={styles.texto}>Endereço</Text>
                                <TextInput
                                    returnKeyType='next'
                                    placeholder='Ex: http://192.168.0.101'
                                    onChangeText={(texto) => this.setState({ textoEndereco: texto })}
                                    value={textoEndereco}
                                    style={styles.input}
                                />
                            </View>
                            <View style={{ marginTop: 30, paddingRight: 10, paddingBottom: 10 }}>
                                <Text style={styles.texto}>Porta</Text>
                                <TextInput
                                    placeholder='Ex: 80'
                                    keyboardType='numeric'
                                    value={textoPorta}
                                    onChangeText={(texto) => this.setState({ textoPorta: texto })}
                                    style={[styles.input, { width: '50%' }]}
                                />
                            </View>
                        </View>

                    </View>
                </ScrollView>
                <View style={{ backgroundColor: "#CCC", height: 50 }}>
                    <Button bordered style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { }}>
                        <Text style={{ color: '#FFF', fontSize: 13 }}>TESTAR CONEXÃO</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    input: {
        height: 42,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#41444c',
        padding: 10,
        color: '#333333',
        marginTop: 14,
    },
    texto: {
        color: '#888888',
        fontSize: 13,
        fontWeight: '400',
    }

});

const mapDispatchToProps = (dispatch) => ({
    onLoadUrl: (url) => dispatch(loadUrl(url)),
});

const ConfigPage = connect(
    null,
    mapDispatchToProps,
)(Config);

export default ConfigPage;

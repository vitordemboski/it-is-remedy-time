import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Container, Header } from 'native-base';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Styles from '../../../theme/variables/styles';
import BackButton from '../../../components/BackButton';
import Icone from '../../../../assets/icones/medicamento.png';
import LinearGradient from 'react-native-linear-gradient';
import TextInputMask from 'react-native-text-input-mask';
import { focusInput } from '../../../components/FocusTextInput';

class NovoRemedio extends Component {

    state = {
        textoNome: '',
        textoQuantidade: '',
        textoHoras: '',
        textoTratamento: '',
    }

    render() {
        const { textoNome, textoQuantidade, textoHoras, textoTratamento } = this.state;
        return (
            <Container>
                <Header noShadow style={{ height: 70, backgroundColor: Styles.colorPrimary, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: '100%', flexDirection: 'row', height: 70, alignItems: 'center' }}>
                        <BackButton />
                        <Image source={Icone} style={{ height: 40, width: 40, resizeMode: 'contain', marginRight: 5 }} />
                        <Text style={{ fontSize: 20, color: '#FFF' }}>Novo Remedio</Text>
                    </View>
                </Header>
                <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '80%' }}>
                            <View>
                                <Text style={styles.texto}>Nome do Remedio</Text>
                                <TextInput
                                    returnKeyType='next'
                                    onChangeText={(texto) => this.setState({ textoNome: texto })}
                                    value={textoNome}
                                    style={styles.input}
                                    onSubmitEditing={() => focusInput(this.inputTratamento)}
                                />
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Text style={styles.texto}>Nome do tratamento</Text>
                                <TextInput
                                    returnKeyType='next'
                                    value={textoTratamento}
                                    onSubmitEditing={() => focusInput(this.inputQuantidade)}
                                    ref={(e) => this.inputTratamento = e}
                                    onChangeText={(texto) => this.setState({ textoTratamento: texto })}
                                    style={styles.input}
                                />
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Text style={styles.texto}>Quantidade</Text>
                                <TextInputMask
                                    mask='[000]'
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    onSubmitEditing={() => focusInput(this.inputHoras)}
                                    ref={(e) => this.inputQuantidade = e}
                                    value={textoQuantidade}
                                    onChangeText={(texto) => this.setState({ textoQuantidade: texto })}
                                    style={[styles.input, { width: '30%' }]}
                                />
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Text style={styles.texto}>Em quantas em quantas horas</Text>
                                <TextInputMask
                                    mask='[00]:[00]:[00]'
                                    returnKeyType='next'
                                    ref={(e) => this.inputHoras = e}
                                    keyboardType='numeric'
                                    value={textoHoras}
                                    oonChangeText={(formatted, extracted) => {
                                        this.setState({ textoHoras: extracted }) // 1234567890
                                    }}
                                    style={[styles.input, { width: '30%' }]}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: "#CCC", height: 50 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.7, y: 0 }}
                        colors={['#0CD3B1', Styles.colorPrimary]} style={{ alignSelf: 'center', width: '100%', height: 50 }}>
                        <Button bordered style={{ elevation: 0, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }}>
                            <Text style={{ color: '#FFF', fontSize: 13,fontWeight:'400' }}>SALVAR</Text>
                        </Button>
                    </LinearGradient>
                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        height: 42,
        borderWidth: 1,
        borderColor: '#41444c',
        padding: 10,
        color: '#333333',
        marginTop: 14,
        elevation: 2
    },
    texto: {
        color: '#888888',
        fontSize: 13,
        fontWeight: '400',
    }
})
const mapStateToProps = (state) => {
    const config = state.config;
    return {
        url: config.get('url'),
    };
};
const mapDispatchToProps = (dispatch) => ({

});

const NovoRemedioPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NovoRemedio);

export default NovoRemedioPage;

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, AsyncStorage, Animated } from 'react-native';
import { Button, Container, Header } from 'native-base';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Styles from '../../../theme/variables/styles';
import BackButton from '../../../components/BackButton';
import Icone from '../../../../assets/icones/medicamento.png';
import LinearGradient from 'react-native-linear-gradient';
import TextInputMask from 'react-native-text-input-mask';
import { focusInput } from '../../../components/FocusTextInput';
import { novoRemedio } from '../../App/actions';
import moment from 'moment';
import 'moment/locale/pt-br';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFonte from 'react-native-vector-icons/MaterialCommunityIcons';

class NovoRemedio extends Component {

    onClickSalvar = async () => {
        const { textoNome, textoQuantidade, textoHoras, textoTratamento, textoHorasfalta } = this.state;
        const { onNovoRemedio, history } = this.props;
        const { compartimento } = this.props.location.state;
        if (textoNome !== '' && textoHoras !== '' && textoQuantidade !== '' && textoTratamento !== '') {
            if (moment.duration(textoHoras + ':00') > moment.duration(textoHorasfalta + ':00')) {
                const timeHoras = moment.duration(textoHoras + ':00');
                const timeHorasFalta = moment.duration(textoHorasfalta + ':00');
                const datetimeInicio = moment().subtract(timeHoras).add(timeHorasFalta);

                const timeHorasFinal = moment.duration(textoHoras + ':00') * textoQuantidade;
                const datetimeFinal = moment(datetimeInicio).add(timeHorasFinal);
                const listaHistorico = this.calculaHistorico(datetimeInicio, textoHoras + ':00', textoQuantidade);
                const remedio = {
                    IDREMEDIO: Math.random() * 10,
                    DESCRICAO: textoNome,
                    NOMETRATAMENTO: textoTratamento,
                    COMPARTIMENTO: compartimento,
                    TEMPODOSE: textoHoras,
                    STATUS: 'A',
                    QUANTIDADE: textoQuantidade,
                    DATAINICIO: moment(datetimeInicio),
                    DATAFINAL: moment(datetimeFinal),
                    HISTORICO: listaHistorico
                };
                let lista = await AsyncStorage.getItem('listaRemedio')
                onNovoRemedio(remedio, JSON.parse(lista));
                history.goBack();
            } else {
                Toast.show('Tempo de cada dose é menor que o tempo da próxima dose,\nfavor digitar as horas corretas.');
            }
        } else {
            Toast.show('Por favor preencher os campos!');
        }
    }

    calculaHistorico = (DATAINICIO, TEMPOHORAS, QUANTIDADE) => {
        const historico = [];
        for (let i = 1; i <= QUANTIDADE; i++) {
            historico.push(moment(DATAINICIO).add(moment.duration(TEMPOHORAS) * i));
        }
        return historico;
    }

    onFocusInput = (input) => {
        const tamanho = 1.05;
        const duration = 300;
        if (input === 0) {
            Animated.timing(this.state.animatedScaleNome, {
                toValue: tamanho,
                duration: duration
            }).start();
        } else if (input === 1) {
            Animated.timing(this.state.animatedScaleTratamento, {
                toValue: tamanho,
                duration: duration
            }).start();
        } else if (input === 2) {
            Animated.timing(this.state.animatedScaleQuantidade, {
                toValue: tamanho,
                duration: duration
            }).start();
        } else if (input === 3) {
            Animated.timing(this.state.animatedScaleHora, {
                toValue: tamanho,
                duration: duration
            }).start();
        } else if (input === 4) {
            Animated.timing(this.state.animatedScaleHoraFalta, {
                toValue: tamanho,
                duration: duration
            }).start();
        }
    }
    onBlurInput = (input) => {
        const tamanho = 1;
        const duration = 300;
        if (input === 0) {
            Animated.timing(this.state.animatedScaleNome, {
                toValue: tamanho,
                duration: duration
            }).start();
        } else if (input === 1) {
            Animated.timing(this.state.animatedScaleTratamento, {
                toValue: tamanho,
                duration: duration
            }).start();
        } else if (input === 2) {
            Animated.timing(this.state.animatedScaleQuantidade, {
                toValue: tamanho,
                duration: duration
            }).start();
        } else if (input === 3) {
            Animated.timing(this.state.animatedScaleHora, {
                toValue: tamanho,
                duration: duration
            }).start();
        } else if (input === 4) {
            Animated.timing(this.state.animatedScaleHoraFalta, {
                toValue: tamanho,
                duration: duration
            }).start();
        }
    }
    state = {
        textoNome: '',
        textoQuantidade: '',
        textoHoras: '',
        textoTratamento: '',
        textoHorasfalta: '',
        animatedScaleNome: new Animated.Value(1),
        animatedScaleQuantidade: new Animated.Value(1),
        animatedScaleTratamento: new Animated.Value(1),
        animatedScaleHora: new Animated.Value(1),
        animatedScaleHoraFalta: new Animated.Value(1),

    }


    render() {
        const { textoNome, textoQuantidade, textoHoras, textoTratamento,
            textoHorasfalta, animatedScaleNome, animatedScaleQuantidade,
            animatedScaleTratamento, animatedScaleHora, animatedScaleHoraFalta } = this.state;
        const { compartimento } = this.props.location.state;
        return (
            <Container>
                <Header noShadow style={{ backgroundColor: Styles.colorPrimary, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <BackButton />
                        <Image source={Icone} style={{ height: 40, width: 40, resizeMode: 'contain', marginRight: 5 }} />
                        <Text style={{ fontSize: 20, color: '#FFF' }}>Novo Remedio</Text>
                        <IconFonte name={'numeric-' + compartimento + '-box'} color='#FFF' size={30} style={{ position: 'absolute', right: 10 }} />
                    </View>
                </Header>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, backgroundColor: Styles.backgroundList }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                        <View style={{ width: '80%' }}>
                            <View style={{ marginTop: 10, paddingBottom: 10 }}>
                                <Animated.View style={{ transform: [{ scale: animatedScaleNome }] }}>
                                    <Text style={styles.texto}>Nome do Remedio</Text>
                                    <View style={styles.input}>
                                        <TextInput
                                            returnKeyType='next'
                                            onFocus={() => this.onFocusInput(0)}
                                            onBlur={() => this.onBlurInput(0)}
                                            onChangeText={(texto) => this.setState({ textoNome: texto })}
                                            value={textoNome}
                                            style={{ flex: 1 }}
                                            onSubmitEditing={() => focusInput(this.inputTratamento)}
                                        />
                                    </View>
                                </Animated.View>
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Animated.View style={{ transform: [{ scale: animatedScaleTratamento }] }}>
                                    <Text style={styles.texto}>Nome do tratamento</Text>
                                    <View style={styles.input}>
                                        <TextInput
                                            returnKeyType='next'
                                            value={textoTratamento}
                                            onFocus={() => this.onFocusInput(1)}
                                            onBlur={() => this.onBlurInput(1)}
                                            onSubmitEditing={() => focusInput(this.inputQuantidade)}
                                            ref={(e) => this.inputTratamento = e}
                                            onChangeText={(texto) => this.setState({ textoTratamento: texto })}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                </Animated.View>
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Animated.View style={{ transform: [{ scale: animatedScaleQuantidade }] }}>
                                    <Text style={styles.texto}>Quantidade</Text>
                                    <View style={[styles.input, { width: '30%' }]}>
                                        <TextInputMask
                                            mask='[000]'
                                            keyboardType='numeric'
                                            returnKeyType='next'
                                            onFocus={() => this.onFocusInput(2)}
                                            onBlur={() => this.onBlurInput(2)}
                                            onSubmitEditing={() => focusInput(this.inputHoras)}
                                            ref={(e) => this.inputQuantidade = e}
                                            value={textoQuantidade}
                                            onChangeText={(texto) => this.setState({ textoQuantidade: texto })}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                </Animated.View>
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Animated.View style={{ transform: [{ scale: animatedScaleHora }] }}>

                                    <Text style={styles.texto}>Em quantas em quantas horas</Text>
                                    <DatePicker
                                        date={textoHoras}
                                        mode="time"
                                        placeholder=" "
                                        style={{ marginTop: 10 }}
                                        onOpenModal={() => this.onFocusInput(3)}
                                        onCloseModal={() => this.onBlurInput(3)}
                                        androidMode='spinner'
                                        iconComponent={<Icon name='timer' size={30} style={{ marginLeft: 5, marginTop: 10 }} />}

                                        customStyles={{
                                            dateInput: [styles.input, { width: '30%' }]
                                            // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(date) => this.setState({ textoHoras: date })}
                                    />
                                </Animated.View>
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Animated.View style={{ transform: [{ scale: animatedScaleHoraFalta }] }}>
                                    <Text style={styles.texto}>Quanto tempo falta para a proxima dose</Text>
                                    <DatePicker
                                        date={textoHorasfalta}
                                        mode="time"
                                        placeholder=" "
                                        onOpenModal={() => this.onFocusInput(4)}
                                        onCloseModal={() => this.onBlurInput(4)}
                                        androidMode='spinner'
                                        style={{ marginTop: 10 }}
                                        iconComponent={<Icon name='timer' size={30} style={{ marginLeft: 5, marginTop: 10 }} />}
                                        customStyles={{
                                            dateInput: [styles.input, { width: '30%' }]
                                            // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(date) => this.setState({ textoHorasfalta: date })}
                                    />
                                </Animated.View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: "#CCC", height: 50 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.7, y: 0 }}
                        colors={['#0CD3B1', Styles.colorPrimary]} style={{ alignSelf: 'center', width: '100%', height: 50 }}>
                        <Button bordered style={{ elevation: 0, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.onClickSalvar()}>
                            <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '500', letterSpacing: 1.3, lineHeight: 16 }}>SALVAR</Text>
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
        color: '#333333',
        backgroundColor: '#FFF',
        marginTop: 14,
        elevation: 2,
        borderRadius: 5
    },
    texto: {
        color: '#888888',
        fontSize: 13,
        fontWeight: '400',
    },
    title: {
        color: '#888888',
        fontWeight: '400',
        fontSize: 15,
        marginTop: 8
    }
})
const mapStateToProps = (state) => {
    const config = state.config;
    return {
        url: config.get('url'),
    };
};
const mapDispatchToProps = (dispatch) => ({
    onNovoRemedio: (remedio, lista) => dispatch(novoRemedio(remedio, lista)),
});

const NovoRemedioPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NovoRemedio);

export default NovoRemedioPage;

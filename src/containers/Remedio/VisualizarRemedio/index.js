import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native';
import { Container, Header, Button } from 'native-base';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Styles from '../../../theme/variables/styles';
import { BackButton, EditarItem } from '../../../components';
import Icone from '../../../../assets/icones/medicamento.png';
import { deleteRemedio } from '../../App/actions';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TimerCountdown from "react-native-timer-countdown";
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
class Remedio extends Component {

    state = {
        item: {},
        doseTomada: {},
        edit: false,
        durationTime: 0,
        textoNome: '',
        textoQuantidade: '',
        textoQuantDose: '',
        textoHoras: '',
        textoTratamento: '',
    }

    componentWillMount() {
        const { item } = this.props.location.state;
        this.calculaTempoRestante(item.HISTORICO);
        this.setState({
            item, textoNome: item.DESCRICAO, textoQuantidade: item.QUANTIDADE,
            textoQuantDose: item.QUANTIDADEDOSE, textoHoras: item.TEMPODOSE, textoTratamento: item.NOMETRATAMENTO
        });
    }

    calculaTempoRestante = (historico) => {
        const diaAtual = moment();
        let duration = null;
        historico.forEach(hist => {
            const data = hist.data;
            if (duration === null) {
                if (diaAtual.isBefore(hist.data)) {
                    duration = moment(data).diff(diaAtual, 'milliseconds');
                    this.setState({ doseTomada: hist.dose, durationTime: duration });
                }
            }
        });
        if (duration === null) {
            this.setState({ doseTomada: historico[historico.length].dose });
        }
    }
    onChangeText = (texto, campo) => {
        let { item, textoNome, textoQuantidade, textoHoras, textoTratamento, textoQuantDose } = this.state;
        if (campo === 0) {
            textoNome = texto
            this.setState({ textoNome });
        } else if (campo === 1) {
            textoTratamento = texto
            this.setState({ textoTratamento });
        } else if (campo === 2) {
            textoQuantDose = texto
            this.setState({ textoQuantDose });
        } else if (campo === 3) {
            textoQuantidade = texto
            this.setState({ textoQuantidade });
        }
        if (textoNome != item.DESCRICAO || item.QUANTIDADE != textoQuantidade ||
            item.NOMETRATAMENTO != textoTratamento || item.QUANTIDADEDOSE != textoQuantDose) {
            this.setState({ edit: true });
        } else {
            this.setState({ edit: false });
        }
    }

    onClickDelete = (compartimento) => {
        const { onDelete, history } = this.props;
        onDelete(compartimento);
        history.goBack();
    }

    render() {
        const { item, doseTomada, durationTime, edit, textoNome, textoQuantidade, textoHoras, textoTratamento, textoQuantDose } = this.state;
        return (
            <Container>
                <Header noShadow style={{ backgroundColor: Styles.colorPrimary, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <BackButton />
                        <Image source={Icone} style={{ height: 40, width: 40, resizeMode: 'contain', marginRight: 5 }} />
                        <Text style={{ fontSize: 20, color: '#FFF' }}>{item.DESCRICAO}</Text>
                        <View style={{ position: 'absolute', right: 10, flexDirection: 'row' }}>
                            <Icon name={'numeric-' + item.COMPARTIMENTO + '-box'} color='#FFF' size={30} />
                            <TimerCountdown
                                initialMilliseconds={durationTime}
                                style={{ color: '#FFF', fontSize: 18, marginLeft: 5, marginTop: 4 }}
                                onExpire={() => Alert.alert('Remedio', 'Está na hora do remedio !!')}
                            />
                        </View>
                    </View>
                </Header>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <View style={{ width: '80%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <EditarItem titulo='Nome do Remedio' refer={(e) => this.inputNome = e} inputFocus={this.inputTratamento} value={textoNome}
                                    onChangeText={(texto) => this.onChangeText(texto, 0)} />
                                <EditarItem titulo='Nome da doença' refer={(e) => this.inputTratamento = e} inputFocus={this.inputQuantDose} value={textoTratamento}
                                    onChangeText={(texto) => this.onChangeText(texto, 1)} />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-between' }}>
                                <EditarItem type='inteiro' mask='[0]' titulo='Quantidade por dose' refer={(e) => this.inputQuantDose = e} inputFocus={this.inputQuant} value={textoQuantDose}
                                    onChangeText={(texto) => this.onChangeText(texto, 2)} />
                                <EditarItem type='inteiro' mask='[000]' titulo='Quantidade' refer={(e) => this.inputQuant = e} value={textoQuantidade}
                                    onChangeText={(texto) => this.onChangeText(texto, 3)} />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-between' }}>
                                <EditarItem titulo='Dose a cada' value={textoHoras + ' horas'}
                                    disabled={true} onChangeText={() => { }} />
                                <EditarItem disabled={true} titulo='Dose tomadas' value={doseTomada + ' de ' + item.QUANTIDADE / item.QUANTIDADEDOSE}
                                    onChangeText={() => { }} />
                            </View>
                            <Text style={{ alignSelf: 'center', color: '#818181', fontSize: 14, fontWeight: '500', letterSpacing: 1.3, marginTop: 40 }}>Progresso</Text>
                            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <View>
                                    <Text style={{ alignSelf: 'center', color: '#818181', fontSize: 13, fontWeight: '500', letterSpacing: 1.3 }}>{moment(item.DATAINICIO).format('DD/MM/YYYY')}</Text>
                                </View>
                                <View style={{ flex: 1, paddingTop: 20 }}>
                                    <Slider
                                        style={{ width: '100%' }}
                                        minimumValue={0}
                                        disabled={true}
                                        value={moment().diff(item.DATAINICIO, 'day')}
                                        maximumValue={moment(item.DATAFINAL).diff(item.DATAINICIO, 'day')}
                                        minimumTrackTintColor={Styles.colorDarker}
                                        maximumTrackTintColor="#000000"
                                    />
                                    <Text style={{ alignSelf: 'center', color: '#818181', fontSize: 14, fontWeight: '500', letterSpacing: 1.3 }}>{moment().format('DD/MM/YYYY')}</Text>
                                </View>
                                <View>
                                    <Text style={{ alignSelf: 'center', color: '#818181', fontSize: 13, fontWeight: '500', letterSpacing: 1.3 }}>{moment(item.DATAFINAL).format('DD/MM/YYYY')}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.7, y: 0 }}
                        colors={['#890101', 'red']} style={{ alignSelf: 'center', width: '50%', height: 50 }}>
                        <Button bordered style={{ elevation: 0, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.onClickDelete(item.COMPARTIMENTO)}>
                            <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '500', letterSpacing: 1.3, lineHeight: 16 }}>DELETAR</Text>
                        </Button>
                    </LinearGradient>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.7, y: 0 }}
                        colors={edit ? ['#0CD3B1', Styles.colorPrimary] : ['#CCC', '#CCC']} style={{ alignSelf: 'center', width: '50%', height: 50 }}>
                        <Button disabled={!edit} bordered style={{ elevation: 0, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }}>
                            <Text style={{ color: edit ? '#FFF' : '#848080', fontSize: 13, fontWeight: '500', letterSpacing: 1.3, lineHeight: 16 }}>SALVAR</Text>
                        </Button>
                    </LinearGradient>
                </View>
            </Container >
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
        color: '#000',
        fontWeight: '400',
        fontSize: 15,
        marginTop: 8
    }
});

const mapStateToProps = (state) => {
    const config = state.config;
    return {
        url: config.get('url'),
    };
};
const mapDispatchToProps = (dispatch) => ({
    onDelete: (compartimento) => dispatch(deleteRemedio(compartimento)),
});

const RemedioPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Remedio);

export default RemedioPage;

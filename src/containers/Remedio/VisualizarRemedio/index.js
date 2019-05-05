import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Alert } from 'react-native';
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
            this.setState({ doseTomada: historico[historico.length - 1].dose });
        }
    }
    onChangeText = (texto, campo) => {
        let { item, textoNome, textoQuantidade, textoTratamento, textoQuantDose } = this.state;
        if (campo === 0) {
            textoNome = texto
            this.setState({ textoNome });
        } else if (campo === 1) {
            textoTratamento = texto
            this.setState({ textoTratamento });
        } else if (campo === 2) {
            if (parseInt(texto) >= 0 && parseInt(texto) <= 10) {
                textoQuantDose = texto
                this.setState({ textoQuantDose });
            }
        } else if (campo === 3) {
            if (parseInt(texto) >= 0) {
                textoQuantidade = texto
                this.setState({ textoQuantidade });
            }
        }
        if (textoNome != item.DESCRICAO || item.QUANTIDADE != textoQuantidade ||
            item.NOMETRATAMENTO != textoTratamento || item.QUANTIDADEDOSE != textoQuantDose) {
            this.setState({ edit: true });
        } else {
            this.setState({ edit: false });
        }
    }

    onClickDelete = (compartimento, Nome) => {
        const { onDelete, history } = this.props;
        Alert.alert('Deletar Remedio', 'Realmente deseja deletar ' + Nome + '?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    onDelete(compartimento);
                    history.goBack();
                },
            }
        ])

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
                            />
                        </View>
                    </View>
                </Header>
                <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: Styles.backgroundList }} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <View style={{ backgroundColor: '#FFF', margin: 12, padding: 15, borderRadius: 10 }}>
                            <EditarItem titulo='Nome do Remedio' refer={(e) => this.inputNome = e} inputFocus={this.inputTratamento} value={textoNome}
                                onChangeText={(texto) => this.onChangeText(texto, 0)} />
                            <EditarItem titulo='Nome da doença' refer={(e) => this.inputTratamento = e} inputFocus={this.inputQuantDose} value={textoTratamento}
                                onChangeText={(texto) => this.onChangeText(texto, 1)} />
                            <EditarItem type='inteiro' mask='[000]' titulo='Quantidade' refer={(e) => this.inputQuant = e} value={textoQuantidade}
                                onChangeText={(texto) => this.onChangeText(texto, 3)} />
                            <EditarItem type='inteiro' mask='[0]' titulo='Quantidade por dose' refer={(e) => this.inputQuantDose = e} inputFocus={this.inputQuant} value={textoQuantDose}
                                onChangeText={(texto) => this.onChangeText(texto, 2)} />
                            <EditarItem titulo='Dose a cada' value={textoHoras + ' horas'}
                                disabled={true} onChangeText={() => { }} />
                            <EditarItem disabled={true} titulo='Dose tomadas' value={doseTomada === item.QUANTIDADE / item.QUANTIDADEDOSE ?doseTomada:doseTomada-1 + ' de ' + item.QUANTIDADE / item.QUANTIDADEDOSE}
                                onChangeText={() => { }} />
                            <Text style={{ alignSelf: 'center', color: '#818181', fontSize: 14, fontWeight: '500', letterSpacing: 1.3, marginTop: 25 }}>Progresso</Text>
                            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <View>
                                    <Text style={{ textAlign: 'center', alignSelf: 'center', color: '#818181', fontSize: 12, fontWeight: '500', letterSpacing: 1.3 }}>
                                        {moment(item.DATAINICIO).format('DD/MM/YYYY') + '\n' + moment(item.DATAINICIO).format('HH:mm')}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, paddingTop: 20 }}>
                                    <Slider
                                        style={{ width: '100%' }}
                                        minimumValue={0}
                                        disabled={true}
                                        value={moment().diff(item.DATAINICIO, 'milliseconds')}
                                        maximumValue={moment(item.DATAFINAL).diff(item.DATAINICIO, 'milliseconds')}
                                        minimumTrackTintColor={Styles.colorDarker}
                                        maximumTrackTintColor="#000000"
                                    />
                                    <Text style={{ textAlign: 'center', alignSelf: 'center', color: '#818181', fontSize: 14, fontWeight: '500', letterSpacing: 1.3 }}>
                                        {moment().format('DD/MM/YYYY') + '\n' + moment().format('HH:mm')}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ textAlign: 'center', alignSelf: 'center', color: '#818181', fontSize: 12, fontWeight: '500', letterSpacing: 1.3 }}>
                                        {moment(item.DATAFINAL).format('DD/MM/YYYY') + '\n' + moment(item.DATAFINAL).format('HH:mm')}
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.7, y: 0 }}
                        colors={['#890101', 'red']} style={{ alignSelf: 'center', width: '50%', height: 50 }}>
                        <Button bordered style={{ elevation: 0, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.onClickDelete(item.COMPARTIMENTO, item.DESCRICAO)}>
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

const mapStateToProps = (state) => {
    const config = state.config;
    return {
        url: config.get('url'),
    };
};
const mapDispatchToProps = (dispatch) => ({
    onDelete: (compartimento) => dispatch(deleteRemedio(compartimento)),
    onSave: (item) => dispatch(saveRemedio(item)),
});

const RemedioPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Remedio);

export default RemedioPage;

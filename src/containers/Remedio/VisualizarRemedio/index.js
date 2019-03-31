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
import { deleteRemedio } from '../../App/actions';
import moment from 'moment';
import 'moment/locale/pt-br';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFonte from 'react-native-vector-icons/MaterialCommunityIcons';
import TimerCountdown from "react-native-timer-countdown";

class Remedio extends Component {

    state = {
        item: {}
    }

    componentWillMount() {
        const { item } = this.props.location.state;
        this.setState({ item });
    }

    calculaTempoRestante = (historico) => {
        const diaAtual = moment();
        let duration = null;
        historico.forEach(data => {
            if (duration === null) {
                if (diaAtual.isBefore(data)) {
                    const tempo = moment.duration(moment(data).format('hh:mm:ss'));
                    const tempoAtual = moment.duration(moment(diaAtual).format('hh:mm:ss'));
                    duration = tempo - tempoAtual;
                }
            }
        });
        return duration;
    }

    onClickDelete = (compartimento) => {
        const { onDelete, history } = this.props;
        onDelete(compartimento);
        history.goBack();
    }

    render() {
        const { item } = this.state;
        const durationTime = this.calculaTempoRestante(item.HISTORICO);
        return (
            <Container>
                <Header noShadow style={{ backgroundColor: Styles.colorPrimary, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <BackButton />
                        <Image source={Icone} style={{ height: 40, width: 40, resizeMode: 'contain', marginRight: 5 }} />
                        <Text style={{ fontSize: 20, color: '#FFF' }}>{item.DESCRICAO}</Text>
                        <View style={{ position: 'absolute', right: 10, flexDirection: 'row' }}>
                            <IconFonte name={'numeric-' + item.COMPARTIMENTO + '-box'} color='#FFF' size={30} />
                            <TimerCountdown
                                initialMilliseconds={durationTime}
                                style={{ color: '#FFF', fontSize: 18, marginLeft: 5, marginTop: 4 }}
                            // onExpire={() => alert('Está na hora do remedio !!')}
                            />
                        </View>
                    </View>
                </Header>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, backgroundColor: Styles.backgroundList }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '80%' }}>
                            <View style={{ paddingBottom: 10 }}>
                                <Text style={styles.title}>Nome do Remedio</Text>
                                <Text style={styles.texto}>{item.DESCRICAO}</Text>
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Text style={styles.title}>Nome do tratamento</Text>
                                <Text style={styles.texto}>{item.NOMETRATAMENTO}</Text>
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Text style={styles.title}>Quantidade</Text>
                                <Text style={styles.texto}>{item.QUANTIDADE}</Text>
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Text style={styles.title}>Quantidade por dose</Text>
                                <Text style={styles.texto}>{item.QUANTIDADEDOSE}</Text>
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Text style={styles.title}>Em quantas em quantas horas</Text>
                                <Text style={styles.texto}>{item.TEMPODOSE}</Text>
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.title}>Data Inicial</Text>
                                    <Text style={styles.texto}>{moment(item.DATAINICIO).format('DD/MM/YYYY')}</Text>
                                </View>
                                <View >
                                    <Text style={styles.title}>Data Final</Text>
                                    <Text style={styles.texto}>{moment(item.DATAFINAL).format('DD/MM/YYYY')}</Text>
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
                        colors={['#0CD3B1', Styles.colorPrimary]} style={{ alignSelf: 'center', width: '50%', height: 50 }}>
                        <Button bordered style={{ elevation: 0, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }}>
                            <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '500', letterSpacing: 1.3, lineHeight: 16 }}>SALVAR</Text>
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

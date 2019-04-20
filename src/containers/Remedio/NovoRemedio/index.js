import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, AsyncStorage, Animated } from 'react-native';
import { Button, Container, Header } from 'native-base';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Styles from '../../../theme/variables/styles';
import Icone from '../../../../assets/icones/medicamento.png';
import LinearGradient from 'react-native-linear-gradient';
import { novoRemedio } from '../../App/actions';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dissertativo, BackButton } from '../../../components';

class NovoRemedio extends Component {

    onClickSalvar = async () => {
        const { textoNome, textoQuantidade, textoHoras, textoTratamento, textoHorasfalta, textoQuantDose } = this.state;
        const { onNovoRemedio, history } = this.props;
        const { compartimento } = this.props.location.state;
        if (textoNome !== '' && textoHoras !== '' && textoQuantidade !== '' && textoTratamento !== '' && textoQuantDose !== '') {
            if (moment.duration(textoHoras + ':00') > moment.duration(textoHorasfalta + ':00')) {
                const timeHoras = moment.duration(textoHoras + ':00');
                const timeHorasFalta = moment.duration(textoHorasfalta + ':00');
                const datetimeInicio = moment().subtract(timeHoras).add(timeHorasFalta);
                const timeHorasFinal = moment.duration(textoHoras + ':00') * (textoQuantidade / textoQuantDose);
                const datetimeFinal = moment(datetimeInicio).add(timeHorasFinal);
                const listaHistorico = this.calculaHistorico(datetimeInicio, textoHoras + ':00', textoQuantidade / textoQuantDose);
                const remedio = {
                    IDREMEDIO: Math.random() * 10,
                    DESCRICAO: textoNome,
                    NOMETRATAMENTO: textoTratamento,
                    COMPARTIMENTO: compartimento,
                    TEMPODOSE: textoHoras,
                    STATUS: 'A',
                    QUANTIDADE: textoQuantidade,
                    QUANTIDADEDOSE: textoQuantDose,
                    DATAINICIO: datetimeInicio,
                    DATAFINAL: datetimeFinal,
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
            historico.push({
                data: moment(DATAINICIO).add(moment.duration(TEMPOHORAS) * i),
                dose: i
            }
            );
        }
        return historico;
    }

    state = {
        textoNome: '',
        textoQuantidade: '',
        textoQuantDose: '',
        textoHoras: '',
        textoTratamento: '',
        textoHorasfalta: '',
        compartimento: 0
    }

    componentWillMount() {
        const { compartimento } = this.props.location.state;
        this.setState({ compartimento });
    }

    render() {
        const { textoNome, textoQuantidade, textoHoras, textoTratamento,
            textoHorasfalta, compartimento, textoQuantDose } = this.state;
        return (
            <Container>
                <Header noShadow style={{ backgroundColor: Styles.colorPrimary, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <BackButton />
                        <Image source={Icone} style={{ height: 40, width: 40, resizeMode: 'contain', marginRight: 5 }} />
                        <Text style={{ fontSize: 20, color: '#FFF' }}>Novo Remedio</Text>
                        <Icon name={'numeric-' + compartimento + '-box'} color='#FFF' size={30} style={{ position: 'absolute', right: 10 }} />
                    </View>
                </Header>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, backgroundColor: Styles.backgroundList }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                        <View style={{ width: '80%' }}>
                            <View style={{ marginTop: 10, paddingBottom: 10 }}>
                                <Dissertativo titulo='Nome do Remedio' refer={(e) => this.inputNome = e} inputFocus={this.inputTratamento} value={textoNome}
                                    onChangeText={(texto) => this.setState({ textoNome: texto })} />
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Dissertativo titulo='Nome da doença' refer={(e) => this.inputTratamento = e}
                                    inputFocus={this.inputQuantidade} value={textoTratamento} onChangeText={(texto) => this.setState({ textoTratamento: texto })} />
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Dissertativo titulo='Quantidade' type='inteiro' mask='[000]' inputStyle={{ width: '30%' }} refer={(e) => this.inputQuantidade = e}
                                    inputFocus={this.inputQuantDose} value={textoQuantidade} onChangeText={(texto) => this.setState({ textoQuantidade: texto })} />
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Dissertativo titulo='Quantidade tomada por dose' type='inteiro' mask='[0]' inputStyle={{ width: '30%' }} refer={(e) => this.inputQuantDose = e}
                                    inputFocus={this.inputHoras} value={textoQuantDose} onChangeText={(texto) => this.setState({ textoQuantDose: texto })} />
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Dissertativo titulo='Dose a cada quantas horas' type='time'
                                    value={textoHoras} onChangeText={(texto) => this.setState({ textoHoras: texto })} />
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 10 }}>
                                <Dissertativo titulo='Tempo que falta para a proxima dose' type='time'
                                    value={textoHorasfalta} onChangeText={(texto) => this.setState({ textoHorasfalta: texto })} />
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

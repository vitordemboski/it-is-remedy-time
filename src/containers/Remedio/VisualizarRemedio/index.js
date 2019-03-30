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

class Remedio extends Component {

    state = {
        item: {}
    }
    componentWillMount() {
        const { item } = this.props.location.state;
        this.setState({ item });
    }

    render() {
        const { item } = this.state;
        return (
            <Container>
                <Header noShadow style={{ backgroundColor: Styles.colorPrimary, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <BackButton />
                        <Image source={Icone} style={{ height: 40, width: 40, resizeMode: 'contain', marginRight: 5 }} />
                        <Text style={{ fontSize: 20, color: '#FFF' }}>{item.DESCRICAO}</Text>
                        <View style={{ position: 'absolute', right: 10, flexDirection: 'row' }}>
                            <IconFonte name={'numeric-' + item.COMPARTIMENTO + '-box'} color='#FFF' size={30} />
                        </View>

                    </View>
                </Header>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, backgroundColor: Styles.backgroundList }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                        <View style={{ width: '80%' }}>

                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: "#CCC", height: 50 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.7, y: 0 }}
                        colors={['#0CD3B1', Styles.colorPrimary]} style={{ alignSelf: 'center', width: '100%', height: 50 }}>
                        <Button bordered style={{ elevation: 0, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }}>
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
});

const mapStateToProps = (state) => {
    const config = state.config;
    return {
        url: config.get('url'),
    };
};
const mapDispatchToProps = (dispatch) => ({
    onNovoRemedio: (remedio, lista) => dispatch(novoRemedio(remedio, lista)),
});

const RemedioPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Remedio);

export default RemedioPage;

import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import { Text, Thumbnail } from 'native-base';
import Usuario from '../../../../assets/icones/usuario.png';
import logoSatc from '../../../../assets/logo/logoSatcCinza.png';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SideMenu extends Component {
    componentWillMount = async () => {
        const texto = await AsyncStorage.getItem('nomeUsuario');
        if (texto) {
            this.setState({ textoNome: texto, isEdit: true });
        } else {
            this.setState({ isEdit: false });

        }
    }
    state = {
        textoNome: '',
        isEdit: false
    }

    onClickNome = (salvar) => {
        const { textoNome, isEdit } = this.state;
        salvar ?
            AsyncStorage.setItem('nomeUsuario', textoNome) : null;
        this.setState({ isEdit: !isEdit })
    }

    render() {
        const { history } = this.props;
        const { textoNome, isEdit } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View style={{ flex: 0, padding: 30, alignItems: 'center', marginTop: 20 }}>
                    <Thumbnail source={Usuario} />
                    {isEdit ?
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text numberOfLines={1} style={{ fontSize: 16, marginRight: 10 }}>{textoNome}</Text>
                            <TouchableOpacity onPress={() => this.onClickNome()}>
                                <Icon name='edit' size={15} style={{ paddingTop: 3 }} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <TextInput
                                placeholder='Digite seu nome...'
                                value={textoNome}
                                onChangeText={(texto) => this.setState({ textoNome: texto })}
                                style={{ fontSize: 16, marginRight: 10 }} />
                            <TouchableOpacity onPress={() => this.onClickNome(true)}>
                                <Icon name='check' size={15} style={{ paddingTop: 15 }} />
                            </TouchableOpacity>
                        </View>
                    }

                </View>
                <View style={{ height: 1, backgroundColor: '#dedede' }} />
                <View style={{ flex: 1, marginTop: 20 }}>
                    <TouchableHighlight underlayColor='#f1f1f1' onPress={() => history.push('/config')} >
                        <View style={{ flexDirection: 'row', opacity: 0.5, padding: 15 }}>
                            <Icon name='gear' size={20} />
                            <Text style={{ fontSize: 13, marginLeft: 15 }}>
                                Configurações
                           </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 0, backgroundColor: '#fcfcfc', padding: 15, alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={logoSatc} style={{ width: 30, height: 34, resizeMode: 'contain', marginRight: 20, }} />
                        <Text style={{ fontSize: 15, color: '#bcbcbc' }}>Faculdade </Text>
                        <Text style={{ fontSize: 15, color: '#bcbcbc', fontWeight: '500' }}>Satc</Text>
                    </View>
                </View>
            </View>

        )
    }
}

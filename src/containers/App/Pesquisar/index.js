import React, { Component } from 'react';
import { TouchableOpacity, TextInput, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Styles from '../../../theme/variables/styles';

export default class Pesquisar extends Component {

    state = {
        fadeAnim: new Animated.Value(0.7),
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 150,
                useNativeDriver: true
            }
        ).start();
    }

    render() {

        const { onBack, textoPesquisa, onChangeTextPesq } = this.props;
        let { fadeAnim } = this.state;

        return (
            <Animated.View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 5, backgroundColor: '#FFF', elevation: 1, opacity: fadeAnim }}>
                <TouchableOpacity style={{ padding: 12 }} onPress={onBack}>
                    <Icon name='md-arrow-back' color={Styles.corItensTop} size={20} />
                </TouchableOpacity>
                <TextInput
                    autoFocus
                    placeholder='Pesquisar...'
                    keyboardType='web-search'
                    value={textoPesquisa}
                    onChangeText={(texto) => onChangeTextPesq(texto)}
                    style={{ flex: 1 }}
                />
            </Animated.View >
        );
    }
}


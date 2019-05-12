import React, { Component } from 'react';
import { TextInput, Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { focusInput } from './FocusTextInput';
import DatePicker from 'react-native-datepicker';

export default class EditarItem extends Component {

    state = {
        scaleAnim: new Animated.Value(1),
    }

    onFocusInput = () => {
        const tamanho = 1.05;
        const duration = 300;
        Animated.timing(this.state.scaleAnim, {
            toValue: tamanho,
            duration: duration
        }).start();
    }

    onBlurInput = () => {
        const tamanho = 1;
        const duration = 300;
        Animated.timing(this.state.scaleAnim, {
            toValue: tamanho,
            duration: duration
        }).start();
    }

    render() {

        const { onChangeText, type, refer, inputFocus, value, titulo, done, disabled } = this.props;
        const { scaleAnim } = this.state;
        const time = type === 'time';
        const inteiro = type === 'inteiro';
        let input = null;
        if (time) {
            input = (<DatePicker
                date={value}
                mode="time"
                placeholder=" "
                style={{ marginTop: 10 }}
                disabled={disabled}
                onOpenModal={() => this.onFocusInput()}
                onCloseModal={() => this.onBlurInput()}
                androidMode='spinner'
                iconComponent={<Icon name='timer' size={30} style={{ marginLeft: 5, marginTop: 10 }} />}
                customStyles={{
                    dateInput: [styles.input, { width: '30%' }]
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={(texto) => { onChangeText(texto); this.onBlurInput() }}
            />)
        } else if (inteiro) {
            input = (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    <Text style={{ width: 25 }}>
                        {value}
                    </Text>
                    <View>
                        <TouchableOpacity onPress={() => onChangeText(parseInt(value) + 1)}>
                            <Icon name='keyboard-arrow-up' size={26} style={{ marginHorizontal: 4, marginVertical: 2 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChangeText(parseInt(value) - 1)}>
                            <Icon name='keyboard-arrow-down' size={26} style={{ marginHorizontal: 4, marginVertical: 2 }} />
                        </TouchableOpacity>
                    </View>
                </View >)
        } else {
            input = (
                <TextInput
                    returnKeyType={done ? 'done' : 'next'}
                    onFocus={() => this.onFocusInput()}
                    onBlur={() => this.onBlurInput()}
                    editable={!disabled}
                    ref={refer}
                    onChangeText={(texto) => onChangeText(texto)}
                    value={value}
                    style={!disabled ? styles.input : styles.texto}
                    onSubmitEditing={() => focusInput(inputFocus)}
                />
            )
        }


        return (
            <Animated.View style={{ transform: [{ scale: scaleAnim }], marginVertical: 8 }}>
                <Text style={styles.title}>{titulo}</Text>
                {input}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 42,
        borderWidth: 1,
        borderColor: '#CCC',
        color: '#9b9999',
        backgroundColor: '#CCC',
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
        color: '#9b9999',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 8
    }
})
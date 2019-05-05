import React, { Component } from 'react';
import { TextInput, Animated, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { focusInput } from './FocusTextInput';
import DatePicker from 'react-native-datepicker';

export default class Dissertativo extends Component {

    state = {
        scaleAnim: new Animated.Value(1),
        focus: false
    }

    onFocusInput = () => {
        const tamanho = 1.05;
        const duration = 300;
        Animated.timing(this.state.scaleAnim, {
            toValue: tamanho,
            duration: duration
        }).start();
        this.setState({ focus: true });
    }

    onBlurInput = () => {
        const tamanho = 1;
        const duration = 300;
        Animated.timing(this.state.scaleAnim, {
            toValue: tamanho,
            duration: duration
        }).start();
        this.setState({ focus: false });
    }

    render() {

        const { onChangeText, type, refer, inputFocus, value, titulo, inputStyle, maxLength, done } = this.props;
        const { scaleAnim, focus } = this.state;
        const time = type === 'time';
        const inteiro = type === 'inteiro';
        let input = null;
        if (time) {
            input = (<DatePicker
                date={value}
                mode="time"
                placeholder=" "
                style={{ marginTop: 10 }}
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
            input = (<TextInput
                keyboardType='numeric'
                returnKeyType={done ? 'done' : 'next'}
                onFocus={() => this.onFocusInput()}
                onBlur={() => this.onBlurInput()}
                onSubmitEditing={() => focusInput(inputFocus)}
                maxLength={maxLength}
                ref={refer}
                value={value}
                onChangeText={(texto) => onChangeText(texto.replace(/[^0-9]/g,''))}
                style={{ flex: 1 }}
            />)
        } else {
            input = (
                <TextInput
                    returnKeyType={done ? 'done' : 'next'}
                    onFocus={() => this.onFocusInput()}
                    onBlur={() => this.onBlurInput()}
                    ref={refer}
                    onChangeText={(texto) => onChangeText(texto)}
                    value={value}
                    style={inputStyle}
                    onSubmitEditing={() => focusInput(inputFocus)}
                />
            )
        }
        return (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Text style={[styles.texto, { color: focus ? '#000' : '#888888' }]}>{titulo}</Text>
                <View style={[time ? null : styles.input, inputStyle, { borderColor: focus ? '#000' : '#41444c' }]}>
                    {input}
                </View>
            </Animated.View >
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
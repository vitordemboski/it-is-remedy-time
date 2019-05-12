// export const API_URL = 'http://192.168.0.60:2500/api';
import { AsyncStorage, Alert } from 'react-native';

export async function API_URL() {
    try {
        const Endereco = await AsyncStorage.getItem('Endereco');
        const Porta = await AsyncStorage.getItem('Porta');
        let url = '';

        if (Endereco !== null && Porta !== null) {
            url = Endereco + ':' + Porta;
        } else if (Endereco !== null) {
            url = Endereco;
        } else {
            url = 'http://192.168.0.100:8081';
        }
        return url;
    } catch (error) {
        Alert.alert("Deu erro !!", error);
    }
};

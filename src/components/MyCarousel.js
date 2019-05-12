import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Styles from '../theme/variables/styles';
import { Separador } from '../components';
import moment from 'moment';
import 'moment/locale/pt-br';

export default ({ item, index }) => {

    item.itens.forEach(element => {
        const dataAtual = moment();
        element.antes = false;
        if (dataAtual.isAfter(element.data)) {
            element.antes = true;
        }
    });
    const diaAcabou = item.itens.every(elem => elem.antes);
    return (
        <View style={{ height: '80%', backgroundColor: '#FFF', borderRadius: 15, elevation: 2, marginTop: '5%', opacity: diaAcabou ? 0.5 : 1 }}>
            <View style={{ marginVertical: 20 }}>
                <Text style={{ color: Styles.colorPrimary, fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}>{item.data}</Text>
                <View style={{ width: '80%', alignSelf: 'center' }}>
                    <Separador />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
                <Text>Remedio</Text>
                <Text>Dose</Text>
                <Text>Hora</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ marginHorizontal: 5 }}>

                    {item.itens.map(element => {
                        let color = Styles.colorsCompartimento[element.COMPARTIMENTO];

                        return (
                            <View key={element.data} style={{ flexDirection: 'row', marginVertical: 3 }}>
                                {element.antes ? <View style={{ position: 'absolute', width: '100%', borderBottomWidth: 1, top: 10, opacity: 0.8 }} /> : null}
                                <Text style={{ fontWeight: 'bold', flex: 3, marginLeft: 2, color }}>
                                    {element.DESCRICAO}
                                </Text>
                                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'right', marginRight: 2, color }}>
                                    {element.dose}
                                </Text>
                                <Text style={{ fontWeight: 'bold', flex: 3, textAlign: 'right', color }}>
                                    {moment(element.data).format('HH:mm')}
                                </Text>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    );
}


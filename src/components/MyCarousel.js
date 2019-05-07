import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Styles from '../theme/variables/styles';
import { Separador } from '../components';
import moment from 'moment';
import 'moment/locale/pt-br';

export default ({ item, index }) => {
    return (
        <View style={{ height: '80%', backgroundColor: '#FFF', borderRadius: 15, elevation: 2, marginTop: '5%' }}>
            <View style={{ marginVertical: 20 }}>
                <Text style={{ color: Styles.colorPrimary, fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}>{item.data}</Text>
                <View style={{ width: '80%', alignSelf: 'center' }}>
                    <Separador />
                </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ marginHorizontal: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Remedio</Text>
                        <Text>Dose</Text>
                        <Text>Hora</Text>
                    </View>
                    {item.itens.map(element => {
                        const dataAtual = moment();
                        let antes = false
                        if (dataAtual.isAfter(element.data)) {
                            antes = true;
                        }
                        return (
                            <View key={element.data} style={{ flexDirection: 'row', marginVertical: 3, opacity: antes ? 0.5 : null }}>
                                {antes ? <View style={{ position: 'absolute', width: '100%', borderBottomWidth: 1, top: 10, opacity: 0.8 }} /> : null}
                                <Text style={{ fontWeight: 'bold', flex: 3, marginLeft: 2 }}>
                                    {element.DESCRICAO}
                                </Text>
                                <Text style={{ fontWeight: 'bold', flex: 1, textAlign: 'right', marginRight: 2 }}>
                                    {element.dose}
                                </Text>
                                <Text style={{ fontWeight: 'bold', flex: 3, textAlign: 'right' }}>
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


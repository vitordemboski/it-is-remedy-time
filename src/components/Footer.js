import React from 'react'
import { Footer, FooterTab, Button } from 'native-base';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation'
import Styles from '../theme/variables/styles';
export default props => {
    return (
        <Footer style={{ backgroundColor: 'transparent' }}>
            <FooterTab>
                <Button vertical active>
                    <Icon name='home' size={25} color={Styles.colorPrimary} />
                    <Text style={{ color: Styles.colorPrimary }}>Home</Text>
                </Button>
                <Button vertical>
                    <Icon name='graph-trend' size={25} />
                    <Text>Graficos</Text>
                </Button >
                <Button vertical>
                    <Icon name='calendar' size={25} />
                    <Text>Calendario</Text>
                </Button>
            </FooterTab>
        </Footer>
    )
}
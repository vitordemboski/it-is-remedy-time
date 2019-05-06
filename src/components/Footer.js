import React from 'react'
import { Footer, FooterTab, Button } from 'native-base';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation'
import Styles from '../theme/variables/styles';
export default props => {

    const { tab, onChangeTab } = props;
    return (
        <Footer >
            <FooterTab style={{ backgroundColor: '#FFF' }}>
                <Button vertical onPress={() => onChangeTab(0)}>
                    <Icon name='home' size={25} color={tab === 0 ? Styles.colorPrimary : null} />
                    <Text style={{ color: tab === 0 ? Styles.colorPrimary : null }}>Home</Text>
                </Button>
                <Button vertical onPress={() => onChangeTab(1)}>
                    <Icon name='calendar' size={25} color={tab === 1 ? Styles.colorPrimary : null} />
                    <Text style={{ color: tab === 1 ? Styles.colorPrimary : null }}>Calendario</Text>
                </Button>
            </FooterTab>
        </Footer>
    )
}
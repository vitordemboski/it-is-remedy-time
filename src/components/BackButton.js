import React, { Component } from 'react';
import { withRouter } from 'react-router-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Styles from '../theme/variables/styles'
import { View, TouchableOpacity } from 'react-native';
class BackButton extends Component {
    onBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={{ flex: 1, padding: 15, justifyContent: 'center' }} onPress={this.onBack}>
                    <Icon name='md-arrow-back' color={Styles.corItensTop} size={20} />
                </TouchableOpacity>
            </View>

        );
    }
}

export default withRouter(BackButton);

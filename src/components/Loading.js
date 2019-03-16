import React from 'react';
import Overlay from 'react-native-modal-overlay';
import { Spinner, Text } from 'native-base';

const Loading = (props) => {
  const { text, visible } = props;

  return (
    <Overlay
        visible={visible}
        containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.78)'}}
        childrenWrapperStyle={{backgroundColor: '#fff'}}
    >
      <Spinner />
      <Text>{text}</Text>
    </Overlay>
  );
}

export default Loading;

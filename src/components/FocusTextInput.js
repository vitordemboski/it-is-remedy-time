import { findNodeHandle } from 'react-native';
import TextInputState from 'react-native/lib/TextInputState';

export const focusInput = (node) => {
  try {
    TextInputState.focusTextInput(findNodeHandle(node));
  } catch(e) {
    console.log("Couldn't focus text input: ", e.message)
  }
}

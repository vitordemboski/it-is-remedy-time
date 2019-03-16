import variable from "./../variables/platform";
import Styles from '../variables/styles';
export default (variables = variable) => {
  const platform = variables.platform;

  const fabTheme = {
    backgroundColor: Styles.colorPrimary,
    height: 40,
    width: 40,
    "NativeBase.Button": {
      alignItems: "center",
      padding: null,
      justifyContent: "center",
      "NativeBase.Icon": {
        alignSelf: "center"
      },
      "NativeBase.IconNB": {
        alignSelf: "center",
        fontSize: 20,
        lineHeight: platform === "ios" ? 24 : undefined
      }
    }
  };

  return fabTheme;
};

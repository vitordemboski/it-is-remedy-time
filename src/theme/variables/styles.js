import color from "color";

const tabBarUnderlineStyle = '#CCC';
const backgroundList = '#e0e0e0';
const colorPrimary = '#156301';
const corItensTop = '#FFF';

const colorDarker = color(colorPrimary).darken(0.2).hex();
const colorsCompartimento = { 1: '#565656', 2: '#d7cec7', 3: '#76323f' }

const styles = {
    colorDarker,
    colorPrimary,
    tabBarUnderlineStyle,
    backgroundList,
    corItensTop,
    colorsCompartimento
}

export default styles;
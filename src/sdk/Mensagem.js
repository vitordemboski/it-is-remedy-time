import { post } from './api';
import { connect } from 'react-redux';

const Mensagem = props => {
    const enviaMensagem = (msg) => {
        return post(props.url, { msg });
    };

    const arrayMensagem = {
        enviaMensagem,
    }

    return arrayMensagem;
}

const mapStateToProps = (state) => {
    const config = state.config
    return {
        url: config.get('url'),
    };
};

const ConfigPage = connect(
    mapStateToProps,
    null,
)(Mensagem);

export default ConfigPage;
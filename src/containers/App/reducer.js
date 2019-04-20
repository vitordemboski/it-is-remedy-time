import { Map, OrderedMap } from 'immutable';
import { AsyncStorage } from 'react-native';

const initialState = Map({
  listaRemedio: [{}, {}, {}],
  enviando: false,
  sucesso: false,
  error: false,
});

const handleEnviarMensagem = (state, action) => {
  return state
    .set('enviando', true)
    .set('sucesso', false)
    .set('error', false);
};

const handleEnviarMensagemSuccess = (state, action) => {
  return state
    .set('enviando', false)
    .set('sucesso', true)
    .set('error', false);
};

const handleEnviarMensagemFailed = (state, action) => {
  return state
    .set('enviando', false)
    .set('sucesso', false)
    .set('error', action.error);
};

const handleLoadRemedio = (state, action) => {
  return state
    .set('listaRemedio', action.listaRemedio)
    .set('loading', true)
    .set('error', false);
};

const handleNovoRemedio = (state, action) => {
  const listaRemedio = action.lista;
  listaRemedio[action.remedio.COMPARTIMENTO - 1] = action.remedio;
  AsyncStorage.setItem('listaRemedio', JSON.stringify(listaRemedio));
  return state
    .set('listaRemedio', listaRemedio);
};

const handleNovoRemedioSuccess = (state, action) => {
  return state
    .set('loading', false)
    .set('error', false);
};


const handleNovoRemedioFailed = (state, action) => {
  return state
    .set('loading', false)
    .set('error', false);
};

const handleDeleteRemedio = (state, action) => {

  const listaRemedio = state.get('listaRemedio');
  listaRemedio[action.compartimento - 1] = {};

  AsyncStorage.setItem('listaRemedio', JSON.stringify(listaRemedio));
  return state
    .set('listaRemedio', listaRemedio);
};

const handleDeleteRemedioSuccess = (state, action) => {
  return state
    .set('loading', false)
    .set('error', false);
};

const handleFinalizarRemedio = (state, action) => {
  const remedio = action.item;

  const listaRemedio = state.get('listaRemedio');
  remedio.STATUS = 'F';
  listaRemedio[remedio.COMPARTIMENTO - 1] = remedio;

  return state
    .set('listaRemedio', listaRemedio);

};

const handleDeleteRemedioFailed = (state, action) => {
  return state
    .set('loading', false)
    .set('error', action.error);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ENVIAR_MENSAGEM':
      return handleEnviarMensagem(state, action);
    case 'ENVIAR_MENSAGEM_SUCCESS':
      return handleEnviarMensagemSuccess(state, action);
    case 'ENVIAR_MENSAGEM_FAILED':
      return handleEnviarMensagemFailed(state, action);
    case 'LOAD_REMEDIO':
      return handleLoadRemedio(state, action);
    case 'NOVO_REMEDIO':
      return handleNovoRemedio(state, action);
    case 'NOVO_REMEDIO_SUCCESS':
      return handleNovoRemedioSuccess(state, action);
    case 'NOVO_REMEDIO_FAILED':
      return handleNovoRemedioFailed(state, action);
    case 'DELETE_REMEDIO':
      return handleDeleteRemedio(state, action);
    case 'DELETE_REMEDIO_SUCCESS':
      return handleDeleteRemedioSuccess(state, action);
    case 'DELETE_REMEDIO_FAILED':
      return handleDeleteRemedioFailed(state, action);
    case 'FINALIZAR_REMEDIO':
      return handleFinalizarRemedio(state, action);
    default:
      return state;
  }
};

export default reducer;

import { Map, OrderedMap } from 'immutable';

const initialState = Map({
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ENVIAR_MENSAGEM':
      return handleEnviarMensagem(state, action);
    case 'ENVIAR_MENSAGEM_SUCCESS':
      return handleEnviarMensagemSuccess(state, action);
    case 'ENVIAR_MENSAGEM_FAILED':
      return handleEnviarMensagemFailed(state, action);
    default:
      return state;
  }
};

export default reducer;

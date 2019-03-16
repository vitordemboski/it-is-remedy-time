import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Mensagem from '../../sdk/Mensagem';

function* fetchEnviarMensagem(action) {
  try {
    const retorno = yield call(Mensagem.enviaMensagem, action.msg);
    yield put({ type: "ENVIAR_MENSAGEM_SUCCESS", sucesso: true });
  } catch (e) {
    yield put({ type: "ENVIAR_MENSAGEM_FAILED", error: e.message });
  }
}

const mySaga = [
  takeLatest("ENVIAR_MENSAGEM", fetchEnviarMensagem),
];

export default mySaga;

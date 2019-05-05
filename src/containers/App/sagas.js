import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Mensagem from '../../sdk/Mensagem';
import { AsyncStorage } from 'react-native';

function* fetchEnviarMensagem(action) {
  try {
    const retorno = yield call(Mensagem.enviaMensagem, action.msg);
    yield put({ type: "ENVIAR_MENSAGEM_SUCCESS", sucesso: true });
  } catch (e) {
    yield put({ type: "ENVIAR_MENSAGEM_FAILED", error: e.message });
  }
}

function* fetchNovoRemedio(action) {
  try {
    let lista = yield call(AsyncStorage.getItem, 'listaRemedio');
    yield put({ type: "NOVO_REMEDIO_SUCCESS", lista: JSON.parse(lista), remedio: action.remedio });
  } catch (e) {
    yield put({ type: "NOVO_REMEDIO_FAILED", error: e.message });
  }
}

function* fetchLoadRemedio(action) {
  try {
    let lista = yield call(AsyncStorage.getItem, 'listaRemedio');
    yield put({ type: "LOAD_REMEDIO_SUCCESS", lista: JSON.parse(lista) });
  } catch (e) {
    yield put({ type: "LOAD_REMEDIO_FAILED", error: e.message });
  }
}

const mySaga = [
  takeLatest("ENVIAR_MENSAGEM", fetchEnviarMensagem),
  takeLatest("NOVO_REMEDIO", fetchNovoRemedio),
  takeLatest("LOAD_REMEDIO", fetchLoadRemedio),
];

export default mySaga;

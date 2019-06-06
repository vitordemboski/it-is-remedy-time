import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { enviaMensagem } from '../../sdk/Mensagem';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import PushNotification from 'react-native-push-notification';

function* fetchEnviarMensagem(action) {
  try {
    const retorno = yield call(enviaMensagem, action.compartimento);
    yield put({ type: "ENVIAR_MENSAGEM_SUCCESS", sucesso: true });
  } catch (e) {
    yield put({ type: "ENVIAR_MENSAGEM_FAILED", error: e.message });
  }
}

ativarNotificacoes = (HISTORICO) => {
  HISTORICO.forEach(item => {
    const alarmNotifData = {
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      id: item.idhistorico.toString(),
      userInfo: { id: item.idhistorico.toString() },
      data: { compartimento: item.COMPARTIMENTO },
      title: "Remedio",               // Required
      message: "Está na hora de tomar sua " + item.dose + "º dose do(a) " + item.DESCRICAO,           // Required
      auto_cancel: false,                            // default: true
      ticker: "My Notification Ticker",
      vibrate: true,
      vibration: 100,                               // default: 100, no vibration if vibrate: false
      small_icon: "ic_launcher",                    // Required
      large_icon: "ic_launcher",
      userInteraction: true,
      color: "green",
      tag: 'some_tag',
      actions: '["Abrir"]',
      date: new Date(Date.now() + (moment(item.data).diff(moment(), 'milliseconds'))),                          // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.
    };
    PushNotification.localNotificationSchedule(alarmNotifData);
  });
}

function* fetchNovoRemedio(action) {
  try {
    let lista = yield call(AsyncStorage.getItem, 'listaRemedio');
    yield put({ type: "NOVO_REMEDIO_SUCCESS", lista: JSON.parse(lista), remedio: action.remedio });
  } catch (e) {
    yield put({ type: "NOVO_REMEDIO_FAILED", error: e.message });
  }
}
function* fetchAlterarRemedio(action) {
  try {
    const { remedio, quantidade, quantidadeDose } = action;
    let lista = JSON.parse(yield call(AsyncStorage.getItem, 'listaRemedio'));
    const ultimoRemedio = remedio.HISTORICO[remedio.HISTORICO.length - 1];
    const arrayAdicional = [];
    let data = null;
    if (moment(ultimoRemedio.data).isBefore(moment())) {
      data = moment();
    } else {
      data = moment(ultimoRemedio.data);
    }

    for (let i = 1; i <= parseInt( quantidade / quantidadeDose); i++) {
      let remedioNovos = ultimoRemedio;
      remedioNovos.dose = remedioNovos.dose + i;
      remedioNovos.data = data.add(moment.duration(remedio.TEMPODOSE) * i);
      arrayAdicional.push(remedioNovos);
    }
    console.log('Array Historico adicional: ', arrayAdicional)

    let remedioLista = lista[remedio.COMPARTIMENTO - 1];
    ativarNotificacoes(arrayAdicional);
    remedioLista.HISTORICO = remedioLista.HISTORICO.concat(arrayAdicional);
    if (remedioLista.STATUS === 'F') {
      remedioLista.STATUS = 'A';
    }
    remedioLista.QUANTIDADE = parseInt(remedio.QUANTIDADE) + parseInt(quantidade);
    remedioLista.DATAFINAL = remedio.HISTORICO[remedio.HISTORICO.length - 1].data;
    remedioLista.QUANTIDADEDOSE = quantidadeDose;
    lista[remedio.COMPARTIMENTO - 1] = remedioLista;
    console.log('Lista: ', lista);
    AsyncStorage.setItem('listaRemedio', JSON.stringify(lista));
    yield put({ type: "ALTERAR_REMEDIO_SUCCESS", lista });
  } catch (e) {
    yield put({ type: "ALTERAR_REMEDIO_FAILED", error: e.message });
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
  takeLatest("ALTERAR_REMEDIO", fetchAlterarRemedio),
];

export default mySaga;

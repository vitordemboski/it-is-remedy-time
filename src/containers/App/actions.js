export const enviaMensagem = (msg) => ({ type: 'ENVIAR_MENSAGEM', msg });
export const enviaMensagemSuccess = () => ({ type: 'ENVIAR_MENSAGEM_SUCCESS' });
export const enviaMensagemFailed = () => ({ type: 'ENVIAR_MENSAGEM_FAILED' });

export const novoRemedio = (remedio, lista) => ({ type: 'NOVO_REMEDIO', remedio, lista });
export const novoRemedioSuccess = () => ({ type: 'NOVO_REMEDIO_SUCCESS' });
export const novoRemedioFailed = () => ({ type: 'NOVO_REMEDIO_FAILED' });

export const deleteRemedio = (compartimento) => ({ type: 'DELETE_REMEDIO', compartimento });
export const deleteRemedioSuccess = () => ({ type: 'DELETE_REMEDIO_SUCCESS' });
export const deleteRemedioFailed = () => ({ type: 'DELETE_REMEDIO_FAILED' });

export const loadRemedio = (listaRemedio) => ({ type: 'LOAD_REMEDIO', listaRemedio });

export const finalizarRemedio  = (item) => ({ type: 'FINALIZAR_REMEDIO', item });
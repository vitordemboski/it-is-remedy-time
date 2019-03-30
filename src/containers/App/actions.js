export const enviaMensagem = (msg) => ({ type: 'ENVIAR_MENSAGEM', msg });
export const enviaMensagemSuccess = () => ({ type: 'ENVIAR_MENSAGEM_SUCCESS' });
export const enviaMensagemFailed = () => ({ type: 'ENVIAR_MENSAGEM_FAILED' });

export const novoRemedio = (remedio, lista) => ({ type: 'NOVO_REMEDIO', remedio, lista });
export const novoRemedioSuccess = () => ({ type: 'NOVO_REMEDIO_SUCCESS' });
export const novoRemedioFailed = () => ({ type: 'NOVO_REMEDIO_FAILED' });

export const loadRemedio = (listaRemedio) => ({ type: 'LOAD_REMEDIO', listaRemedio });


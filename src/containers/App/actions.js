export const enviaMensagem = (compartimento) => ({ type: 'ENVIAR_MENSAGEM', compartimento });
export const enviaMensagemSuccess = () => ({ type: 'ENVIAR_MENSAGEM_SUCCESS' });
export const enviaMensagemFailed = () => ({ type: 'ENVIAR_MENSAGEM_FAILED' });

export const novoRemedio = (remedio) => ({ type: 'NOVO_REMEDIO', remedio });
export const novoRemedioSuccess = () => ({ type: 'NOVO_REMEDIO_SUCCESS' });
export const novoRemedioFailed = () => ({ type: 'NOVO_REMEDIO_FAILED' });

export const deleteRemedio = (compartimento) => ({ type: 'DELETE_REMEDIO', compartimento });
export const deleteRemedioSuccess = () => ({ type: 'DELETE_REMEDIO_SUCCESS' });
export const deleteRemedioFailed = () => ({ type: 'DELETE_REMEDIO_FAILED' });

export const loadRemedio = () => ({ type: 'LOAD_REMEDIO' });
export const loadRemedioSuccess = () => ({ type: 'LOAD_REMEDIO_SUCCESS' });
export const loadRemedioFailed = () => ({ type: 'LOAD_REMEDIO_FAILED' });

export const finalizarRemedio = (item) => ({ type: 'FINALIZAR_REMEDIO', item });

export const alterarRemedio = (remedio, quantidade, quantidadeDose) => ({ type: 'ALTERAR_REMEDIO', remedio, quantidade, quantidadeDose });
export const alterarRemedioSuccess = () => ({ type: 'ALTERAR_REMEDIO_SUCCESS' });
export const alterarRemedioFailed = () => ({ type: 'ALTERAR_REMEDIO_FAILED' });
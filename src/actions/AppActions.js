import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

import { 
    MODIFICA_ADICIONA_CONTATO_EMAIL, 
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIA_MENSAGEM_SUCESSO,
    LISTA_CONVERSAS_USUARIO 
} from './types';

export const modificaAdicionaContatoEmail = texto => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto
    }
}

export const adicionaContato = email => {

    return dispatch => {
        let emailB64 = b64.encode(email);

        firebase.database().ref(`/contatos/${emailB64}`)
            .once(`value`)
            .then(snapshot => {
                if(snapshot.val()) {
                    
                const dadosUsuario = _.first(_.values(snapshot.val()));

                    //email do usuário autenticado
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email);

                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                        .push({ email, nome: dadosUsuario.nome })
                        .then(() => adicionaContatoSucesso(dispatch) )
                        .catch(erro => adicionaContatoErro(erro.message, dispatch))

                } else {
                    dispatch(
                        {
                            type: ADICIONA_CONTATO_ERRO,
                            payload: 'E-mail informado não corresponde a um usuário válido!'
                        }
                    )
                }
        })
    }
}

const adicionaContatoErro = (erro, dispatch) => (
    dispatch (
        {
            type: ADICIONA_CONTATO_ERRO,
            payload: erro
        }
    )
)

const adicionaContatoSucesso = dispatch => (
    dispatch (
        {
            type: ADICIONA_CONTATO_SUCESSO,
            payload: true
        }
    )
)

export const habilitaInclusaoContato = () => (
    {
        type: ADICIONA_CONTATO_SUCESSO,
        payload: false
    }
)

export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.enconde( currentUser.email );

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() })
            })
    }
}

export const modificaMensagem = texto => {
    return ({
        type: MODIFICA_MENSAGEM,
        payload: texto
    })
}

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {
    //dados do usuario (email)
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;
    
    return dispatch => {

        //conversão para base 64
        const usuarioEmailB64 = b64.encode(usuarioEmail)
        const contatoEmailB64 = b64.encode(contatoEmail)

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem, tipo: 'e' })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem, tipo: 'r' })
                    .then(() => dispatch ({ type: ENVIA_MENSAGEM_SUCESSO }))        
            })
            .then(() => { //armazenar o cabeçalho de conversa do usuário autenticado
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ nome: contatoNome, email: contatoEmail })
            })
            .then(() => { //armazenar o cabeçalho de conversa do contato

                firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                    .once("value")
                    .then(snapshot => {

                        const dadosUsuario = _.first(_.values(snapshot.val()))

                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                        .set({ nome: dadosUsuario.nome, email: usuarioEmail })
                    })
            })
    }
}

export const conversaUsuarioFetch = contatoEmail => {

    const { currentUser } = firebase.auth();

    //Compor os emails na base64
    let usuarioEmailB64 = b64.encode(currentUser.email)
    let contatoEmailB64 = b64.encode(contatoEmail)

    return dispatch => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
        .on("value", snapshot => {
            dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() })
        })
    }
}

export const conversaUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        let usuarioEmailB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() })
            })
    }
}
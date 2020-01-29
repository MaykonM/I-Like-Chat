import React, { Component } from 'React';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from '../actions/AutenticacaoActions';

class formCadastro extends Component {

    _cadastraUsuario() {

        const { nome, email, senha } = this.props;

        this.props.cadastraUsuario({ nome, email, senha });
    }

    renderBtnCadastro() {
        if(this.props.loading_cadastro) {
            return (
            <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Cadastrar" color="#115E54"  onPress={() => this._cadastraUsuario()} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 10, color: '#00BFFF' }}>
                <View style={{ flex: 4, justifyContent: 'center' }}>
                    <TextInput 
                        value={props.nome} 
                        placeholder="Nome" 
                        placeholderTextColor='#fff' 
                        style={{ fontSize: 20, height: 45 }} 
                        onChangeText={texto => props.modificaNome(texto)} 
                    />
                    <TextInput 
                        value={props.email} 
                        placeholder="E-mail" 
                        placeholderTextColor='#fff' 
                        style={{ fontSize: 20, height: 45 }} 
                        onChangeText={texto => props.modificaEmail(texto)} 
                    />
                    <TextInput 
                        secureTextEntry 
                        value={props.senha} 
                        placeholder="Senha" 
                        placeholderTextColor='#fff' 
                        style={{ fontSize: 20, height: 45 }} 
                        onChangeText={texto => props.modificaSenha(texto)} 
                    />
                </View>

                <Text style={{ color: '#ff0000', fontSize: 18}}>{this.props.erroCadastro}</Text>

                <View style={{ flex: 1 }}>
                    {this.props.renderBtnCadastro()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        nome: state.AutenticacaoReducer.nome,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loading_cadastro: state.AutenticacaoReducer.loading_cadastro
    }
);

export default connect(
    mapStateToProps, 
        { 
            modificaEmail, 
            modificaSenha, 
            modificaNome, 
            cadastraUsuario 
        })
    (formCadastro);

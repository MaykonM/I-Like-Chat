import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AcidionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54' }} titleStyle={{ color: '#fff' }} >
        <Scene key='FormLogin' component={FormLogin} title="Login" hideNavBar={true} />
        <Scene key='FormCadastro' component={FormCadastro} title="Cadastro" hideNavBar={false} />
        <Scene key='BoasVindas' component={BoasVindas} title="Bem-Vindo" hideNavBar={true} />
        <Scene Key='Principal' component={Principal} title="Principal" hideNavBar={true} initial />
        <Scene key='AcidionarContato' component={AcidionarContato} title="Acidionar Contato" hideNavBar={false} />
        <Scene key='Conversa' component={Conversa} title="Conversa" hideNavBar={false} />
    </Router>
);

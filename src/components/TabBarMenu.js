import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { habilitaInclusaoContato } from '../actions/AppActions';

const TabBarMenu = props => (
    <View style={{ backgroundColor="#00BFFF", elevation: 4, marginBottom: 6 }}>

        <StatusBar backgroundColor="#1E90FF" />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={{ color: "#fff", fontSize: 20, marginLeft: 20 }}>My chat</Text>
            </View>

            <View style={{ flexDirection: 'row', marginRight: 20 }}>
                <View style={{ justifyContent: 'center', width: 50, alignItems: 'center' }}>
                    <TouchableHighlight
                        onPress={() => { Actions.AdicionarContato(); props.habilitaInclusaoContato() }}
                        underlayColor="#1E90FF"
                    >
                        <Image source={require('../imgs/adicionar_contato.png')} />
                    </TouchableHighlight>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableHighlight onPress={
                        () => firebase.auth().signOut().then(() => Actions.FormLogin() )
                    }>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Sair</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>

        <TabBar {...props} style={{ backgroundColor: "#00BFFF", elevation: 0 }}/>
    </View>
);

export default connect(null, { habilitaInclusaoContato })(TabBarMenu);
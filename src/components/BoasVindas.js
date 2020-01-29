import React from 'react';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default props => (
    <View style={{ flex: 1, padding: 15, color: '#00BFFF' }}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, color: '#ffffff' }}>Seja Bem-Vindo</Text>
        </View>
        <View style={{ flex: 1 }}>
            <Button title='Fazer Login' onPress={() => Actions.FormLogin() } />
        </View>
    </View>
);

import React, { Component, useState } from 'react';
import
{
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { styles } from './style'

const LoginForm = ({ nav }) =>
{
    const [loginForm, setLoginForm] = useState(
        {
            login: '',
            password: ''
        });

    const loginSubmitHandler = () =>
    {
        nav.push('Root', { screen: 'Profile' });
        console.log(loginForm)
    }

    const clickHandler = () =>
    {
        setIsS(!isS)
    }

    return (
        <View style={ styles.loginContainer }>
            <Text style={ styles.loginHeaderText }>Login</Text>
            <TextInput
                placeholder='Login'
                style={ styles.input }
                value={ loginForm.login }
                onChange={ (e) =>
                {
                    setLoginForm({
                        ...loginForm,
                        login: e.nativeEvent.text
                    })
                } }
            />
            <TextInput
                placeholder='Password'
                secureTextEntry={ true }
                style={ styles.input }
                value={ loginForm.password }
                onChange={ (e) =>
                {
                    setLoginForm({
                        ...loginForm,
                        password: e.nativeEvent.text
                    })
                } } />

            <Button title='submit' onPress={ loginSubmitHandler }></Button>
        </View>
    )
}

export default LoginForm

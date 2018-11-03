import React, { Component } from 'react';
import { View } from 'react-native';

import firebase from 'firebase';

import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null }

    componentWillMount() {

        const firebase = require('firebase');

        firebase.initializeApp({
            apiKey: 'AIzaSyDV1j7UBzQus1-G1luLEdF8LQXqCjNjPpI',
            authDomain: 'authentication-ab406.firebaseapp.com',
            databaseURL: 'https://authentication-ab406.firebaseio.com',
            projectId: 'authentication-ab406',
            storageBucket: 'authentication-ab406.appspot.com',
            messagingSenderId: '1092564088326'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({ loggedIn: true })
            }else {
                this.setState({ loggedIn: false })
            }
        })
    }

    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return (
                    <Button onPress={() => (firebase.auth().signOut())}> 
                        Log out 
                    </Button>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />
        }


        if(this.state.loggedIn) {
            return (
                <Button>
                    Log out
                </Button>
            )
        }

        return <LoginForm />;
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        )
    }
}

export default App;

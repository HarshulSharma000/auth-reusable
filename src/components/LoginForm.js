//@flow
import React,{Component} from 'react';
import {Text,View,Button,TextInput} from 'react-native';
import firebase from 'firebase';
import {Card,CardSection,Input,Spinner} from './common';

class LoginForm extends Component{
    state = {email: "",password:"", error: "",loading: false};

    onButtonPress(){
        const {email,password} = this.state;
        this.setState({ error:"" ,loading:true});
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() =>{
                this.onLoginFailure();
            });

        });
    }
    onLoginFailure(){
        this.setState({error:"Authentication failed", loading:false});
    }
    onLoginSuccess(){
        this.setState({
            email: "",password:"", error: "",loading: false
        });
    }
    renderButton(){
        if(this.state.loading)
            return(
                <Spinner size = 'large' />
            );
        
        return(
            <View style = {{flex:1,width:null, marginLeft: 5, marginRight: 5,height: 38}}>
                        <Button
                            title = "Log In"
                            color = "#841584"
                            onPress = {this.onButtonPress.bind(this)}
                        />
            </View>
        );
    }
    render(){
        return(
            <View>
                <CardSection>
                   <Input
                        value = {this.state.email}
                        onChangeText = {email => this.setState({email})}
                        label = 'Email:'
                        placeholder = 'user@email.com'
                    />
                </CardSection>
                <CardSection>
                    <Input
                        placeholder = "password"
                        secureTextEntry = {true}
                        label = "Password:"
                        value = {this.state.password}
                        onChangeText = {password => this.setState({password})}
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                <View style = {{height: 40}}/>
                <View>
                    <Text style = {styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                </View>
            </View>
        );
    }
}
const styles = {
    errorTextStyle:{
        fontSize:30,
        color: 'red',
        alignSelf: 'center'
    }
};
export default LoginForm;

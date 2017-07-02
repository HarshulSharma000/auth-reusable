//@flow
import React,{Component} from 'react';
import {Text,View,Button} from 'react-native';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';
import {Header,Spinner} from './src/components/common';

class App extends Component {
	state = {loggedIn: null};
	componentWillMount(){
		firebase.initializeApp({
			apiKey: "AIzaSyDZOEh_d52enzXcNlBIr3uKyRRQ3FYmADY",
			authDomain: "auth-b947d.firebaseapp.com",
			databaseURL: "https://auth-b947d.firebaseio.com",
			projectId: "auth-b947d",
			storageBucket: "auth-b947d.appspot.com",
			messagingSenderId: "125904189172"
  		});
		firebase.auth().onAuthStateChanged(user => {
			if(user){
				this.setState({loggedIn: true });
			}else{
				this.setState({loggedIn: false });
			}
		});
	}
	rendercontent(){
		switch(this.state.loggedIn)
		{
			case true:
			return(
				<View >
                        <Button
                            title = "Logout"
                            color = "#841584"
							onPress = {() => firebase.auth().signOut()}
                        />
            	</View>);
			case false:
				return(
					<LoginForm />
				);
				
			default:
				 return(
					<View style = {{justifyContent: 'center',alignContent: 'center',flex:1}}>
						<Spinner  size = 'large'/>
					</View>
				 );
		}
	}
	render(){
		return(
	 	<View>
			<Header headText = "Authentication" />
			{this.rendercontent()}
		</View>
    );
  }
}

const styles = {
}
export default App;
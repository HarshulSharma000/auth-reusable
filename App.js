//@flow
import React,{Component} from 'react';
import {Text,View} from 'react-native';

class App extends Component {
	render(){
		const {appStyle} = styles;
		return(
	 	<View style = {appStyle}>
			<Text> Hi there hope it works now </Text>
		</View>
    );
  }
}

const styles = {
	appStyle:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
}
export default App;
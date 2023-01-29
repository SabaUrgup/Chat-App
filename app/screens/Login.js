import React, { useState, useLayoutEffect } from "react";
import {
	Text,
	SafeAreaView,
	View,
	TextInput,
	Pressable,
	Alert,
} from "react-native";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
	const [username, setUsername] = useState("");

	//💡 Async Storage is a React Native package used to store string data in native applications. It is similar to the local storage on the web and can be used to store tokens and various data in string format.
	const storeUsername = async () => {
		try {
			await AsyncStorage.setItem("username", username);
			navigation.navigate("Chat");
		} catch (e) {
			Alert.alert("Error! While saving username");
		}
	};

	//Update the handleSignIn function to save the username via AsyncStorage.
	const handleSignIn = () => {
		if (username.trim()) {
			storeUsername();
		} else {
			Alert.alert("Username is required.");
		}
	};

	useLayoutEffect(() => {
		const getUsername = async () => {
			try {
				const value = await AsyncStorage.getItem("username");
				if (value !== null) {
					navigation.navigate("Chat");
				}
			} catch (e) {
				console.error("Error while loading username!");
			}
		};
		getUsername();
	}, []);

	return (
		<SafeAreaView style={styles.loginscreen}>
			<View style={styles.loginscreen}>
				<Text style={styles.loginheading}>Sign in</Text>
				<View style={styles.logininputContainer}>
					<TextInput
						autoCorrect={false}
						placeholder='Enter your username'
						style={styles.logininput}
						onChangeText={(value) => setUsername(value)}
					/>
				</View>

				<Pressable onPress={handleSignIn} style={styles.loginbutton}>
					<View>
						<Text style={styles.loginbuttonText}>Get Started</Text>
					</View>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Login;

// import { View, Text, SafeAreaView } from "react-native";
// import React from "react";

// const Login = () => {
// 	return (
// 		<SafeAreaView>
// 			<Text>Hello World</Text>
// 		</SafeAreaView>
// 	);
// };

// export default Login;

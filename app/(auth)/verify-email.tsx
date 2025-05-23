import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Linking, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Text } from "@/components/ui/text";
import { H4 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
const VerifyEmail = () => {
	const { email } = useLocalSearchParams();
	const openEmail = () => {
		Linking.openURL("mailto:").catch(() => {
			Alert.alert("Error", "Could not open email app");
		});
	};
	return (
		<View className="flex-1 items-center justify-center p-4 gap-4">
			<Feather name="mail" size={72} color="black" />
			<H4>Verify your email</H4>
			<Text className="text-center">{`Please check your email ${email} to verify your account.`}</Text>
			<Button onPress={openEmail}>
				<Text>Open Email</Text>
			</Button>
		</View>
	);
};

export default VerifyEmail;

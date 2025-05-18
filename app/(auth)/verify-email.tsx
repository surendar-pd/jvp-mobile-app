import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@/components/ui/text";
import { H4 } from "@/components/ui/typography";

const VerifyEmail = () => {
	const { email } = useLocalSearchParams();
	return (
		<View className="flex-1 items-center justify-center p-4">
			<H4>Verify your email</H4>
			<Text>{`Please check your email ${email} to verify your account.`}</Text>
		</View>
	);
};

export default VerifyEmail;

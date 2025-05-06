import * as Network from "expo-network";
import React from "react";
import { View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ThemedView } from "@/components/ThemedView";


const Profile = () => {
  const networkState = Network.useNetworkState();
	const subscription = Network.addNetworkStateListener(
		({ type, isConnected, isInternetReachable }) => {
			console.log(
				`Network type: ${type}, Connected: ${isConnected}, Internet Reachable: ${isInternetReachable}`
			);
		}
	);

	React.useEffect(() => {
		// Cleanup the subscription on unmount
		console.log(networkState.isInternetReachable);
		// return () => {
		// 	subscription.remove();
		// };
	}, [subscription]);

	return (
		<ThemedView>
			<ScrollView contentContainerStyle={{ padding: 20 }}>
				<View className="flex-row items-center justify-center">
					<Image
						source={{ uri: "https://avatar.iran.liara.run/public/boy" }}
						className="w-36 h-36 rounded-full"
					/>
				</View>
			</ScrollView>
		</ThemedView>
	);
};

export default Profile;

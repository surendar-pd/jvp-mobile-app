/* eslint-disable @typescript-eslint/no-require-imports */
import { Link } from "expo-router";
import { Image, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function WelcomeConsentScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
			headerImage={
				<Image
					source={require("@/assets/images/hero.png")}
					alt="Welcome Consent"
					className="w-full h-full object-cover object-center"
				/>
			}
		>
			<View className="flex-1 justify-between gap-4 px-4 pb-8">
				<View className="ios:pt-8 pt-12">
					<H1 className="text-left font-bold">Welcome to your</H1>
					<H1 className="text-primary font-bold">Application</H1>
				</View>
				<View className="gap-8">
					{FEATURES.map((feature) => (
						<View key={feature.title} className="flex-row gap-4">
							<View className="pt-px">
								{/* <Icon
									name={feature.icon}
									size={38}
									// color={colors.primary}
									ios={{ renderingMode: "hierarchical" }}
								/> */}
							</View>
							<View className="flex-1">
								<Text className="font-bold">{feature.title}</Text>
								<Text>{feature.description}</Text>
							</View>
						</View>
					))}
				</View>
				<Text className="pt-1 text-center">
					By pressing continue, you agree to our{" "}
					<Link href="/">
						<Text className="text-primary">Terms of Service</Text>
					</Link>{" "}
					and that you have read our{" "}
					<Link href="/(aux)">
						<Text className="text-primary">Privacy Policy</Text>
					</Link>
				</Text>
				<Link href="/(auth)" replace asChild>
					<Button size="lg">
						<Text>Continue</Text>
					</Button>
				</Link>
			</View>
		</ParallaxScrollView>
	);
}

const FEATURES = [
	{
		title: "Profile Management",
		description:
			"Easily update and manage your personal information, settings, and preferences",
		icon: "account",
	},
	{
		title: "Secure Messaging",
		description: "Chat securely with friends and family in real-time.",
		icon: "message-processing",
	},
	{
		title: "Activity Tracking",
		description:
			"Monitor your daily activities and track your progress over time.",
		icon: "chart-timeline-variant",
	},
] as const;

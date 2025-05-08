/* eslint-disable @typescript-eslint/no-require-imports */
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router";
import { Image, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Large, Muted } from "@/components/ui/typography";

export default function WelcomeConsentScreen() {
	const { t } = useTranslation();
	return (
		<SafeAreaView edges={["bottom"]} className="flex-1">
			<Image
				source={require("@/assets/images/hero.png")}
				alt="Welcome Consent"
				className="w-full h-1/2 object-cover object-center"
			/>
			<View className="px-4 py-8 gap-4">
				<View className="">
					<H1 className="text-left font-bold">{t("welcome.title")}</H1>
					<H1 className="text-primary font-bold">{t("welcome.title2")}</H1>
				</View>
				<View className="gap-4">
					{FEATURES.map((feature, idx) => (
						<View key={`${feature.title}-${idx}`} className="">
							<View className="">
								<Large>{feature.title}</Large>
								<Muted className="text-lg">{feature.description}</Muted>
							</View>
						</View>
					))}
				</View>
			</View>
			<View className="mt-auto px-4">
				<Link href="/(auth)" prefetch={false} asChild>
					<Button size="lg">
						<Text>{t("button.getStarted")}</Text>
					</Button>
				</Link>
			</View>
		</SafeAreaView>
	);
}

const FEATURES = [
	{
		title: "Lorem Ipsum",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		icon: "account",
	},
	{
		title: "Lorem Ipsum",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		icon: "message-processing",
	},
	{
		title: "Lorem Ipsum",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		icon: "chart-timeline-variant",
	},
] as const;

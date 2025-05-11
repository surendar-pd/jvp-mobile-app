/* eslint-disable @typescript-eslint/no-require-imports */
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, P } from "@/components/ui/typography";

export default function WelcomeConsentScreen() {
	const { t } = useTranslation();
	return (
		<ImageBackground
			source={require("@/assets/images/hero.png")}
			alt="Welcome Consent"
			className="flex-1 object-cover object-center"
		>
			<LinearGradient
				style={styles.background}
				colors={["transparent", "rgba(0,0,0,0.8)"]}
			>
				<SafeAreaView edges={["bottom"]} className="mt-auto">
					<View className="px-4 py-8 gap-4">
						<View className="">
							<H1 className="text-left text-white font-bold">
								{t("welcome.title")}
							</H1>
							<H1 className="text-white font-bold">{t("welcome.title2")}</H1>
							<P className="text-xl text-white mt-4">{t("welcome.subtitle")}</P>
						</View>
					</View>
					<View className="px-4">
						<Link href="/(auth)" prefetch={false} asChild>
							<Button size="lg">
								<Text>{t("button.getStarted")}</Text>
							</Button>
						</Link>
						<Text className="mb-4 text-white text-center text-sm mt-4">
							{t("signup.consent1")}{" "}
							<Link href="/">
								<Text className="underline text-white text-sm">
									{t("signup.termsLink")}
								</Text>
							</Link>{" "}
							{t("signup.consent2")}{" "}
							<Link href="/(aux)">
								<Text className="underline text-white text-sm">
									{t("signup.privacyLink")}
								</Text>
							</Link>
						</Text>
					</View>
				</SafeAreaView>
			</LinearGradient>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: 800,
	},
});

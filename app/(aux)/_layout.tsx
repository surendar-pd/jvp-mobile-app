import { router, Stack } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { useLanguageStore } from "@/store";
import { Toggle } from "@/components/ui/toggle";

export default function AuxLayout() {
	const { t } = useTranslation();

	const { toggleLanguage, currentLanguage } = useLanguageStore();

	const handleLanguageToggle = () => {
		const newLang = currentLanguage === "en" ? "fr" : "en";
		toggleLanguage(newLang);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: true,
						headerLargeTitle: true,
						headerTitle: t("privacyPolicyPage.title"),
						headerLeft: () => (
							<ChevronLeft onPress={() => router.back()} size={24} />
						),
						headerRight: () => (
							<Toggle
								pressed={false}
								onPressedChange={handleLanguageToggle}
								aria-label="Toggle bold"
							>
								<Text>{currentLanguage === "en" ? "FR" : "EN"}</Text>
							</Toggle>
						),
					}}
				/>
			</Stack>
		</SafeAreaView>
	);
}

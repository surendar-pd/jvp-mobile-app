import { router, Stack } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageToggle from "@/components/language-toggle";

export default function AuxLayout() {
	const { t } = useTranslation();

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: true,
						headerTitle: t("privacyPolicyPage.title"),
						headerLeft: () => (
							<ChevronLeft onPress={() => router.back()} size={24} />
						),
						headerRight: () => <LanguageToggle theme="light" />,
					}}
				/>
			</Stack>
		</SafeAreaView>
	);
}

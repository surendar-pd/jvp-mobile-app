import React from "react";
import { useLanguageStore } from "@/store";
import { Toggle } from "./ui/toggle";
import { Text } from "./ui/text";

const LanguageToggle = ({ theme }: { theme: "light" | "dark" }) => {
	const { toggleLanguage, currentLanguage } = useLanguageStore();

	const handleLanguageToggle = () => {
		const newLang = currentLanguage === "en" ? "fr" : "en";
		toggleLanguage(newLang);
	};

	return (
		<Toggle
			pressed={false}
			onPressedChange={handleLanguageToggle}
			aria-label="Toggle bold"
		>
			<Text className={theme === "dark" ? "text-white" : "text-black"}>
				{currentLanguage === "en" ? "Fr" : "En"}
			</Text>
		</Toggle>
	);
};

export default LanguageToggle;

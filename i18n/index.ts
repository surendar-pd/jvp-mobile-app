import * as SecureStore from "expo-secure-store";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import auxilaryEn from "@/constants/auxilary-pages/en";
import auxilaryFr from "@/constants/auxilary-pages/fr";
import en from "./translations/en.json";
import fr from "./translations/fr.json";

const resources = {
	en: {
		translation: {
			...en,
			...auxilaryEn,
		},
	},
	fr: {
		translation: {
			...fr,
			...auxilaryFr,
		},
	},
};

// Initialize i18n with default language first
i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

// Then try to load persisted language
const loadPersistedLanguage = async () => {
	try {
		const storedValue = await SecureStore.getItemAsync("language-storage");
		if (storedValue) {
			const parsedValue = JSON.parse(storedValue);
			if (parsedValue?.state?.currentLanguage) {
				i18n.changeLanguage(parsedValue.state.currentLanguage);
			}
		}
	} catch (error) {
		console.error("Error loading persisted language:", error);
	}
};

loadPersistedLanguage();

export default i18n;

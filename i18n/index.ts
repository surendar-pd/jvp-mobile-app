import * as SecureStore from "expo-secure-store";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: {
			welcome: "Welcome to the App",
			login: "Login",
			signup: "Sign Up",
			dontHaveAccount: "Don't have an account?",
			alreadyHaveAccount: "Already have an account?",
			toggleLanguage: "Toggle Language",
		},
	},
	fr: {
		translation: {
			welcome: "Bienvenue dans l'application",
			login: "Connexion",
			signup: "S'inscrire",
			dontHaveAccount: "Vous n'avez pas de compte ?",
			alreadyHaveAccount: "Vous avez déjà un compte ?",
			toggleLanguage: "Changer de langue",
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

import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import i18n from "@/i18n";

interface AuthState {
	isLoggedIn: boolean;
	setLoggedIn: (value: boolean) => void;
}

interface LanguageState {
	currentLanguage: "en" | "fr";
	toggleLanguage: (code: "en" | "fr") => void;
}

const storage = createJSONStorage(() => ({
	getItem: async (name) => {
		const value = await SecureStore.getItemAsync(name);
		return value ? JSON.parse(value) : null;
	},
	setItem: async (name, value) => {
		await SecureStore.setItemAsync(name, JSON.stringify(value));
	},
	removeItem: async (name) => {
		await SecureStore.deleteItemAsync(name);
	},
}));

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isLoggedIn: true,
			setLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
		}),
		{
			name: "auth-storage",
			storage,
			partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
		}
	)
);

export const useLanguageStore = create<LanguageState>()(
	persist(
		(set) => ({
			currentLanguage: "fr",
			toggleLanguage: (code) => {
				set(() => {
					const newLang = code;
					i18n.changeLanguage(newLang);
					return { currentLanguage: newLang };
				});
			},
		}),
		{
			name: "language-storage",
			storage,
			partialize: (state) => ({ currentLanguage: state.currentLanguage }),
			onRehydrateStorage: () => (state) => {
				if (state?.currentLanguage) {
					i18n.changeLanguage(state.currentLanguage);
				}
			},
		}
	)
);

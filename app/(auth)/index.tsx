/* eslint-disable @typescript-eslint/no-require-imports */
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import type { FieldErrors, Control } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import { Image, View, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "react-i18next";
import AuthHeader from "@/components/auth/auth-header";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useLogin } from "@/hooks/useAuth";
import type { LoginFormData } from "@/schemas/auth";
import { loginSchema } from "@/schemas/auth";

type FormFieldProps = {
	control: Control<LoginFormData>;
	name: keyof LoginFormData;
	placeholder: string;
	secureTextEntry?: boolean;
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
	errors: FieldErrors<LoginFormData>;
};

const FormField = ({
	control,
	name,
	placeholder,
	secureTextEntry,
	autoCapitalize,
	keyboardType,
	errors,
}: FormFieldProps) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<View>
					<Input
						placeholder={placeholder}
						value={value}
						onChangeText={onChange}
						secureTextEntry={secureTextEntry}
						autoCapitalize={autoCapitalize}
						keyboardType={keyboardType}
					/>
					{errors[name] && (
						<Text className="text-red-500 mt-1">
							{errors[name]?.message as string}
						</Text>
					)}
				</View>
			)}
		/>
	);
};

export default function Login() {
	const { t } = useTranslation();
	const { mutate: login, isPending } = useLogin();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormData) => {
		login(data);
	};

	return (
		<ThemedView>
			<SafeAreaView edges={["bottom"]} className="flex-1">
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					className="flex-1"
					keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
				>
					<Image
						source={require("@/assets/images/hero.png")}
						alt="Welcome Consent"
						className="w-full h-1/2 object-cover object-center"
					/>
					<View className="gap-y-4 px-4 pt-8">
						<AuthHeader
							heading={t("login.title")}
							subHeading={t("login.subtitle")}
						/>
						<View>
							<Label htmlFor="email">{t("login.email")}</Label>
							<FormField
								control={control}
								name="email"
								placeholder={t("login.email")}
								autoCapitalize="none"
								keyboardType="email-address"
								errors={errors}
							/>
						</View>
						<View>
							<Label htmlFor="password">{t("login.password")}</Label>
							<FormField
								control={control}
								name="password"
								placeholder={t("login.password")}
								secureTextEntry
								errors={errors}
							/>
						</View>
						<View className="flex-row items-center justify-center gap-x-2">
							<Text>{t("login.dontHaveAccount")}</Text>
							<Text
								onPress={() => router.push("/signup")}
								className="underline"
							>
								{t("login.signupLink")}
							</Text>
						</View>
					</View>
					<View className="px-4 mt-auto">
						<Button
							size="lg"
							variant="default"
							// onPress={handleSubmit(onSubmit)}
							onPress={() => router.push("/(onboarding)")}
							disabled={isPending}
						>
							<Text>{t("button.login")}</Text>
						</Button>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</ThemedView>
	);
}

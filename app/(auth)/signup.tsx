import { zodResolver } from "@hookform/resolvers/zod";

import { router } from "expo-router";
import { useForm, Controller, Control, FieldErrors } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";

import AuthHeader from "@/components/auth/auth-header";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Text } from "@/components/ui/text";
import { useSignup } from "@/hooks/useAuth";
import { signupSchema, type SignupFormData } from "@/schemas/auth";
import { useLanguageStore } from "@/store";

type FormFieldProps = {
	control: Control<SignupFormData>;
	name: keyof SignupFormData;
	placeholder: string;
	secureTextEntry?: boolean;
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
	errors: FieldErrors<SignupFormData>;
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
				<View className="">
					<Input
						placeholder={placeholder}
						value={value}
						onChangeText={onChange}
						secureTextEntry={secureTextEntry}
						autoCapitalize={autoCapitalize}
						keyboardType={keyboardType}
					/>
					{errors[name] && (
						<Text className="text-red-500 mt-1">{errors[name]?.message}</Text>
					)}
				</View>
			)}
		/>
	);
};

export default function Signup() {
	const { t } = useTranslation();

	const { toggleLanguage, currentLanguage } = useLanguageStore();
	const { mutate: signup, isPending } = useSignup();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = (data: SignupFormData) => {
		signup(data);
	};

	function onLabelPress(label: "en" | "fr") {
		return () => {
			toggleLanguage(label);
		};
	}

	return (
		<ThemedView>
			<SafeAreaView edges={["top", "bottom"]} className="flex-1 px-4">
				<AuthHeader
					heading={t("signup.title")}
					subHeading={t("signup.subtitle")}
				/>
				<View className="gap-y-4 flex-1">
					<View>
						<Label htmlFor="username">{t("signup.username")}</Label>
						<FormField
							control={control}
							name="username"
							placeholder={t("signup.username")}
							autoCapitalize="words"
							errors={errors}
						/>
					</View>
					<View>
						<Label htmlFor="email">{t("signup.email")}</Label>
						<FormField
							control={control}
							name="email"
							placeholder={t("signup.email")}
							autoCapitalize="none"
							keyboardType="email-address"
							errors={errors}
						/>
					</View>
					<View>
						<Label htmlFor="password">{t("signup.password")}</Label>
						<FormField
							control={control}
							name="password"
							placeholder={t("signup.password")}
							secureTextEntry
							errors={errors}
						/>
					</View>
					<View className="">
						<Label htmlFor="language">{t("signup.preferredLanguage")}</Label>
						<RadioGroup
							value={currentLanguage}
							onValueChange={(val) => toggleLanguage(val as "en" | "fr")}
							className="gap-3 flex-row"
						>
							<RadioGroupItemWithLabel
								value="en"
								onLabelPress={onLabelPress("en")}
							/>
							<RadioGroupItemWithLabel
								value="fr"
								onLabelPress={onLabelPress("fr")}
							/>
						</RadioGroup>
					</View>
					<View className="">
						<Text className="text-center">
							{t("signup.alreadyHaveAccount")}{" "}
							<Text onPress={() => router.back()} className="underline">
								{t("signup.loginLink")}
							</Text>
						</Text>
					</View>
				</View>
				<Button
					size="lg"
					className="mt-auto"
					variant="default"
					onPress={handleSubmit(onSubmit)}
					disabled={isPending}
				>
					<Text>{t("button.signup")}</Text>
				</Button>
			</SafeAreaView>
		</ThemedView>
	);
}

function RadioGroupItemWithLabel({
	value,
	onLabelPress,
}: {
	value: string;
	onLabelPress: () => void;
}) {
	return (
		<View className="flex-row gap-2  items-center">
			<RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
			<Label
				className="mb-0"
				nativeID={`label-for-${value}`}
				onPress={onLabelPress}
			>
				{value === "en" ? "English" : "Français"}
			</Label>
		</View>
	);
}

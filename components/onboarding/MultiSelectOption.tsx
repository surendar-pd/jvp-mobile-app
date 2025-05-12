import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Check } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface MultiSelectOptionProps {
	value: string;
	label: string;
	selected: boolean;
	onToggle: (value: string) => void;
	disabled?: boolean;
}

export const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({
	value,
	label,
	selected,
	onToggle,
	disabled = false,
}) => {
	// Log when component re-renders with updated props
	useEffect(() => {}, [value, selected]);

	const handlePress = () => {
		if (!disabled) {
			onToggle(value);
		}
	};

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			className={cn(
				"w-full p-4 my-1 rounded-lg border",
				selected ? "bg-blue-50 border-blue-500" : "bg-white border-gray-200",
				disabled && "opacity-50"
			)}
			onPress={handlePress}
			disabled={disabled}
			testID={`multi-option-${value}`}
		>
			<View className="flex-row items-center justify-between">
				<Text
					className={cn(
						"text-base text-wrap max-w-[90%]",
						selected ? "text-blue-700 font-medium" : "text-gray-700"
					)}
				>
					{label}
				</Text>
				{selected && <Check size={20} color="#3b82f6" />}
			</View>
		</TouchableOpacity>
	);
};

export default MultiSelectOption;

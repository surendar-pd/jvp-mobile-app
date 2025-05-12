import React, { useState, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { SheetManager } from "react-native-actions-sheet";
import { Text } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface DOBInputProps {
	label: string;
	value?: string;
	onValueChange: (value: string) => void;
}

const DOBInput: React.FC<DOBInputProps> = ({ label, value, onValueChange }) => {
	const [displayValue, setDisplayValue] = useState<string>("");

	// Format the display value based on the selected date
	useEffect(() => {
		if (value) {
			try {
				const [year, month, day] = value.split("-").map(Number);

				// Create a date object and format it for display
				const date = new Date(year, month - 1, day);
				const options: Intl.DateTimeFormatOptions = {
					year: "numeric",
					month: "long",
					day: "numeric",
				};
				setDisplayValue(date.toLocaleDateString(undefined, options));
			} catch {
				setDisplayValue("");
			}
		}
	}, [value]);

	// Handle opening the sheet
	const openPicker = () => {
		SheetManager.show("date-of-birth-picker", {
			payload: {
				initialValue: value,
				onValueSelected: (formattedDate: string, displayDate: string) => {
					// Store the formatted date (YYYY-MM-DD) in the database
					onValueChange(formattedDate);
					// Update display with a human-readable format
					setDisplayValue(displayDate);
				},
			},
		});
	};

	return (
		<View className="mb-4">
			<Label>{label}</Label>
			<TouchableOpacity
				onPress={openPicker}
				className={cn(
					"flex-row items-center justify-between mt-1 p-4 border rounded-md",
					displayValue ? "border-input" : "border-gray-300"
				)}
			>
				<Text className={displayValue ? "text-foreground" : "text-gray-400"}>
					{displayValue || `Select ${label.toLowerCase()}`}
				</Text>
				<ChevronDown size={20} className="text-gray-500" />
			</TouchableOpacity>
		</View>
	);
};

export default DOBInput;

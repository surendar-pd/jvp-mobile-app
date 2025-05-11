import React, { useState, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { SheetManager } from "react-native-actions-sheet";
import { Text } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type MeasurementType = "height" | "weight";
type UnitSystem = "metric" | "imperial";

interface MeasurementInputProps {
	type: MeasurementType;
	unitSystem: UnitSystem;
	label: string;
	value?: number;
	onValueChange: (value: number) => void;
}

const MeasurementInput: React.FC<MeasurementInputProps> = ({
	type,
	unitSystem,
	label,
	value,
	onValueChange,
}) => {
	const [displayValue, setDisplayValue] = useState<string>("");

	// Determine which sheet to open based on type and unit system
	const getSheetId = () => {
		if (type === "height") {
			return unitSystem === "metric"
				? "height-metric-picker"
				: "height-imperial-picker";
		} else {
			return unitSystem === "metric"
				? "weight-metric-picker"
				: "weight-imperial-picker";
		}
	};

	// Format the display value based on the selected value in the user's preferred unit system
	useEffect(() => {
		if (value) {
			if (type === "height") {
				if (unitSystem === "metric") {
					setDisplayValue(`${Math.round(value)} cm`);
				} else {
					// Convert cm to feet and inches
					const totalInches = Math.round(value / 2.54);
					const feet = Math.floor(totalInches / 12);
					const inches = totalInches % 12;
					setDisplayValue(`${feet}' ${inches}"`);
				}
			} else {
				// weight
				if (unitSystem === "metric") {
					setDisplayValue(`${Math.round(value)} kg`);
				} else {
					// Convert kg to lbs
					const lbs = Math.round(value * 2.2046);
					setDisplayValue(`${lbs} lbs`);
				}
			}
		}
	}, [value, unitSystem, type]);

	// Handle opening the sheet
	const openPicker = () => {
		const sheetId = getSheetId();

		SheetManager.show(sheetId, {
			payload: {
				initialValue: value,
				onValueSelected: (convertedMetricValue: number) => {
					// Always store the metric value in the database
					onValueChange(convertedMetricValue);
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
					"flex-row items-center justify-between mt-1 p-3 border rounded-md",
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

export default MeasurementInput;

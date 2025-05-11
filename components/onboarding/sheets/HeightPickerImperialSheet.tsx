import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeightPickerPayload {
	initialValue?: number;
	onValueSelected?: (value: number, unit: string, cmValue: number) => void;
}

interface HeightPickerProps {
	payload?: HeightPickerPayload;
}

function HeightPickerImperialSheet(props: HeightPickerProps) {
	const { payload } = props;
	const { initialValue, onValueSelected } = payload || {};

	// Generate array of height values in feet and inches
	type HeightValue = { feet: number; inches: number };
	const values: HeightValue[] = [];
	for (let feet = 4; feet <= 7; feet++) {
		for (let inches = 0; inches < 12; inches++) {
			values.push({ feet, inches });
		}
	}

	// Find initial index based on initialValue (which is in cm)
	const findInitialIndex = () => {
		if (!initialValue) return 20; // Default to 5'8"

		// Convert cm to total inches
		const totalInches = Math.round(initialValue / 2.54);

		// Find closest matching feet/inches combination
		return (
			values.findIndex((v) => {
				const valueInInches = v.feet * 12 + v.inches;
				return valueInInches === totalInches;
			}) || 20
		); // Default to 5'8" if no match
	};

	const [currentIndex, setCurrentIndex] = useState(findInitialIndex());
	const scrollViewRef = useRef<ScrollView>(null);
	const itemHeight = 50;

	useEffect(() => {
		// Scroll to selected value when component mounts
		if (scrollViewRef.current) {
			setTimeout(() => {
				scrollViewRef.current?.scrollTo({
					y: currentIndex * itemHeight,
					animated: false,
				});
			}, 100);
		}
	}, []);

	const handleConfirm = () => {
		const selected = values[currentIndex];
		if (onValueSelected) {
			// Convert feet/inches to cm for storage
			const totalInches = selected.feet * 12 + selected.inches;
			const cmValue = totalInches * 2.54;
			onValueSelected(totalInches, "in", cmValue);
		}
	};

	return (
		<ActionSheet>
			<View className="p-4 border-b border-gray-200">
				<Text className="text-lg font-semibold text-center">
					Select Height (ft, in)
				</Text>
			</View>

			<View className="h-[250px] relative">
				{/* Highlight for selected item */}
				<View
					className="absolute w-full h-[50px] bg-blue-50 top-[100px] border-t border-b border-blue-200"
					pointerEvents="none"
				/>

				<ScrollView
					ref={scrollViewRef}
					className="flex-1"
					showsVerticalScrollIndicator={false}
					snapToInterval={itemHeight}
					decelerationRate="fast"
					onMomentumScrollEnd={(event) => {
						const y = event.nativeEvent.contentOffset.y;
						const index = Math.round(y / itemHeight);
						setCurrentIndex(Math.min(Math.max(0, index), values.length - 1));
					}}
				>
					{values.map((value, index) => (
						<TouchableOpacity
							key={index}
							className={cn(
								"h-[50px] justify-center items-center",
								currentIndex === index ? "opacity-100" : "opacity-50"
							)}
							onPress={() => {
								setCurrentIndex(index);
								scrollViewRef.current?.scrollTo({
									y: index * itemHeight,
									animated: true,
								});
							}}
						>
							<Text className="text-lg font-medium">
								{value.feet}' {value.inches}"
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			<View className="p-4 border-t border-gray-200 flex-row justify-end gap-2">
				<Button
					variant="outline"
					onPress={() => SheetManager.hide("height-imperial-picker")}
					className="flex-1 mr-2"
				>
					<Text>Cancel</Text>
				</Button>
				<Button
					onPress={() => {
						handleConfirm();
						SheetManager.hide("height-imperial-picker");
					}}
					className="flex-1"
				>
					<Text>Confirm</Text>
				</Button>
			</View>
		</ActionSheet>
	);
}

export default HeightPickerImperialSheet;

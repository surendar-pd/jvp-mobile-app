import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeightPickerImperialSheetProps {
	payload?: {
		initialValue?: number;
		onValueSelected?: (
			value: number,
			unit: string,
			convertedMetricValue: number
		) => void;
	};
}

function HeightPickerImperialSheet(props: HeightPickerImperialSheetProps) {
	const { payload } = props;
	const { initialValue, onValueSelected } = payload || {};
	const itemHeight = 50;

	// Generate array of height values in feet and inches
	const values: { feet: number; inches: number }[] = [];
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
		const bestMatchIndex = values.findIndex((v) => {
			const valueInInches = v.feet * 12 + v.inches;
			return valueInInches === totalInches;
		});

		if (bestMatchIndex !== -1) return bestMatchIndex;

		// If exact match not found, find closest
		return values.reduce((closestIndex, value, index) => {
			const currentInches = value.feet * 12 + value.inches;
			const currentDiff = Math.abs(currentInches - totalInches);

			const closestInches =
				values[closestIndex].feet * 12 + values[closestIndex].inches;
			const closestDiff = Math.abs(closestInches - totalInches);

			return currentDiff < closestDiff ? index : closestIndex;
		}, 0);
	};

	const [currentIndex, setCurrentIndex] = useState(findInitialIndex());
	const scrollViewRef = useRef<ScrollView>(null);

	// Helper function to scroll to a specific index
	const scrollToIndex = (index: number, animated: boolean = true) => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo({
				y: index * itemHeight,
				animated,
			});
		}
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			scrollToIndex(currentIndex, false);
		}, 100);

		return () => clearTimeout(timeoutId);
	}, []);

	const handleValueChange = (index: number) => {
		setCurrentIndex(index);
	};

	const handleConfirm = () => {
		const selected = values[currentIndex];
		if (onValueSelected) {
			// Convert feet/inches to cm for storage
			const totalInches = selected.feet * 12 + selected.inches;
			const cmValue = totalInches * 2.54;
			onValueSelected(Math.round(totalInches), "in", Math.round(cmValue));
		}
	};

	return (
		<ActionSheet
			onBeforeShow={() => {
				// Reset to the correct index when showing
				const index = findInitialIndex();
				setCurrentIndex(index);

				// Use a timeout to ensure the scroll happens after render
				setTimeout(() => {
					scrollToIndex(index, false);
				}, 50);
			}}
		>
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
						handleValueChange(Math.min(Math.max(0, index), values.length - 1));
					}}
					contentContainerStyle={{
						paddingTop: 100, // Add top padding to align items with the highlight
						paddingBottom: 100, // Add bottom padding for smooth scrolling
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
								scrollToIndex(index);
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

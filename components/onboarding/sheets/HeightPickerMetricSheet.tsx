import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeightPickerMetricSheetProps {
	payload?: {
		initialValue?: number;
		onValueSelected?: (
			value: number,
			unit: string,
			displayValue: number
		) => void;
	};
}

function HeightPickerMetricSheet(props: HeightPickerMetricSheetProps) {
	const { payload } = props;
	const { initialValue, onValueSelected } = payload || {};

	// Generate array of height values in centimeters (140-220 cm)
	const values = Array.from({ length: 81 }, (_, i) => 140 + i);
	const itemHeight = 50;

	// Find initial index based on initialValue
	const findInitialIndex = () => {
		if (!initialValue) return Math.floor(values.length / 2);

		// Find closest match to initialValue
		let bestMatchIndex = values.findIndex(
			(v) => v === Math.round(initialValue)
		);
		if (bestMatchIndex === -1) {
			bestMatchIndex = values.reduce((closestIndex, value, index, arr) => {
				return Math.abs(value - initialValue) <
					Math.abs(arr[closestIndex] - initialValue)
					? index
					: closestIndex;
			}, 0);
		}

		return bestMatchIndex;
	};

	const [currentIndex, setCurrentIndex] = useState(findInitialIndex());
	const scrollViewRef = useRef<ScrollView>(null);

	// Handle proper alignment and initial scrolling
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			scrollToIndex(currentIndex, false);
		}, 100);

		return () => clearTimeout(timeoutId);
	}, []);

	// Helper function to scroll to a specific index
	const scrollToIndex = (index: number, animated: boolean = true) => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo({
				y: index * itemHeight,
				animated,
			});
		}
	};

	const handleValueChange = (index: number) => {
		setCurrentIndex(index);
	};

	const handleConfirm = () => {
		const value = values[currentIndex];
		if (onValueSelected) {
			// For metric height, the displayed value is the same as stored value
			onValueSelected(value, "cm", value);
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
					Select Height (cm)
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
							<Text className="text-lg font-medium">{value} cm</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			<View className="p-4 border-t border-gray-200 flex-row justify-end gap-2">
				<Button
					variant="outline"
					onPress={() => SheetManager.hide("height-metric-picker")}
					className="flex-1 mr-2"
				>
					<Text>Cancel</Text>
				</Button>
				<Button
					onPress={() => {
						handleConfirm();
						SheetManager.hide("height-metric-picker");
					}}
					className="flex-1"
				>
					<Text>Confirm</Text>
				</Button>
			</View>
		</ActionSheet>
	);
}

export default HeightPickerMetricSheet;

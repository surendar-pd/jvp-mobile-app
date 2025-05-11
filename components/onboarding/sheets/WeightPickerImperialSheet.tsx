import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WeightPickerImperialSheetProps {
	payload?: {
		initialValue?: number;
		onValueSelected?: (
			value: number,
			unit: string,
			convertedValue: number
		) => void;
	};
}

function WeightPickerImperialSheet(props: WeightPickerImperialSheetProps) {
	const { payload } = props;
	const { initialValue, onValueSelected } = payload || {};

	// Generate array of weight values in pounds (88-330 lbs)
	const values = Array.from({ length: 243 }, (_, i) => 88 + i);

	// Find initial index based on initialValue (which is in kg)
	const findInitialIndex = () => {
		if (!initialValue) return Math.floor(values.length / 2);

		// Convert kg to pounds
		const lbsValue = initialValue * 2.2046;

		// Find closest match to the converted value
		const bestMatchIndex = values.reduce((closestIndex, value, index) => {
			return Math.abs(value - lbsValue) <
				Math.abs(values[closestIndex] - lbsValue)
				? index
				: closestIndex;
		}, 0);

		return bestMatchIndex;
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
		const value = values[currentIndex];
		if (onValueSelected) {
			// Convert pounds to kg for storage
			const kgValue = value / 2.2046;
			onValueSelected(value, "lbs", kgValue);
		}
	};

	return (
		<ActionSheet>
			<View className="p-4 border-b border-gray-200">
				<Text className="text-lg font-semibold text-center">
					Select Weight (lbs)
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
							<Text className="text-lg font-medium">{value} lbs</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			<View className="p-4 border-t border-gray-200 flex-row justify-end gap-2">
				<Button
					variant="outline"
					onPress={() => SheetManager.hide("weight-imperial-picker")}
					className="flex-1 mr-2"
				>
					<Text>Cancel</Text>
				</Button>
				<Button
					onPress={() => {
						handleConfirm();
						SheetManager.hide("weight-imperial-picker");
					}}
					className="flex-1"
				>
					<Text>Confirm</Text>
				</Button>
			</View>
		</ActionSheet>
	);
}

export default WeightPickerImperialSheet;

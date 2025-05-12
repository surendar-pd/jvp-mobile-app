import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DateOfBirthPickerSheetProps {
	payload?: {
		initialValue?: string;
		onValueSelected?: (value: string, displayValue: string) => void;
	};
}

function DateOfBirthPickerSheet(props: DateOfBirthPickerSheetProps) {
	const { payload } = props;
	const { initialValue, onValueSelected } = payload || {};

	// Parse initial value (expected format: "YYYY-MM-DD")
	const parseInitialValue = () => {
		if (!initialValue) return { day: 15, month: 6, year: 1990 };

		try {
			const [year, month, day] = initialValue.split("-").map(Number);
			return {
				day: day || 15,
				month: month || 6,
				year: year || 1990,
			};
		} catch {
			return { day: 15, month: 6, year: 1990 };
		}
	};

	const {
		day: initialDay,
		month: initialMonth,
		year: initialYear,
	} = parseInitialValue();

	// Generate arrays for days, months, and years
	const days = Array.from({ length: 31 }, (_, i) => i + 1);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // 100 years back from current year

	const itemHeight = 50;

	// Find initial indexes
	const findInitialDayIndex = () =>
		days.findIndex((d) => d === initialDay) || 14;
	const findInitialMonthIndex = () =>
		months.findIndex((_, i) => i + 1 === initialMonth) || 5;
	const findInitialYearIndex = () =>
		years.findIndex((y) => y === initialYear) || 30;

	const [currentDayIndex, setCurrentDayIndex] = useState(findInitialDayIndex());
	const [currentMonthIndex, setCurrentMonthIndex] = useState(
		findInitialMonthIndex()
	);
	const [currentYearIndex, setCurrentYearIndex] = useState(
		findInitialYearIndex()
	);

	const dayScrollViewRef = useRef<ScrollView>(null);
	const monthScrollViewRef = useRef<ScrollView>(null);
	const yearScrollViewRef = useRef<ScrollView>(null);

	// Handle proper alignment and initial scrolling
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			scrollToIndex(dayScrollViewRef, currentDayIndex, false);
			scrollToIndex(monthScrollViewRef, currentMonthIndex, false);
			scrollToIndex(yearScrollViewRef, currentYearIndex, false);
		}, 100);

		return () => clearTimeout(timeoutId);
	}, []);

	// Helper function to scroll to a specific index
	const scrollToIndex = (
		ref: React.RefObject<ScrollView | null>,
		index: number,
		animated: boolean = true
	) => {
		if (ref.current) {
			ref.current.scrollTo({
				y: index * itemHeight,
				animated,
			});
		}
	};

	const handleConfirm = () => {
		const selectedDay = days[currentDayIndex];
		const selectedMonth = currentMonthIndex + 1; // Months are 0-indexed in array, but 1-indexed for storage
		const selectedYear = years[currentYearIndex];

		// Format for database storage (YYYY-MM-DD)
		const formattedDate = `${selectedYear}-${selectedMonth.toString().padStart(2, "0")}-${selectedDay.toString().padStart(2, "0")}`;

		// Format for display (Month Day, Year)
		const displayDate = `${months[currentMonthIndex]} ${selectedDay}, ${selectedYear}`;

		if (onValueSelected) {
			onValueSelected(formattedDate, displayDate);
		}
	};

	return (
		<ActionSheet
			onBeforeShow={() => {
				// Reset to the correct index when showing
				const dayIndex = findInitialDayIndex();
				const monthIndex = findInitialMonthIndex();
				const yearIndex = findInitialYearIndex();

				setCurrentDayIndex(dayIndex);
				setCurrentMonthIndex(monthIndex);
				setCurrentYearIndex(yearIndex);

				// Use a timeout to ensure the scroll happens after render
				setTimeout(() => {
					scrollToIndex(dayScrollViewRef, dayIndex, false);
					scrollToIndex(monthScrollViewRef, monthIndex, false);
					scrollToIndex(yearScrollViewRef, yearIndex, false);
				}, 50);
			}}
		>
			<View className="p-4 border-b border-gray-200">
				<Text className="text-lg font-semibold text-center">
					Select Date of Birth
				</Text>
			</View>

			<View className="h-[250px] relative flex-row">
				{/* Day Picker */}
				<View className="flex-1 relative">
					{/* Highlight for selected item */}
					<View
						className="absolute w-full h-[50px] bg-blue-50 top-[100px] border-t border-b border-blue-200"
						pointerEvents="none"
					/>
					<ScrollView
						ref={dayScrollViewRef}
						className="flex-1"
						showsVerticalScrollIndicator={false}
						snapToInterval={itemHeight}
						decelerationRate="fast"
						onMomentumScrollEnd={(event) => {
							const y = event.nativeEvent.contentOffset.y;
							const index = Math.round(y / itemHeight);
							setCurrentDayIndex(Math.min(Math.max(0, index), days.length - 1));
						}}
						contentContainerStyle={{
							paddingTop: 100,
							paddingBottom: 100,
						}}
					>
						{days.map((day, index) => (
							<TouchableOpacity
								key={`day-${index}`}
								className={cn(
									"h-[50px] justify-center items-center",
									currentDayIndex === index ? "opacity-100" : "opacity-50"
								)}
								onPress={() => {
									setCurrentDayIndex(index);
									scrollToIndex(dayScrollViewRef, index);
								}}
							>
								<Text className="text-lg font-medium">{day}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/* Month Picker */}
				<View className="flex-2 relative">
					{/* Highlight for selected item */}
					<View
						className="absolute w-full h-[50px] bg-blue-50 top-[100px] border-t border-b border-blue-200"
						pointerEvents="none"
					/>
					<ScrollView
						ref={monthScrollViewRef}
						className="flex-1"
						showsVerticalScrollIndicator={false}
						snapToInterval={itemHeight}
						decelerationRate="fast"
						onMomentumScrollEnd={(event) => {
							const y = event.nativeEvent.contentOffset.y;
							const index = Math.round(y / itemHeight);
							setCurrentMonthIndex(
								Math.min(Math.max(0, index), months.length - 1)
							);
						}}
						contentContainerStyle={{
							paddingTop: 100,
							paddingBottom: 100,
						}}
					>
						{months.map((month, index) => (
							<TouchableOpacity
								key={`month-${index}`}
								className={cn(
									"h-[50px] justify-center items-center px-4",
									currentMonthIndex === index ? "opacity-100" : "opacity-50"
								)}
								onPress={() => {
									setCurrentMonthIndex(index);
									scrollToIndex(monthScrollViewRef, index);
								}}
							>
								<Text className="text-lg font-medium">{month}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/* Year Picker */}
				<View className="flex-1 relative">
					{/* Highlight for selected item */}
					<View
						className="absolute w-full h-[50px] bg-blue-50 top-[100px] border-t border-b border-blue-200"
						pointerEvents="none"
					/>
					<ScrollView
						ref={yearScrollViewRef}
						className="flex-1"
						showsVerticalScrollIndicator={false}
						snapToInterval={itemHeight}
						decelerationRate="fast"
						onMomentumScrollEnd={(event) => {
							const y = event.nativeEvent.contentOffset.y;
							const index = Math.round(y / itemHeight);
							setCurrentYearIndex(
								Math.min(Math.max(0, index), years.length - 1)
							);
						}}
						contentContainerStyle={{
							paddingTop: 100,
							paddingBottom: 100,
						}}
					>
						{years.map((year, index) => (
							<TouchableOpacity
								key={`year-${index}`}
								className={cn(
									"h-[50px] justify-center items-center",
									currentYearIndex === index ? "opacity-100" : "opacity-50"
								)}
								onPress={() => {
									setCurrentYearIndex(index);
									scrollToIndex(yearScrollViewRef, index);
								}}
							>
								<Text className="text-lg font-medium">{year}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</View>

			<View className="p-4 border-t border-gray-200 flex-row justify-end gap-2">
				<Button
					variant="outline"
					onPress={() => SheetManager.hide("date-of-birth-picker")}
					className="flex-1 mr-2"
				>
					<Text>Cancel</Text>
				</Button>
				<Button
					onPress={() => {
						handleConfirm();
						SheetManager.hide("date-of-birth-picker");
					}}
					className="flex-1"
				>
					<Text>Confirm</Text>
				</Button>
			</View>
		</ActionSheet>
	);
}

export default DateOfBirthPickerSheet;

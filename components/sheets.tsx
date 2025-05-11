import { registerSheet } from "react-native-actions-sheet";
import HeightPickerMetricSheet from "./onboarding/sheets/HeightPickerMetricSheet";
import HeightPickerImperialSheet from "./onboarding/sheets/HeightPickerImperialSheet";
import WeightPickerMetricSheet from "./onboarding/sheets/WeightPickerMetricSheet";
import WeightPickerImperialSheet from "./onboarding/sheets/WeightPickerImperialSheet";

// Register all sheets
registerSheet("height-metric-picker", HeightPickerMetricSheet);
registerSheet("height-imperial-picker", HeightPickerImperialSheet);
registerSheet("weight-metric-picker", WeightPickerMetricSheet);
registerSheet("weight-imperial-picker", WeightPickerImperialSheet);

// Type definitions for better intellisense
declare module "react-native-actions-sheet" {
	interface Sheets {
		"height-metric-picker": {
			payload?: {
				initialValue?: number;
				onValueSelected: (
					value: number,
					unit: string,
					convertedMetricValue: number
				) => void;
			};
		};
		"height-imperial-picker": {
			payload?: {
				initialValue?: number;
				onValueSelected: (
					value: number,
					unit: string,
					convertedMetricValue: number
				) => void;
			};
		};
		"weight-metric-picker": {
			payload?: {
				initialValue?: number;
				onValueSelected: (
					value: number,
					unit: string,
					convertedMetricValue: number
				) => void;
			};
		};
		"weight-imperial-picker": {
			payload?: {
				initialValue?: number;
				onValueSelected: (
					value: number,
					unit: string,
					convertedMetricValue: number
				) => void;
			};
		};
	}
}

export {};

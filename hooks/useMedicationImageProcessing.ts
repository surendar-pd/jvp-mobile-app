import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import mime from "mime";

type Medication = {
	name: string;
	dosage: string;
	occurrence: string;
};

interface ProcessImageResponse {
	medications: Medication[];
}

// Function to process the image with the API
const processImageWithApi = async (
	base64Image: string
): Promise<ProcessImageResponse> => {
	const response = await fetch(
		"https://xlwj9d64-5678.use.devtunnels.ms/webhook/process-medical-report",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ image: base64Image }),
		}
	);

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}

	return await response.json();
};

// Convert image URI to base64
const convertImageToDataURI = async (uri: string): Promise<string> => {
	const b64 = await FileSystem.readAsStringAsync(uri, {
		encoding: FileSystem.EncodingType.Base64,
	});

	// mime.getType will return e.g. "image/jpeg" or "image/png"
	const type = mime.getType(uri) || "application/octet-stream";
	return `data:${type};base64,${b64}`;
};

export function useMedicationImageProcessing() {
	// Define the mutation for processing the image
	const mutation = useMutation({
		mutationFn: async (uri: string) => {
			const base64 = await convertImageToDataURI(uri);
			return await processImageWithApi(base64);
		},
		onError: (error: Error) => {
			console.error("Error processing medication image:", error);
			Alert.alert(
				"Error",
				"There was a problem processing your image. Please try again or add medications manually."
			);
		},
	});

	// Function to handle taking a picture
	const takePicture = async (): Promise<string | null> => {
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert(
				"Permission Denied",
				"We need camera access to take pictures of your medication."
			);
			return null;
		}

		const result = await ImagePicker.launchCameraAsync({
			// allowsEditing: true,
			quality: 0.7,
			base64: true,
		});

		if (!result.canceled && result.assets && result.assets.length > 0) {
			return result.assets[0].uri;
		}

		return null;
	};

	// Function to handle picking an image from the gallery
	const pickImage = async (): Promise<string | null> => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert(
				"Permission Denied",
				"We need gallery access to select pictures of your medication."
			);
			return null;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			// allowsEditing: true,

			quality: 0.7,
			base64: true,
		});

		if (!result.canceled && result.assets && result.assets.length > 0) {
			return result.assets[0].uri;
		}

		return null;
	};

	return {
		processImage: mutation.mutate,
		takePicture,
		pickImage,
		isProcessing: mutation.isPending,
		data: mutation.data,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
		reset: mutation.reset,
	};
}

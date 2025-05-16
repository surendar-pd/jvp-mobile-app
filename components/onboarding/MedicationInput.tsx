import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Camera, ImageUp, Plus, Trash2, Edit2 } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Medication,
	useMedicationImageProcessing,
} from "@/hooks/useMedicationImageProcessing";

type MedicationInputProps = {
	value?: Medication[];
	onValueChange: (medications: Medication[]) => void;
};

const MedicationInput = ({
	value = [],
	onValueChange,
}: MedicationInputProps) => {
	// Ensure medications is always initialized as an array
	const [medications, setMedications] = useState<Medication[]>(
		Array.isArray(value) ? value : []
	);

	const [showAddForm, setShowAddForm] = useState(false);
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [newMedication, setNewMedication] = useState<Medication>({
		original: "",
		corrected: "",
		matched: false,
		category: null,
		dosage: "",
		frequency: "",
	});

	// Use our custom hook for image processing
	const {
		takePicture: takePhoto,
		pickImage: selectImage,
		processImage,
		isProcessing,
		data: processingResult,
		isSuccess,
	} = useMedicationImageProcessing();

	// Updated useEffect to properly sync component state with parent value
	useEffect(() => {
		// When parent value changes, update our local state (but only if it's different)
		if (
			value &&
			Array.isArray(value) &&
			JSON.stringify(value) !== JSON.stringify(medications)
		) {
			setMedications(value);
		}
		// Initialize with empty array if value is undefined
		else if (!value) {
			setMedications([]);
		}
	}, [medications, value]);

	// Effect to handle successful image processing
	useEffect(() => {
		if (
			isSuccess &&
			processingResult &&
			processingResult.correctedMedications
		) {
			const apiMedications = processingResult.correctedMedications;

			if (apiMedications.length > 0) {
				// Add these medications to our list
				updateMedications([...medications, ...apiMedications]);
			} else {
				Alert.alert(
					"No Medications Found",
					"We couldn't identify any medications in the image. Please add them manually."
				);
			}
		}
	}, [isSuccess]);

	// Updated function to set medications with internal flag
	const updateMedications = (newMeds: Medication[]) => {
		// Update local state first
		setMedications(newMeds);
		// Then notify parent component of change
		onValueChange(newMeds);
	};

	// Reset form without hiding it by default
	const resetForm = (hideForm = false) => {
		setNewMedication({
			original: "",
			corrected: "",
			matched: false,
			category: null,
			dosage: "",
			frequency: "",
		});
		if (hideForm) {
			setShowAddForm(false);
		}
		setEditIndex(null);
	};

	const addMedication = () => {
		if (!newMedication.corrected.trim()) {
			Alert.alert(
				"Missing Information",
				"Please enter at least the medication name."
			);
			return;
		}

		if (editIndex !== null) {
			// Update existing medication
			const updatedMedications = [...medications];
			updatedMedications[editIndex] = newMedication;

			// Update both local and parent state
			setMedications(updatedMedications);
			onValueChange(updatedMedications);

			// When updating, hide the form
			resetForm(true);
		} else {
			// Add new medication
			const updatedMedications = [...medications, newMedication];

			// Update both local and parent state
			setMedications(updatedMedications);
			onValueChange(updatedMedications);

			// When adding a new medication, keep the form visible but clear fields
			resetForm(true);
		}
	};

	const editMedication = (index: number) => {
		setNewMedication(medications[index]);
		setEditIndex(index);
		setShowAddForm(true);
	};

	const deleteMedication = (index: number) => {
		Alert.alert(
			"Delete Medication",
			"Are you sure you want to delete this medication?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: () => {
						const updatedMedications = medications.filter(
							(_, i) => i !== index
						);
						updateMedications(updatedMedications);
					},
				},
			]
		);
	};

	const handleTakePicture = async () => {
		const uri = await takePhoto();
		if (uri) {
			processImage(uri);
		}
	};

	const handlePickImage = async () => {
		const uri = await selectImage();
		if (uri) {
			processImage(uri);
		}
	};

	return (
		<View className="pt-4">
			{/* List of existing medications */}
			{medications.length > 0 && (
				<View className="mb-4">
					{medications.map((medication, index) => (
						<View
							key={index}
							className="flex-row justify-between items-center p-3 bg-gray-50 rounded-md mb-2"
						>
							<View className="flex-1">
								<Text className="font-medium">{medication.corrected}</Text>
								<Text className="text-gray-600 text-sm">
									{medication.dosage}
									{medication.frequency ? ` • ${medication.frequency}` : ""}
									{medication.category ? ` • ${medication.category}` : ""}
								</Text>
							</View>
							<View className="flex-row">
								<TouchableOpacity
									onPress={() => editMedication(index)}
									className="p-2 mr-2"
								>
									<Edit2 size={18} color="#4B5563" />
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => deleteMedication(index)}
									className="p-2"
								>
									<Trash2 size={18} color="#EF4444" />
								</TouchableOpacity>
							</View>
						</View>
					))}
				</View>
			)}

			{/* Add medication form */}
			{showAddForm ? (
				<View className="bg-gray-50 p-4 rounded-lg mb-4">
					<Text className="font-medium mb-3">
						{editIndex !== null ? "Edit Medication" : "Add Medication"}
					</Text>

					<View className="mb-3">
						<Label htmlFor="med-name">Medication Name</Label>
						<Input
							id="med-name"
							placeholder="e.g., Aspirin, Lipitor"
							value={newMedication.corrected}
							onChangeText={(text) =>
								setNewMedication({ ...newMedication, corrected: text })
							}
							className="mt-1"
						/>
					</View>

					<View className="mb-3">
						<Label htmlFor="med-dosage">Dosage</Label>
						<Input
							id="med-dosage"
							placeholder="e.g., 500mg, 10mg"
							value={newMedication.dosage}
							onChangeText={(text) =>
								setNewMedication({ ...newMedication, dosage: text })
							}
							className="mt-1"
						/>
					</View>

					<View className="mb-4">
						<Label htmlFor="med-occurrence">How Often</Label>
						<Input
							id="med-occurrence"
							placeholder="e.g., Once daily, Twice a day"
							value={newMedication.frequency}
							onChangeText={(text) =>
								setNewMedication({ ...newMedication, frequency: text })
							}
							className="mt-1"
						/>
					</View>

					<View className="mb-4">
						<Label htmlFor="med-category">Category (optional)</Label>
						<Input
							id="med-category"
							placeholder="e.g., Antibiotic, Diuretic"
							value={newMedication.category || ""}
							onChangeText={(text) =>
								setNewMedication({ ...newMedication, category: text || null })
							}
							className="mt-1"
						/>
					</View>

					<View className="flex-row justify-end gap-2">
						<Button variant="outline" onPress={() => resetForm(true)}>
							<Text>Cancel</Text>
						</Button>
						<Button onPress={addMedication}>
							<Text>{editIndex !== null ? "Update" : "Add"}</Text>
						</Button>
					</View>
				</View>
			) : (
				<View className="mb-4">
					<Button
						onPress={() => setShowAddForm(true)}
						variant="outline"
						className="flex-row items-center justify-center"
						iconLeft={Plus}
					>
						<Text>Add Medication Manually</Text>
					</Button>
				</View>
			)}

			{/* Image upload section */}
			<Text className="font-medium mb-2">
				Or upload a photo of your prescriptions
			</Text>
			<Text className="text-gray-600 text-sm mb-3">
				We can extract medication information from your prescription or
				medication labels.
			</Text>

			<View className="flex-row justify-center gap-3 mb-4">
				<Button
					variant="outline"
					iconLeft={Camera}
					onPress={handleTakePicture}
					disabled={isProcessing}
					className="flex-1"
				>
					<Text>Take Photo</Text>
				</Button>
				<Button
					variant="outline"
					iconLeft={ImageUp}
					onPress={handlePickImage}
					disabled={isProcessing}
					className="flex-1"
				>
					<Text>Upload Photo</Text>
				</Button>
			</View>

			{isProcessing && (
				<View className="flex-row justify-center items-center p-4">
					<ActivityIndicator size="small" color="#0891b2" />
					<Text className="ml-2 text-primary">Processing your image...</Text>
				</View>
			)}
		</View>
	);
};

export default MedicationInput;

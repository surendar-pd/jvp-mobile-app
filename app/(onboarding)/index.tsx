import React, { useState } from "react";
import { ScrollView, View, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft, ArrowRight, Check, AlertCircle } from "lucide-react-native";

import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import QuestionCard from "@/components/onboarding/QuestionCard";
import SelectableOption from "@/components/onboarding/SelectableOption";
import MultiSelectOption from "@/components/onboarding/MultiSelectOption";
import MeasurementInput from "@/components/onboarding/MeasurementInput";
import DOBInput from "@/components/onboarding/DOBInput";
import { onboardingQuestions } from "@/constants/onboarding/questions";

const OnboardingScreen = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState<Record<string, any>>({});
	const [skipped, setSkipped] = useState<number[]>([]);
	const [followUpQuestions, setFollowUpQuestions] = useState<
		Record<string, boolean>
	>({});

	const TOTAL_STEPS = onboardingQuestions.length;

	// Progress percentage calculation
	const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

	// Save progress to backend/storage and navigate to tabs
	const saveProgress = () => {
		console.log("Saving progress:", { answers, skipped });
		// This would save to your backend/storage here

		// Create a reminder for skipped questions if there are any
		if (skipped.length > 0) {
			// Here you would set up a reminder in your app's notification system
			console.log(
				"Setting reminder for skipped questions:",
				skipped.map((idx) => onboardingQuestions[idx].id)
			);
		}

		router.push("/(tabs)");
	};

	const handleNext = () => {
		if (currentStep < TOTAL_STEPS - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			// Completed all steps
			saveProgress();
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSkip = () => {
		// Add current step to skipped array if not already there
		if (!skipped.includes(currentStep)) {
			setSkipped([...skipped, currentStep]);
		}

		// Move to next question
		if (currentStep < TOTAL_STEPS - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			// Completed all steps
			saveProgress();
		}
	};

	const handleAnswer = (questionId: string, value: any) => {
		console.log(
			`handleAnswer called with: questionId=${questionId}, value=${value}`
		);
		console.log("Current answers state:", answers);

		const currentQuestion = onboardingQuestions[currentStep];

		// Create new state object to ensure re-render
		const newAnswers = {
			...answers,
			[questionId]: value,
		};

		setAnswers(newAnswers);

		console.log("Updated answers:", newAnswers);

		// For single select questions, check if option has follow-up questions
		if (!currentQuestion.multiSelect) {
			const selectedOption = currentQuestion.options.find(
				(opt) => opt.value === value
			);

			if (selectedOption?.followUp) {
				setFollowUpQuestions({
					...followUpQuestions,
					[questionId]: true,
				});
			} else {
				// If changing to an option without follow-up, remove any follow-up answers
				const updatedAnswers = { ...newAnswers };
				const updatedFollowUp = { ...followUpQuestions };

				if (currentQuestion.followUpQuestions?.[value]) {
					delete updatedAnswers[currentQuestion.followUpQuestions[value].id];
					delete updatedFollowUp[questionId];
				}

				setAnswers(updatedAnswers);
				setFollowUpQuestions(updatedFollowUp);
			}
		}

		// Remove from skipped if it was previously skipped
		if (skipped.includes(currentStep)) {
			setSkipped(skipped.filter((item) => item !== currentStep));
		}
	};

	// Handle toggling a multi-select option
	const handleMultiSelectToggle = (questionId: string, optionValue: string) => {
		const currentValues = answers[questionId] || [];
		let newValues: string[];

		// Toggle the selection
		if (currentValues.includes(optionValue)) {
			newValues = currentValues.filter((value) => value !== optionValue);
		} else {
			newValues = [...currentValues, optionValue];
		}

		// Update answers
		const newAnswers = {
			...answers,
			[questionId]: newValues,
		};

		setAnswers(newAnswers);
		console.log("Updated multi-select answers:", newAnswers);

		// Find the current question (could be main question or a follow-up)
		let currentQuestion = onboardingQuestions[currentStep];

		// If this is a follow-up question, find it in the question structure
		if (questionId !== currentQuestion.id) {
			// This is a follow-up question, find its parent
			for (const q of onboardingQuestions) {
				if (q.followUpQuestions) {
					// Check first level follow-ups
					for (const [key, followUp] of Object.entries(q.followUpQuestions)) {
						if (followUp.id === questionId) {
							currentQuestion = followUp;
							break;
						}

						// Check second level (nested) follow-ups
						if (followUp.followUpQuestions) {
							for (const [nestedKey, nestedFollowUp] of Object.entries(
								followUp.followUpQuestions
							)) {
								if (nestedFollowUp.id === questionId) {
									currentQuestion = nestedFollowUp;
									break;
								}
							}
						}
					}
				}
			}
		}

		// Check if the toggled option has follow-up questions
		const option = currentQuestion.options.find(
			(opt) => opt.value === optionValue
		);
		const hasFollowUp = option?.followUp;

		if (hasFollowUp) {
			// If option has follow-up and was just selected, activate follow-up
			if (newValues.includes(optionValue)) {
				setFollowUpQuestions({
					...followUpQuestions,
					[`${questionId}_${optionValue}`]: true,
				});
			} else {
				// If option has follow-up and was just deselected, deactivate follow-up
				const updatedFollowUp = { ...followUpQuestions };
				delete updatedFollowUp[`${questionId}_${optionValue}`];
				setFollowUpQuestions(updatedFollowUp);

				// Also remove follow-up answers
				if (currentQuestion.followUpQuestions?.[optionValue]) {
					const updatedAnswers = { ...newAnswers };
					delete updatedAnswers[
						currentQuestion.followUpQuestions[optionValue].id
					];
					setAnswers(updatedAnswers);
				}
			}
		}

		// Remove from skipped if it was previously skipped
		if (skipped.includes(currentStep)) {
			setSkipped(skipped.filter((item) => item !== currentStep));
		}
	};

	// Check if current question has been answered
	const isCurrentQuestionAnswered = (): boolean => {
		const currentQuestion = onboardingQuestions[currentStep];

		// Special handling for multi-select questions
		if (currentQuestion.multiSelect) {
			const selectedOptions = answers[currentQuestion.id] || [];
			// Consider it answered if at least one option is selected
			return selectedOptions.length > 0;
		}

		// Basic check if the question has been answered
		const isAnswered = !!answers[currentQuestion.id];

		// If the selected option has follow-up questions, check if those are answered too
		if (isAnswered && currentQuestion.followUpQuestions) {
			const selectedOption = answers[currentQuestion.id];
			const followUpQuestion =
				currentQuestion.followUpQuestions[selectedOption];

			if (followUpQuestion && followUpQuestions[currentQuestion.id]) {
				return !!answers[followUpQuestion.id];
			}
		}

		return isAnswered;
	};

	const isAnswered = isCurrentQuestionAnswered();

	// Render the current question and its options
	const renderCurrentQuestion = () => {
		const currentQuestion = onboardingQuestions[currentStep];
		const isAnswered = isCurrentQuestionAnswered();
		const isSkipped = skipped.includes(currentStep);
		const selectedValue = answers[currentQuestion.id];

		return (
			<QuestionCard
				title={currentQuestion.title}
				description={currentQuestion.description}
				infoText={currentQuestion.infoText}
				isAnswered={isAnswered}
				isSkipped={isSkipped}
			>
				{currentQuestion.options.length > 0 && (
					<View
						className={`gap-y-2 ${!currentQuestion.followUpQuestions && "android:pb-8 ios:pb-4"}`}
					>
						{currentQuestion.multiSelect
							? // Render multi-select options
								currentQuestion.options.map((option) => (
									<MultiSelectOption
										key={option.value}
										value={option.value}
										label={option.label}
										selected={(answers[currentQuestion.id] || []).includes(
											option.value
										)}
										onToggle={(value) =>
											handleMultiSelectToggle(currentQuestion.id, value)
										}
									/>
								))
							: // Render single-select options
								currentQuestion.options.map((option) => (
									<SelectableOption
										key={option.value}
										value={option.value}
										label={option.label}
										selected={selectedValue === option.value}
										onSelect={(value) =>
											handleAnswer(currentQuestion.id, value)
										}
									/>
								))}
					</View>
				)}

				{/* Render follow-up questions for single-select questions */}
				{!currentQuestion.multiSelect &&
					currentQuestion.followUpQuestions &&
					selectedValue &&
					currentQuestion.followUpQuestions[selectedValue] &&
					followUpQuestions[currentQuestion.id] && (
						<View className="mt-6 py-4 android:pb-8 border-t border-gray-200">
							<Label className="mb-2">
								{currentQuestion.followUpQuestions[selectedValue].title}
							</Label>
							<View className="">
								{currentQuestion.followUpQuestions[selectedValue].multiSelect
									? // Render multi-select follow-up options
										currentQuestion.followUpQuestions[
											selectedValue
										].options.map((option) => (
											<MultiSelectOption
												key={option.value}
												value={option.value}
												label={option.label}
												selected={(
													answers[
														currentQuestion.followUpQuestions[selectedValue].id
													] || []
												).includes(option.value)}
												onToggle={(value) =>
													handleMultiSelectToggle(
														currentQuestion.followUpQuestions[selectedValue].id,
														value
													)
												}
											/>
										))
									: // Render single-select follow-up options
										currentQuestion.followUpQuestions[
											selectedValue
										].options.map((option) => (
											<SelectableOption
												key={option.value}
												value={option.value}
												label={option.label}
												selected={
													answers[
														currentQuestion.followUpQuestions[selectedValue].id
													] === option.value
												}
												onSelect={(value) =>
													handleAnswer(
														currentQuestion.followUpQuestions[selectedValue].id,
														value
													)
												}
											/>
										))}

								{/* Render nested follow-ups if applicable */}
								{renderNestedFollowUps(
									currentQuestion.followUpQuestions[selectedValue]
								)}
							</View>

							{currentQuestion.followUpQuestions[selectedValue].infoText && (
								<View className="mt-4 bg-blue-50 p-3 rounded-md">
									<Text className="text-sm text-blue-700">
										{currentQuestion.followUpQuestions[selectedValue].infoText}
									</Text>
								</View>
							)}
						</View>
					)}

				{/* Render follow-up questions for multi-select questions */}
				{currentQuestion.multiSelect &&
					currentQuestion.followUpQuestions &&
					(answers[currentQuestion.id] || []).map((optionValue: string) => {
						if (
							currentQuestion.followUpQuestions?.[optionValue] &&
							followUpQuestions[`${currentQuestion.id}_${optionValue}`]
						) {
							const followUpQuestion =
								currentQuestion.followUpQuestions[optionValue];
							return (
								<View
									key={followUpQuestion.id}
									className="mt-6 py-4 android:pb-8 border-t border-gray-200"
								>
									<Label className="mb-2">{followUpQuestion.title}</Label>
									<View>
										{followUpQuestion.multiSelect
											? // Render multi-select follow-up options
												followUpQuestion.options.map((option) => (
													<MultiSelectOption
														key={option.value}
														value={option.value}
														label={option.label}
														selected={(
															answers[followUpQuestion.id] || []
														).includes(option.value)}
														onToggle={(value) =>
															handleMultiSelectToggle(
																followUpQuestion.id,
																value
															)
														}
													/>
												))
											: // Render single-select follow-up options
												followUpQuestion.options.map((option) => (
													<SelectableOption
														key={option.value}
														value={option.value}
														label={option.label}
														selected={
															answers[followUpQuestion.id] === option.value
														}
														onSelect={(value) =>
															handleAnswer(followUpQuestion.id, value)
														}
													/>
												))}

										{/* Render any nested follow-ups for each selected option in the multi-select */}
										{followUpQuestion.multiSelect &&
											followUpQuestion.followUpQuestions &&
											(answers[followUpQuestion.id] || []).map(
												(nestedOptionValue: string) => {
													if (
														followUpQuestion.followUpQuestions?.[
															nestedOptionValue
														] &&
														followUpQuestions[
															`${followUpQuestion.id}_${nestedOptionValue}`
														]
													) {
														const nestedFollowUp =
															followUpQuestion.followUpQuestions[
																nestedOptionValue
															];
														return (
															<View
																key={nestedFollowUp.id}
																className="mt-4 pt-4 border-t border-gray-200 ml-4"
															>
																<Label className="mb-2 text-blue-700">
																	{nestedFollowUp.title}
																</Label>
																<View>
																	{nestedFollowUp.multiSelect
																		? // Render nested multi-select options
																			nestedFollowUp.options.map((option) => (
																				<MultiSelectOption
																					key={option.value}
																					value={option.value}
																					label={option.label}
																					selected={(
																						answers[nestedFollowUp.id] || []
																					).includes(option.value)}
																					onToggle={(value) =>
																						handleMultiSelectToggle(
																							nestedFollowUp.id,
																							value
																						)
																					}
																				/>
																			))
																		: // Render nested single-select options
																			nestedFollowUp.options.map((option) => (
																				<SelectableOption
																					key={option.value}
																					value={option.value}
																					label={option.label}
																					selected={
																						answers[nestedFollowUp.id] ===
																						option.value
																					}
																					onSelect={(value) =>
																						handleAnswer(
																							nestedFollowUp.id,
																							value
																						)
																					}
																				/>
																			))}
																</View>
															</View>
														);
													}
													return null;
												}
											)}
									</View>

									{followUpQuestion.infoText && (
										<View className="mt-4 bg-blue-50 p-3 rounded-md">
											<Text className="text-sm text-blue-700">
												{followUpQuestion.infoText}
											</Text>
										</View>
									)}
								</View>
							);
						}
						return null;
					})}

				{/* Special handling for height_weight question using our new picker */}
				{currentQuestion.id === "height_weight" && selectedValue && (
					<View className="mt-4 border-t border-gray-200 py-4">
						{selectedValue === "metric" ? (
							<>
								<MeasurementInput
									type="height"
									unitSystem="metric"
									label="Height"
									value={answers.height_cm}
									onValueChange={(value) => handleAnswer("height_cm", value)}
								/>
								<MeasurementInput
									type="weight"
									unitSystem="metric"
									label="Weight"
									value={answers.weight_kg}
									onValueChange={(value) => handleAnswer("weight_kg", value)}
								/>
							</>
						) : (
							<>
								<MeasurementInput
									type="height"
									unitSystem="imperial"
									label="Height"
									value={answers.height_cm} // We still store in cm
									onValueChange={(value) => handleAnswer("height_cm", value)}
								/>
								<MeasurementInput
									type="weight"
									unitSystem="imperial"
									label="Weight"
									value={answers.weight_kg} // We still store in kg
									onValueChange={(value) => handleAnswer("weight_kg", value)}
								/>
							</>
						)}
					</View>
				)}

				{/* Special handling for date_of_birth question - directly show DOB picker */}
				{currentQuestion.id === "date_of_birth" && (
					<DOBInput
						label="Date of Birth"
						value={answers.birth_date}
						onValueChange={(value) => handleAnswer("birth_date", value)}
					/>
				)}

				{/* Render dynamic input fields for other questions */}
				{currentQuestion.id !== "height_weight" &&
					currentQuestion.id !== "date_of_birth" &&
					currentQuestion.inputFields &&
					selectedValue &&
					currentQuestion.inputFields[selectedValue] && (
						<View className="mt-4 gap-y-4 border-t border-gray-200 py-4">
							{currentQuestion.inputFields[selectedValue].map((field) => (
								<View key={field.id} className="">
									<Label>{field.title}</Label>
									<Input
										placeholder={
											field.placeholder || `Enter ${field.title.toLowerCase()}`
										}
										returnKeyType="done"
										keyboardType={field.keyboardType || "default"}
										value={answers[field.id] || ""}
										onChangeText={(value) => handleAnswer(field.id, value)}
										className="mt-1"
									/>
								</View>
							))}
						</View>
					)}
			</QuestionCard>
		);
	};

	// Helper function to render nested follow-ups
	const renderNestedFollowUps = (question: any) => {
		if (!question || !question.followUpQuestions) return null;

		const selectedValue = answers[question.id];
		if (!selectedValue || !question.followUpQuestions[selectedValue])
			return null;

		// Only render if this follow-up is active
		if (!followUpQuestions[question.id]) return null;

		const followUpQuestion = question.followUpQuestions[selectedValue];

		return (
			<View className="mt-4 pt-4 border-t border-gray-200">
				<Label className="mb-2">{followUpQuestion.title}</Label>
				<View>
					{followUpQuestion.multiSelect
						? // Render multi-select nested follow-up options
							followUpQuestion.options.map((option) => (
								<MultiSelectOption
									key={option.value}
									value={option.value}
									label={option.label}
									selected={(answers[followUpQuestion.id] || []).includes(
										option.value
									)}
									onToggle={(value) =>
										handleMultiSelectToggle(followUpQuestion.id, value)
									}
								/>
							))
						: // Render single-select nested follow-up options
							followUpQuestion.options.map((option) => (
								<SelectableOption
									key={option.value}
									value={option.value}
									label={option.label}
									selected={answers[followUpQuestion.id] === option.value}
									onSelect={(value) => handleAnswer(followUpQuestion.id, value)}
								/>
							))}

					{/* Render any nested follow-ups for each selected option in the multi-select */}
					{followUpQuestion.multiSelect &&
						followUpQuestion.followUpQuestions &&
						(answers[followUpQuestion.id] || []).map(
							(nestedOptionValue: string) => {
								if (
									followUpQuestion.followUpQuestions?.[nestedOptionValue] &&
									followUpQuestions[
										`${followUpQuestion.id}_${nestedOptionValue}`
									]
								) {
									const nestedFollowUp =
										followUpQuestion.followUpQuestions[nestedOptionValue];
									return (
										<View
											key={nestedFollowUp.id}
											className="mt-4 pt-4 border-t border-gray-200 ml-4"
										>
											<Label className="mb-2 text-blue-700">
												{nestedFollowUp.title}
											</Label>
											<View>
												{nestedFollowUp.multiSelect
													? // Render nested multi-select options
														nestedFollowUp.options.map((option) => (
															<MultiSelectOption
																key={option.value}
																value={option.value}
																label={option.label}
																selected={(
																	answers[nestedFollowUp.id] || []
																).includes(option.value)}
																onToggle={(value) =>
																	handleMultiSelectToggle(
																		nestedFollowUp.id,
																		value
																	)
																}
															/>
														))
													: // Render nested single-select options
														nestedFollowUp.options.map((option) => (
															<SelectableOption
																key={option.value}
																value={option.value}
																label={option.label}
																selected={
																	answers[nestedFollowUp.id] === option.value
																}
																onSelect={(value) =>
																	handleAnswer(nestedFollowUp.id, value)
																}
															/>
														))}
											</View>
										</View>
									);
								}
								return null;
							}
						)}
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView edges={["bottom"]} className="flex-1 bg-white">
			<ThemedView className="flex-1">
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					className="flex-1"
				>
					{/* Progress bar */}
					<View className="px-4 py-3 border-b border-gray-200 bg-blue-50">
						<View className="w-full h-3 rounded-full">
							<View
								className="h-3 bg-primary rounded-full"
								style={{ width: `${progress}%` }}
							/>
						</View>
						<View className="flex-row justify-between items-center mt-1">
							<Text className="text-sm text-muted-foreground">
								Question {currentStep + 1} of {TOTAL_STEPS}
							</Text>

							{skipped.length > 0 && (
								<View className="flex-row items-center">
									<AlertCircle size={16} className="text-amber-500" />
									<Text className="text-sm text-amber-500 ml-1">
										{skipped.length} skipped
									</Text>
								</View>
							)}
						</View>
					</View>

					<ScrollView className="flex-1 px-4 py-4">
						{renderCurrentQuestion()}
					</ScrollView>

					{/* Navigation buttons */}
					<View className="flex-row justify-between items-center p-4 border-t border-gray-200">
						<Button
							variant="outline"
							onPress={handlePrevious}
							disabled={currentStep === 0}
							iconLeft={ArrowLeft}
						>
							<Text>Back</Text>
						</Button>

						<Button
							variant="outline"
							disabled={isAnswered}
							onPress={handleSkip}
						>
							<Text>Skip for now</Text>
						</Button>

						<Button
							onPress={handleNext}
							iconColor="white"
							iconRight={currentStep === TOTAL_STEPS - 1 ? Check : ArrowRight}
							disabled={
								!isCurrentQuestionAnswered() &&
								!skipped.includes(currentStep) &&
								currentStep !== TOTAL_STEPS - 1
							}
						>
							<Text>{currentStep === TOTAL_STEPS - 1 ? "Finish" : "Next"}</Text>
						</Button>
					</View>
				</KeyboardAvoidingView>
			</ThemedView>
		</SafeAreaView>
	);
};

export default OnboardingScreen;

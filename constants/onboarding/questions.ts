export type QuestionOption = {
	value: string;
	label: string;
	followUp?: boolean; // Indicates if selecting this option should show follow up questions
	databaseTag?: string; // The database tag to store the answer in
	databaseValue?: string | number; // The value to store in the database
	infoText?: string; // Additional information to show when this option is selected
};

export type InputField = {
	id: string;
	title: string;
	placeholder?: string;
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
	databaseTag: string;
};

export type Question = {
	id: string;
	title: string;
	description?: string;
	infoText?: string;
	skippable: boolean;
	options: QuestionOption[];
	followUpQuestions?: { [key: string]: Question }; // Keyed by option value
	inputFields?: { [key: string]: InputField[] }; // Input fields to show when certain options are selected
	databaseTag?: string;
	category?: "personal" | "cardiac" | "medical" | "lifestyle" | "kccq";
};

// Import question categories
import personalQuestions from "./personal-questions";
import cardiacQuestions from "./cardiac-questions";
import lifestyleQuestions from "./lifestyle-questions";
import medicalQuestions from "./medical-questions";

// Define all questions here, organized by category
export const onboardingQuestions: Question[] = [
	// Add category tags to imported questions
	...personalQuestions.map((q) => ({ ...q, category: "personal" as const })),
	...cardiacQuestions.map((q) => ({ ...q, category: "cardiac" as const })),
	...lifestyleQuestions.map((q) => ({ ...q, category: "lifestyle" as const })),
	...medicalQuestions.map((q) => ({ ...q, category: "medical" as const })),
];

// Organize questions by category
export const questionsByCategory = {
	personal: personalQuestions,
	cardiac: cardiacQuestions,
	lifestyle: lifestyleQuestions,
	medical: medicalQuestions,
};

// This function will help find questions by ID
export const findQuestionById = (id: string): Question | undefined => {
	// First check top-level questions
	const topLevelQuestion = onboardingQuestions.find((q) => q.id === id);
	if (topLevelQuestion) return topLevelQuestion;

	// Check follow-up questions
	for (const question of onboardingQuestions) {
		if (!question.followUpQuestions) continue;

		for (const [_, followUpQuestion] of Object.entries(
			question.followUpQuestions
		)) {
			if (followUpQuestion.id === id) return followUpQuestion;

			// You could recursively check deeper nested questions if needed
		}
	}

	return undefined;
};

// Helper function to determine if a question has been skipped
export const isQuestionSkipped = (
	questionId: string,
	skippedQuestions: string[]
): boolean => {
	return skippedQuestions.includes(questionId);
};

// Helper function to get the next question ID if user chooses to skip current question
export const getNextQuestionId = (currentQuestionId: string): string | null => {
	const currentIndex = onboardingQuestions.findIndex(
		(q) => q.id === currentQuestionId
	);
	if (currentIndex === -1 || currentIndex === onboardingQuestions.length - 1) {
		return null;
	}
	return onboardingQuestions[currentIndex + 1].id;
};

// Helper function to calculate completion percentage
export const calculateCompletionPercentage = (
	answers: Record<string, unknown>,
	skippedQuestions: string[]
): number => {
	const totalQuestions = onboardingQuestions.length;
	const answeredQuestions = Object.keys(answers).length;

	return Math.round(
		((answeredQuestions + skippedQuestions.length) / totalQuestions) * 100
	);
};

// Export KCCQ questions (to be implemented)
export const kccqQuestions: Question[] = [
	// KCCQ questions will be added here
];

import React from "react";
import { View } from "react-native";
import { H2, P } from "@/components/ui/typography";

interface QuestionCardProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	infoText?: string;
	isSkipped?: boolean;
	isAnswered?: boolean;
}

const QuestionCard = ({
	title,
	description,
	children,
	infoText,
	isSkipped = false,
}: QuestionCardProps) => {
	return (
		<>
			{isSkipped && (
				<View className="mb-4 bg-amber-50 py-4 rounded-md">
					<P className="text-sm text-center text-amber-700">
						You've skipped this question. You can come back to it later.
					</P>
				</View>
			)}
			<H2 className="mb-2">{title}</H2>
			{description && (
				<P className="mb-4 text-muted-foreground text-sm">{description}</P>
			)}
			<View className="mt-2">{children}</View>
			{infoText && (
				<View className="mt-4 bg-blue-50 p-3 rounded-md">
					<P className="text-sm text-blue-700">{infoText}</P>
				</View>
			)}
		</>
	);
};

export default QuestionCard;

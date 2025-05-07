import { ScrollView } from "react-native";
import React from "react";
import Markdown from "react-native-markdown-display";
import { useTranslation } from "react-i18next";

const PrivacyPolicyScreen = () => {
	const { t } = useTranslation();

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="always"
			automaticallyAdjustContentInsets
			automaticallyAdjustKeyboardInsets
			automaticallyAdjustsScrollIndicatorInsets
			shouldRasterizeIOS
			className="flex-1 p-4 bg-white"
		>
			<Markdown style={markdownStyles}>{t("privacyPolicy")}</Markdown>
		</ScrollView>
	);
};

export default PrivacyPolicyScreen;

// Prose-like styles for markdown content
const markdownStyles = {
	// Base text styles
	body: {
		color: "#374151", // text-gray-700
		lineHeight: 24, // leading-relaxed
		fontFamily: "Poppins",
	},

	// Headings
	heading1: {
		fontFamily: "PoppinsSemiBold",
		fontSize: 28, // text-3xl
		color: "#111827", // text-gray-900
		marginTop: 24,
		marginBottom: 16,
		lineHeight: 36,
	},
	heading2: {
		fontFamily: "PoppinsSemiBold",
		fontSize: 22, // text-2xl
		color: "#111827", // text-gray-900
		marginTop: 20,
		marginBottom: 12,
		lineHeight: 32,
	},
	heading3: {
		fontFamily: "PoppinsSemiBold",
		fontSize: 18, // text-xl
		color: "#111827", // text-gray-900
		marginTop: 16,
		marginBottom: 8,
		lineHeight: 28,
	},

	// Paragraphs
	paragraph: {
		fontFamily: "Poppins",
		marginBottom: 16, // mb-4
		fontSize: 16, // text-base
		lineHeight: 24, // leading-relaxed
	},

	// Lists
	bullet_list: {
		marginBottom: 16, // mb-4
	},
	ordered_list: {
		marginBottom: 16, // mb-4
	},
	list_item: {
		marginBottom: 4, // mb-1
		flexDirection: "row" as const,
		paddingLeft: 4,
	},
	bullet: {
		fontSize: 16,
		lineHeight: 24,
		marginRight: 8,
	},

	// Links
	link: {
		color: "#2563EB", // text-blue-600
		textDecorationLine: "underline" as const,
	},

	// Horizontal rule
	hr: {
		backgroundColor: "#E5E7EB", // bg-gray-200
		height: 1,
		marginTop: 20,
		marginBottom: 20,
	},

	// Code blocks
	code_inline: {
		backgroundColor: "#F3F4F6", // bg-gray-100
		paddingHorizontal: 4,
		paddingVertical: 2,
		fontFamily: "Courier",
		fontSize: 14,
		borderRadius: 4,
	},
	code_block: {
		backgroundColor: "#F3F4F6", // bg-gray-100
		paddingHorizontal: 12,
		paddingVertical: 8,
		fontFamily: "Courier",
		fontSize: 14,
		borderRadius: 4,
		marginBottom: 16,
	},

	// Blockquotes
	blockquote: {
		borderLeftWidth: 4,
		borderLeftColor: "#E5E7EB", // border-gray-200
		paddingLeft: 16,
		fontStyle: "italic",
		marginLeft: 0,
		marginRight: 0,
		marginVertical: 16,
	},

	// Tables
	table: {
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#E5E7EB", // border-gray-200
	},
	thead: {
		backgroundColor: "#F9FAFB", // bg-gray-50
	},
	th: {
		padding: 8,
		fontWeight: "bold",
		borderBottomWidth: 1,
		borderColor: "#E5E7EB", // border-gray-200
	},
	td: {
		padding: 8,
		borderBottomWidth: 1,
		borderColor: "#E5E7EB", // border-gray-200
	},
};

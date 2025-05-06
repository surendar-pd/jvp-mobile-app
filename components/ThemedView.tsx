import { View, ViewProps } from "react-native";

import { cn } from "@/lib/utils";

export interface ThemedViewProps extends ViewProps {
	className?: string;
}

export function ThemedView({ className, ...otherProps }: ThemedViewProps) {
	return (
		<View className={cn("flex-1 bg-background", className)} {...otherProps} />
	);
}

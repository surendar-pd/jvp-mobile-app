import React from "react";
import { Link } from "expo-router";
import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const HomeScreen = () => {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
			headerImage={
				<IconSymbol
					size={310}
					color="#808080"
					name="chevron.left.forwardslash.chevron.right"
				/>
			}
		>
			<ThemedView className="p-6">
				<Link asChild href="/welcome-consent">
					<Button>
						<Text>welcome</Text>
					</Button>
				</Link>
				<Card>
					<CardHeader>
						<CardTitle>Upload Video</CardTitle>
						<CardDescription>Card Description</CardDescription>
					</CardHeader>
					<CardContent>
						<Text>Card Content</Text>
					</CardContent>
					<CardFooter>
						<Text>Card Footer</Text>
					</CardFooter>
				</Card>
				<Collapsible title="Collapsible Title">
					<Text>cdscds</Text>
				</Collapsible>
			</ThemedView>
		</ParallaxScrollView>
	);
};

export default HomeScreen;

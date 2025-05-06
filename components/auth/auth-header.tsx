import React from "react";
import { View } from "react-native";

import { H1, P } from "../ui/typography";

const AuthHeader = ({
	heading,
	subHeading,
}: {
	heading: string;
	subHeading: string;
}) => {
	return (
		<View className="mb-4">
			<H1>{heading}</H1>
			<P>{subHeading}</P>
		</View>
	);
};

export default AuthHeader;

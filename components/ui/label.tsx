import * as LabelPrimitive from "@rn-primitives/label";
import * as React from "react";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<
	LabelPrimitive.TextRef,
	LabelPrimitive.TextProps
>(
	(
		{ className, onPress, onLongPress, onPressIn, onPressOut, ...props },
		ref
	) => (
		<LabelPrimitive.Root
			className="web:cursor-default"
			onPress={onPress}
			onLongPress={onLongPress}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
		>
			<LabelPrimitive.Text
				ref={ref}
				style={{ fontFamily: "Poppins" }}
				className={cn(
					"text-sm mb-2 text-foreground native:text-base font-medium leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70",
					className
				)}
				{...props}
			/>
		</LabelPrimitive.Root>
	)
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

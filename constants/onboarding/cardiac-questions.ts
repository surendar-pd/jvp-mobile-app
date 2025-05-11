import { Question } from "./questions";

export const cardiacQuestions: Question[] = [
	{
		id: "heart_failure",
		title: "Have you ever been diagnosed with heart failure?",
		description: "This helps us understand your cardiac history.",
		skippable: true,
		options: [
			{
				value: "yes",
				label: "Yes",
				followUp: true,
				databaseTag: "heart_failure",
				databaseValue: "yes",
			},
			{
				value: "no",
				label: "No",
				databaseTag: "heart_failure",
				databaseValue: "no",
			},
			{
				value: "dont-know",
				label: "I don't know",
				databaseTag: "heart_failure",
				databaseValue: 100,
			},
		],
		followUpQuestions: {
			yes: {
				id: "heart_failure_type",
				title: "Did your doctor indicate what type of heart failure you have?",
				description: "",
				infoText:
					"Heart failure with preserved ejection fraction suggests a heart that can contract but doesn't relax well. Heart failure with reduced ejection fraction is a heart that doesn't contract effectively.",
				skippable: true,
				options: [
					{
						value: "preserved",
						label: "Preserved ejection (>50%) (CHFTYPE=1)",
						databaseTag: "CHFTYPE",
						databaseValue: 1,
					},
					{
						value: "mid-range",
						label: "Mid range ejection fraction (40-50%) (CHFTYPE=2)",
						databaseTag: "CHFTYPE",
						databaseValue: 2,
					},
					{
						value: "reduced",
						label: "Reduced ejection fraction (<40%) (CHFTYPE=3)",
						databaseTag: "CHFTYPE",
						databaseValue: 3,
					},
					{
						value: "severely-reduced",
						label: "Severely reduced ejection fraction (<30%) (CHFTYPE=4)",
						databaseTag: "CHFTYPE",
						databaseValue: 4,
					},
					{
						value: "recovered",
						label: "Recovered ejection fraction (CHFTYPE=5)",
						databaseTag: "CHFTYPE",
						databaseValue: 5,
					},
					{
						value: "dont-know",
						label: "I don't know (CHFTYPE=100)",
						databaseTag: "CHFTYPE",
						databaseValue: 100,
					},
				],
				databaseTag: "CHFTYPE",
			},
		},
		databaseTag: "heart_failure",
	},
	{
		id: "heart_cause",
		title:
			"Has anyone ever indicated to you the reason they suspect you had heart failure and whether it is due to blocked arteries or not?",
		description:
			"Heart failure can be due to multiple causes. A common reason is cholesterol buildup in the arteries of the heart.",
		skippable: true,
		options: [
			{
				value: "not-blocked",
				label:
					"Yes, they told me I had heart failure but confirmed that it is not due to blocked arteries",
				databaseTag: "CHFE",
				databaseValue: 5,
			},
			{
				value: "suspect-blocked",
				label:
					"Yes, they told me they suspect it is due to blocked arteries but I am still awaiting testing to confirm this",
				databaseTag: "CHFE",
				databaseValue: "pending",
			},
			{
				value: "not-tested",
				label: "I have never been tested for possibility of blocked arteries",
				databaseTag: "CHFE",
				databaseValue: "not-tested",
				infoText:
					"Two thirds of the time heart failure is due to blocked arteries. Please speak to your family doctor or cardiologist to evaluate this further.",
			},
			{
				value: "dont-know",
				label: "I do not know if I have blocked arteries",
				databaseTag: "CHFE",
				databaseValue: 100,
				infoText:
					"This may have been evaluated with a procedure where a wire goes in the heart, a stress test with pictures, a CT scan, an MRI, or an echocardiogram. If none of these tests has been performed, it's likely you haven't been evaluated for this condition.",
			},
		],
		databaseTag: "CHFE",
	},
	{
		id: "artery_evaluation",
		title:
			"If you were evaluated for blocked arteries, which test did you undergo?",
		skippable: true,
		options: [
			{
				value: "exercise-stress",
				label: "Exercise stress test",
				databaseTag: "CATH",
				databaseValue: "exercise-stress",
			},
			{
				value: "stress-echo",
				label: "Stress echo",
				databaseTag: "CATH",
				databaseValue: "stress-echo",
			},
			{
				value: "pharmaco-stress-echo",
				label: "Pharmacologic stress echo",
				databaseTag: "CATH",
				databaseValue: "pharmaco-stress-echo",
			},
			{
				value: "exercise-nuclear",
				label:
					"Exercise nuclear study [Myoview study, chest rifaximin, technetium]",
				databaseTag: "CATH",
				databaseValue: "exercise-nuclear",
			},
			{
				value: "pharmaco-nuclear",
				label:
					"Pharmacologic nuclear study [Persantine/dipyridamole, dobutamine]",
				databaseTag: "CATH",
				databaseValue: "pharmaco-nuclear",
			},
			{
				value: "pharmaco-pet",
				label: "Pharmacologic PET scan [Persantine/dipyridamole]",
				databaseTag: "CATH",
				databaseValue: "pharmaco-pet",
			},
			{
				value: "ct-angiogram",
				label: "CT angiogram",
				databaseTag: "CATH",
				databaseValue: "ct-angiogram",
			},
			{
				value: "coronary-angiogram",
				label: "Coronary angiogram/cardiac catheterization",
				databaseTag: "CATH",
				databaseValue: "coronary-angiogram",
			},
			{
				value: "not-sure",
				label: "Not sure",
				databaseTag: "CATH",
				databaseValue: "unknown",
			},
			{
				value: "not-done",
				label: "I have not had any of these tests",
				databaseTag: "CATH",
				databaseValue: "none",
			},
		],
		databaseTag: "CATH",
	},
	{
		id: "heart_valve",
		title: "Were you ever told you have any heart valve issues?",
		skippable: true,
		options: [
			{
				value: "yes",
				label: "Yes",
				followUp: true,
				databaseTag: "CARD",
				databaseValue: "yes",
			},
			{ value: "no", label: "No", databaseTag: "CARD", databaseValue: "no" },
			{
				value: "not-sure",
				label: "Not sure",
				databaseTag: "CARD",
				databaseValue: 100,
			},
		],
		followUpQuestions: {
			yes: {
				id: "valve_type",
				title: "Do you know which valve?",
				skippable: true,
				options: [
					{
						value: "aortic",
						label: "Aortic valve",
						databaseTag: "CARD1",
						databaseValue: "aortic",
					},
					{
						value: "mitral",
						label: "Mitral valve",
						databaseTag: "CARD1",
						databaseValue: "mitral",
					},
					{
						value: "pulmonary",
						label: "Pulmonary valve",
						databaseTag: "CARD1",
						databaseValue: "pulmonary",
					},
					{
						value: "tricuspid",
						label: "Tricuspid valve",
						databaseTag: "CARD1",
						databaseValue: "tricuspid",
					},
					{
						value: "dont-know",
						label: "Don't know",
						databaseTag: "CARD1",
						databaseValue: 100,
					},
				],
				databaseTag: "CARD1",
			},
		},
		databaseTag: "CARD",
	},
	{
		id: "heart_failure_hospital",
		title: "Have you ever been admitted for heart failure in the past year?",
		skippable: true,
		options: [
			{
				value: "yes",
				label: "Yes",
				followUp: true,
				databaseTag: "CHFR",
				databaseValue: "yes",
			},
			{ value: "no", label: "No", databaseTag: "CHFR", databaseValue: 0 },
		],
		followUpQuestions: {
			yes: {
				id: "heart_failure_admits",
				title: "How many times in the past year?",
				skippable: true,
				options: [
					{
						value: "1",
						label: "1 time",
						databaseTag: "CHFR",
						databaseValue: 1,
					},
					{
						value: "2",
						label: "2 times",
						databaseTag: "CHFR",
						databaseValue: 2,
					},
					{
						value: "3",
						label: "3 times",
						databaseTag: "CHFR",
						databaseValue: 3,
					},
					{
						value: "4",
						label: "4 times",
						databaseTag: "CHFR",
						databaseValue: 4,
					},
					{
						value: "5-plus",
						label: "5 or more times",
						databaseTag: "CHFR",
						databaseValue: 5,
					},
				],
				databaseTag: "CHFR",
			},
		},
		databaseTag: "CHFR",
	},
	{
		id: "heart_failure_lifetime",
		title:
			"If not in the past year, how many times have you been admitted to the hospital for heart failure in your lifetime?",
		skippable: true,
		options: [
			{ value: "0", label: "Never", databaseTag: "CHFR1", databaseValue: 0 },
			{ value: "1", label: "1 time", databaseTag: "CHFR1", databaseValue: 1 },
			{ value: "2", label: "2 times", databaseTag: "CHFR1", databaseValue: 2 },
			{ value: "3", label: "3 times", databaseTag: "CHFR1", databaseValue: 3 },
			{ value: "4", label: "4 times", databaseTag: "CHFR1", databaseValue: 4 },
			{
				value: "5-plus",
				label: "5 or more times",
				databaseTag: "CHFR1",
				databaseValue: 5,
			},
		],
		databaseTag: "CHFR1",
	},
	{
		id: "amyloidosis",
		title:
			"Has anyone in your family ever been diagnosed with amyloidosis or cardiac amyloidosis?",
		skippable: true,
		options: [
			{
				value: "yes",
				label: "Yes",
				databaseTag: "AMYRISKQUAL",
				databaseValue: 1,
			},
			{
				value: "no",
				label: "No",
				databaseTag: "AMYRISKQUAL",
				databaseValue: 0,
			},
			{
				value: "not-sure",
				label: "Not sure",
				databaseTag: "AMYRISKQUAL",
				databaseValue: 0,
			},
		],
		databaseTag: "AMYRISKQUAL",
	},
];

export default cardiacQuestions;

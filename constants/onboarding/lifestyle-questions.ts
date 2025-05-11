import { Question } from "./questions";

export const lifestyleQuestions: Question[] = [
	{
		id: "smoking",
		title: "Do you smoke?",
		skippable: true,
		options: [
			{
				value: "current",
				label: "I am currently smoking",
				followUp: true,
				databaseTag: "smoking",
				databaseValue: "current",
			},
			{
				value: "former",
				label: "I used to smoke",
				followUp: true,
				databaseTag: "smoking",
				databaseValue: "former",
			},
			{
				value: "never",
				label: "I never smoked",
				databaseTag: "smoking",
				databaseValue: "never",
			},
			{
				value: "marijuana",
				label: "I only smoke marijuana",
				databaseTag: "smoking",
				databaseValue: "marijuana",
			},
			{
				value: "both",
				label: "I smoke both marijuana and cigarettes",
				followUp: true,
				databaseTag: "smoking",
				databaseValue: "both",
			},
		],
		inputFields: {
			current: [
				{
					id: "smoking_years",
					title: "For how many years?",
					placeholder: "Enter number of years",
					keyboardType: "numeric",
					databaseTag: "smoking_years",
				},
			],
			former: [
				{
					id: "smoking_years",
					title: "For how many years?",
					placeholder: "Enter number of years",
					keyboardType: "numeric",
					databaseTag: "smoking_years",
				},
				{
					id: "quit_years",
					title: "How many years ago did you quit?",
					placeholder: "Enter number of years",
					keyboardType: "numeric",
					databaseTag: "quit_years",
				},
			],
			both: [
				{
					id: "smoking_years",
					title: "For how many years?",
					placeholder: "Enter number of years",
					keyboardType: "numeric",
					databaseTag: "smoking_years",
				},
			],
		},
		followUpQuestions: {
			current: {
				id: "smoking_amount",
				title: "How much do you smoke per day?",
				skippable: true,
				options: [
					{
						value: "quarter-pack",
						label: "1/4 pack",
						databaseTag: "smoking_amount",
						databaseValue: 0.25,
					},
					{
						value: "half-pack",
						label: "1/2 pack",
						databaseTag: "smoking_amount",
						databaseValue: 0.5,
					},
					{
						value: "three-quarters-pack",
						label: "3/4 pack",
						databaseTag: "smoking_amount",
						databaseValue: 0.75,
					},
					{
						value: "one-pack",
						label: "1 pack",
						databaseTag: "smoking_amount",
						databaseValue: 1,
					},
					{
						value: "two-packs",
						label: "2 packs",
						databaseTag: "smoking_amount",
						databaseValue: 2,
					},
					{
						value: "more-than-two-packs",
						label: "More than 2 packs",
						databaseTag: "smoking_amount",
						databaseValue: 3,
					},
				],
				databaseTag: "smoking_amount",
			},
			former: {
				id: "smoking_amount",
				title: "How much did you smoke per day?",
				skippable: true,
				options: [
					{
						value: "quarter-pack",
						label: "1/4 pack",
						databaseTag: "smoking_amount",
						databaseValue: 0.25,
					},
					{
						value: "half-pack",
						label: "1/2 pack",
						databaseTag: "smoking_amount",
						databaseValue: 0.5,
					},
					{
						value: "three-quarters-pack",
						label: "3/4 pack",
						databaseTag: "smoking_amount",
						databaseValue: 0.75,
					},
					{
						value: "one-pack",
						label: "1 pack",
						databaseTag: "smoking_amount",
						databaseValue: 1,
					},
					{
						value: "two-packs",
						label: "2 packs",
						databaseTag: "smoking_amount",
						databaseValue: 2,
					},
					{
						value: "more-than-two-packs",
						label: "More than 2 packs",
						databaseTag: "smoking_amount",
						databaseValue: 3,
					},
				],
				databaseTag: "smoking_amount",
			},
			both: {
				id: "smoking_amount",
				title: "How much do you smoke per day?",
				skippable: true,
				options: [
					{
						value: "quarter-pack",
						label: "1/4 pack",
						databaseTag: "smoking_amount",
						databaseValue: 0.25,
					},
					{
						value: "half-pack",
						label: "1/2 pack",
						databaseTag: "smoking_amount",
						databaseValue: 0.5,
					},
					{
						value: "three-quarters-pack",
						label: "3/4 pack",
						databaseTag: "smoking_amount",
						databaseValue: 0.75,
					},
					{
						value: "one-pack",
						label: "1 pack",
						databaseTag: "smoking_amount",
						databaseValue: 1,
					},
					{
						value: "two-packs",
						label: "2 packs",
						databaseTag: "smoking_amount",
						databaseValue: 2,
					},
					{
						value: "more-than-two-packs",
						label: "More than 2 packs",
						databaseTag: "smoking_amount",
						databaseValue: 3,
					},
				],
				databaseTag: "smoking_amount",
			},
		},
		databaseTag: "smoking",
	},
	{
		id: "alcohol",
		title: "Do you drink any alcohol?",
		skippable: true,
		options: [
			{
				value: "yes",
				label: "Yes",
				followUp: true,
				databaseTag: "ETOH",
				databaseValue: 2,
			},
			{ value: "no", label: "No", databaseTag: "ETOH", databaseValue: 1 },
		],
		followUpQuestions: {
			yes: {
				id: "alcohol_servings",
				title: "How many servings per week do you drink?",
				description: "1 serving = 12 oz beer, 5 oz wine, or 1.5 oz spirits.",
				infoText:
					"If you drink more than 4 servings per week, the risk of cancer increases. More than 7 servings per week (men) or 10 servings per week (women) can contribute to heart muscle weakening.",
				skippable: true,
				options: [
					{
						value: "1-3",
						label: "1-3 servings",
						databaseTag: "ETOHQ",
						databaseValue: 2,
					},
					{
						value: "4-7",
						label: "4-7 servings",
						databaseTag: "ETOHQ",
						databaseValue: 5,
					},
					{
						value: "8-14",
						label: "8-14 servings",
						databaseTag: "ETOHQ",
						databaseValue: 11,
					},
					{
						value: "15-21",
						label: "15-21 servings",
						databaseTag: "ETOHQ",
						databaseValue: 18,
					},
					{
						value: "more-than-21",
						label: "More than 21 servings",
						databaseTag: "ETOHQ",
						databaseValue: 25,
					},
				],
				databaseTag: "ETOHQ",
			},
		},
		databaseTag: "ETOH",
	},
	{
		id: "exercise",
		title: "Do you exercise?",
		skippable: true,
		options: [
			{
				value: "daily",
				label: "Yes, daily",
				databaseTag: "SOCH1",
				databaseValue: "daily",
			},
			{
				value: "several-times-week",
				label: "Yes, several times per week",
				databaseTag: "SOCH1",
				databaseValue: "several-times-week",
			},
			{
				value: "once-week",
				label: "Yes, once per week",
				databaseTag: "SOCH1",
				databaseValue: "once-week",
			},
			{
				value: "occasionally",
				label: "Yes, but only occasionally",
				databaseTag: "SOCH1",
				databaseValue: "occasionally",
			},
			{
				value: "no",
				label: "No, I don't exercise",
				databaseTag: "SOCH1",
				databaseValue: "no",
			},
		],
		databaseTag: "SOCH1",
	},
	{
		id: "sleep_apnea",
		title:
			"Were you ever diagnosed with a condition called sleep apnea or a sleep disordered breathing problem?",
		skippable: true,
		options: [
			{
				value: "yes",
				label: "Yes",
				followUp: true,
				databaseTag: "OSA",
				databaseValue: "yes",
			},
			{
				value: "no",
				label: "No",
				followUp: true,
				databaseTag: "OSA",
				databaseValue: "no",
			},
			{
				value: "not-sure",
				label: "Not sure",
				followUp: true,
				databaseTag: "OSA",
				databaseValue: "not-sure",
			},
		],
		followUpQuestions: {
			no: {
				id: "sleep_symptoms",
				title:
					"Do you experience any of the following? (Select all that apply)",
				description: "These symptoms may indicate sleep apnea.",
				skippable: true,
				options: [
					{
						value: "tired",
						label:
							"Wake up feeling like you didn't sleep enough despite being in bed for over 7 hours",
						databaseTag: "OSA",
						databaseValue: "possible-symptoms",
					},
					{
						value: "tv",
						label:
							"Fall asleep in front of the television despite a good TV show",
						databaseTag: "OSA",
						databaseValue: "possible-symptoms",
					},
					{
						value: "nap",
						label:
							"Feel like you need an afternoon nap despite being in bed for 7 hours the night before",
						databaseTag: "OSA",
						databaseValue: "possible-symptoms",
					},
					{
						value: "dizzy",
						label:
							"Have random episodes of feeling dizzy despite remaining seated",
						databaseTag: "OSA",
						databaseValue: "possible-symptoms",
					},
					{
						value: "family",
						label: "Have family members diagnosed with sleep apnea",
						databaseTag: "OSA",
						databaseValue: "family-history",
					},
					{
						value: "none",
						label: "None of the above",
						databaseTag: "OSA",
						databaseValue: "no-symptoms",
					},
				],
				databaseTag: "OSA",
			},
			"not-sure": {
				id: "sleep_symptoms",
				title:
					"Do you experience any of the following? (Select all that apply)",
				description: "These symptoms may indicate sleep apnea.",
				skippable: true,
				options: [
					{
						value: "tired",
						label:
							"Wake up feeling like you didn't sleep enough despite being in bed for over 7 hours",
						databaseTag: "OSA",
						databaseValue: "possible-symptoms",
					},
					{
						value: "tv",
						label:
							"Fall asleep in front of the television despite a good TV show",
						databaseTag: "OSA",
						databaseValue: "possible-symptoms",
					},
					{
						value: "nap",
						label:
							"Feel like you need an afternoon nap despite being in bed for 7 hours the night before",
						databaseTag: "OSA",
						databaseValue: "possible-symptoms",
					},
					{
						value: "dizzy",
						label:
							"Have random episodes of feeling dizzy despite remaining seated",
						databaseTag: "OSA",
						databaseValue: "possible-symptoms",
					},
					{
						value: "family",
						label: "Have family members diagnosed with sleep apnea",
						databaseTag: "OSA",
						databaseValue: "family-history",
					},
					{
						value: "none",
						label: "None of the above",
						databaseTag: "OSA",
						databaseValue: "no-symptoms",
					},
				],
				databaseTag: "OSA",
			},
		},
		databaseTag: "OSA",
	},
];

export default lifestyleQuestions;

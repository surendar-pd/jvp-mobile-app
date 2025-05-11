import { Question } from "./questions";

export const medicalQuestions: Question[] = [
	{
		id: "high_blood_pressure",
		title: "Have you ever been diagnosed with high blood pressure?",
		skippable: true,
		options: [
			{
				value: "yes",
				label: "Yes",
				followUp: true,
				databaseTag: "high_blood_pressure",
				databaseValue: "yes",
			},
			{
				value: "no",
				label: "No",
				databaseTag: "high_blood_pressure",
				databaseValue: "no",
			},
			{
				value: "treated",
				label:
					"I did but it got better with exercise, weight loss, and decreasing alcohol intake",
				databaseTag: "high_blood_pressure",
				databaseValue: "treated",
			},
		],
		followUpQuestions: {
			yes: {
				id: "lvh",
				title:
					"Has a doctor ever told you that your heart is thicker than it should according to a test called an echocardiogram?",
				skippable: true,
				options: [
					{
						value: "never-done",
						label: "Never done",
						databaseTag: "LVH",
						databaseValue: 0,
					},
					{
						value: "mildly-thickened",
						label: "Yes, told it was mildly thickened (concentric remodelling)",
						databaseTag: "LVH",
						databaseValue: 1,
					},
					{
						value: "moderately-thickened",
						label: "Yes, it was moderately thickened",
						databaseTag: "LVH",
						databaseValue: 2,
					},
					{
						value: "severely-thickened",
						label: "Yes, it was severely thickened",
						databaseTag: "LVH",
						databaseValue: 3,
					},
					{
						value: "unsure",
						label: "Unsure, but will ask my doctor next time I see them",
						databaseTag: "LVH",
						databaseValue: 100,
					},
				],
				databaseTag: "LVH",
			},
		},
		databaseTag: "high_blood_pressure",
	},
	{
		id: "diabetes",
		title: "Do you have diabetes?",
		skippable: true,
		options: [
			{
				value: "yes",
				label: "Yes",
				followUp: true,
				databaseTag: "RISK",
				databaseValue: "Type 2 diabetes",
			},
			{
				value: "no",
				label: "No",
				databaseTag: "RISK",
				databaseValue: "No diabetes",
			},
			{
				value: "borderline",
				label: "I was told I am borderline (impaired fasting glucose)",
				databaseTag: "RISK",
				databaseValue: "Impaired fasting glucose",
			},
			{
				value: "impaired-tolerance",
				label:
					"I have impaired glucose tolerance after having completed a glucose tolerance test",
				databaseTag: "RISK",
				databaseValue: "Impaired glucose tolerance",
			},
		],
		followUpQuestions: {
			yes: {
				id: "diabetes_treatment",
				title: "How is your diabetes treated?",
				description: "Select all that apply.",
				skippable: true,
				options: [
					{
						value: "diet-exercise",
						label: "Diet and exercise",
						databaseTag: "RISK1",
						databaseValue: "Diet and exercise",
					},
					{
						value: "diet-exercise-pills",
						label: "Diet, exercise, and pills",
						databaseTag: "RISK1",
						databaseValue: "Diet, exercise, and pills",
					},
					{
						value: "diet-exercise-pills-injections",
						label: "Diet, exercise, pills and injections",
						databaseTag: "RISK1",
						databaseValue: "Diet, exercise, pills and injections",
					},
					{
						value: "diet-exercise-pills-insulin",
						label: "Diet, exercise, pills and insulin",
						databaseTag: "RISK1",
						databaseValue: "Diet, exercise, pills and insulin",
					},
				],
				databaseTag: "RISK1",
			},
		},
		databaseTag: "RISK",
	},
	{
		id: "kidney_issues",
		title: "Do you have kidney issues?",
		skippable: true,
		options: [
			{ value: "none", label: "No", databaseTag: "CRFQ", databaseValue: "No" },
			{
				value: "mild",
				label: "Yes - but mild impairment",
				databaseTag: "CRFQ",
				databaseValue: "Mild impairment",
			},
			{
				value: "moderate",
				label: "Yes - moderately impaired",
				databaseTag: "CRFQ",
				databaseValue: "Moderate impairment",
			},
			{
				value: "severe",
				label: "Yes - severely impaired function",
				databaseTag: "CRFQ",
				databaseValue: "Severe impairment",
			},
			{
				value: "not-sure",
				label: "I think so but not sure",
				databaseTag: "CRFQ",
				databaseValue: "Uncertain",
			},
			{
				value: "dont-know",
				label: "Don't know",
				databaseTag: "CRFQ",
				databaseValue: 100,
			},
		],
		databaseTag: "CRFQ",
	},
	{
		id: "lipoprotein_a",
		title:
			"Have you ever been tested for a type of cholesterol problem called elevated lipoprotein a level?",
		skippable: true,
		options: [
			{
				value: "never-done",
				label: "Never tested",
				databaseTag: "LPAQ",
				databaseValue: 0,
			},
			{
				value: "normal",
				label: "Yes, and it was normal",
				databaseTag: "LPAQ",
				databaseValue: 1,
			},
			{
				value: "borderline",
				label: "Yes, and it was borderline",
				databaseTag: "LPAQ",
				databaseValue: 2,
			},
			{
				value: "elevated",
				label: "Yes, and it was elevated",
				databaseTag: "LPAQ",
				databaseValue: 3,
			},
			{
				value: "not-sure",
				label: "Not sure",
				databaseTag: "LPAQ",
				databaseValue: 100,
			},
		],
		databaseTag: "LPAQ",
	},
	{
		id: "misc_medical",
		title: "Have you ever been diagnosed with any of the following conditions?",
		description: "Select all that apply.",
		skippable: true,
		options: [
			{
				value: "low-thyroid",
				label: "Low thyroid level",
				databaseTag: "PMH",
				databaseValue: "low-thyroid",
			},
			{
				value: "osteoporosis",
				label: "Osteoporosis",
				databaseTag: "PMH",
				databaseValue: "osteoporosis",
			},
			{
				value: "gi-issues",
				label:
					"Gastrointestinal issues (inflammatory bowel disease, irritable bowel syndrome)",
				databaseTag: "PMH",
				databaseValue: "gi-issues",
			},
			{
				value: "rheumatologic",
				label:
					"Rheumatologic conditions (lupus, psoriatic arthritis, ankylosing spondylitis, rheumatoid arthritis)",
				databaseTag: "PMH",
				databaseValue: "rheumatologic",
			},
			{ value: "hiv", label: "HIV", databaseTag: "PMH", databaseValue: "hiv" },
			{
				value: "viral-illness",
				label: "Viral illnesses (hepatitis, TB)",
				databaseTag: "PMH",
				databaseValue: "viral-illness",
			},
			{
				value: "acid-reflux",
				label: "Heartburn, acid reflux, or ulcers",
				databaseTag: "PMH",
				databaseValue: "acid-reflux",
			},
			{
				value: "mental-health",
				label: "Depression or anxiety",
				databaseTag: "PMH",
				databaseValue: "mental-health",
			},
			{
				value: "dementia",
				label: "Dementia",
				databaseTag: "PMH",
				databaseValue: "dementia",
			},
			{
				value: "cancer",
				label: "Cancer",
				databaseTag: "PMH",
				databaseValue: "cancer",
				followUp: true,
			},
			{
				value: "none",
				label: "None of the above",
				databaseTag: "PMH",
				databaseValue: "none",
			},
		],
		followUpQuestions: {
			cancer: {
				id: "cancer_type",
				title: "What type of cancer were you diagnosed with?",
				skippable: true,
				options: [
					{
						value: "skin",
						label: "Skin cancer",
						databaseTag: "PMH1",
						databaseValue: "skin-cancer",
					},
					{
						value: "brain",
						label: "Brain cancer",
						databaseTag: "PMH1",
						databaseValue: "brain-cancer",
					},
					{
						value: "lung",
						label: "Lung cancer",
						databaseTag: "PMH1",
						databaseValue: "lung-cancer",
					},
					{
						value: "breast",
						label: "Breast cancer",
						databaseTag: "PMH1",
						databaseValue: "breast-cancer",
					},
					{
						value: "heart",
						label: "Heart tumor",
						databaseTag: "PMH1",
						databaseValue: "heart-tumor",
					},
					{
						value: "esophagus",
						label: "Esophagus cancer",
						databaseTag: "PMH1",
						databaseValue: "esophagus-cancer",
					},
					{
						value: "gastric",
						label: "Stomach/gastric cancer",
						databaseTag: "PMH1",
						databaseValue: "gastric-cancer",
					},
					{
						value: "colon",
						label: "Bowel cancer/colon cancer",
						databaseTag: "PMH1",
						databaseValue: "colon-cancer",
					},
					{
						value: "bladder",
						label: "Bladder cancer",
						databaseTag: "PMH1",
						databaseValue: "bladder-cancer",
					},
					{
						value: "rectal",
						label: "Rectal cancer",
						databaseTag: "PMH1",
						databaseValue: "rectal-cancer",
					},
					{
						value: "ovarian",
						label: "Ovarian cancer",
						databaseTag: "PMH1",
						databaseValue: "ovarian-cancer",
					},
					{
						value: "uterine",
						label: "Uterine cancer",
						databaseTag: "PMH1",
						databaseValue: "uterine-cancer",
					},
					{
						value: "hodgkins",
						label: "Hodgkin's lymphoma",
						databaseTag: "PMH1",
						databaseValue: "hodgkins-lymphoma",
					},
					{
						value: "non-hodgkins",
						label: "Non-Hodgkin's lymphoma",
						databaseTag: "PMH1",
						databaseValue: "non-hodgkins-lymphoma",
					},
					{
						value: "leukemia",
						label: "Leukemia",
						databaseTag: "PMH1",
						databaseValue: "leukemia",
					},
					{
						value: "thyroid",
						label: "Thyroid cancer",
						databaseTag: "PMH1",
						databaseValue: "thyroid-cancer",
					},
					{
						value: "other",
						label: "Other",
						databaseTag: "PMH1",
						databaseValue: "other-cancer",
					},
				],
				databaseTag: "PMH1",
			},
		},
		databaseTag: "PMH",
	},
];

export default medicalQuestions;

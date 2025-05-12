import { Question } from "./questions";

export const personalQuestions: Question[] = [
	{
		id: "gender",
		title: "Are you male or female?",
		description: "",
		skippable: true,
		options: [
			{
				value: "male",
				label: "Male",
				databaseTag: "gender",
				databaseValue: "male",
			},
			{
				value: "female",
				label: "Female",
				databaseTag: "gender",
				databaseValue: "female",
			},
			{
				value: "prefer-not-to-say",
				label: "Prefer not to say",
				databaseTag: "gender",
				databaseValue: "prefer-not-to-say",
			},
		],
		databaseTag: "gender",
	},
	{
		id: "date_of_birth",
		title: "What is your date of birth?",
		description: "This helps us provide age-appropriate care recommendations.",
		skippable: true,
		options: [],
		databaseTag: "dob",
	},
	{
		id: "emergency_contact",
		title: "Enter emergency contact information",
		description: "This person may be contacted in case of emergency.",
		skippable: true,
		options: [
			{
				value: "add",
				label: "Add emergency contact",
				databaseTag: "emergency_contact",
				databaseValue: "add",
			},
			{
				value: "skip",
				label: "Skip for now",
				databaseTag: "emergency_contact",
				databaseValue: "skip",
			},
		],
		inputFields: {
			add: [
				{
					id: "emergency_contact_name",
					title: "Contact Name",
					placeholder: "Enter full name",
					keyboardType: "default",
					databaseTag: "emergency_contact_name",
				},
				{
					id: "emergency_contact_relationship",
					title: "Relationship",
					placeholder: "E.g. Spouse, Child, Friend",
					keyboardType: "default",
					databaseTag: "emergency_contact_relationship",
				},
				{
					id: "emergency_contact_phone",
					title: "Phone Number",
					placeholder: "Enter phone number",
					keyboardType: "phone-pad",
					databaseTag: "emergency_contact_phone",
				},
			],
		},
		databaseTag: "emergency_contact",
	},
	{
		id: "ethnicity",
		title: "What ethnicity are you?",
		description: "This information helps us provide more personalized care.",
		skippable: true,
		options: [
			{
				value: "rather-not-say",
				label: "Rather not say",
				databaseTag: "ETHN",
				databaseValue: "not-disclosed",
			},
			{
				value: "african-descent",
				label: "African descent",
				databaseTag: "ETHN",
				databaseValue: "african-descent",
			},
			{
				value: "african-american",
				label: "African-American",
				databaseTag: "ETHN",
				databaseValue: "african-american",
			},
			{
				value: "caucasian",
				label: "Caucasian",
				databaseTag: "ETHN",
				databaseValue: "caucasian",
			},
			{
				value: "hispanic",
				label: "Hispanic",
				databaseTag: "ETHN",
				databaseValue: "hispanic",
			},
			{
				value: "east-indian",
				label: "East Indian",
				databaseTag: "ETHN",
				databaseValue: "east-indian",
			},
			{
				value: "afro-caribbean",
				label: "Afro Caribbean",
				databaseTag: "ETHN",
				databaseValue: "afro-caribbean",
			},
			{
				value: "eastern-block",
				label: "Eastern block",
				databaseTag: "ETHN",
				databaseValue: "eastern-block",
			},
			{
				value: "slavik",
				label: "Slavik countries",
				databaseTag: "ETHN",
				databaseValue: "slavik",
			},
			{
				value: "greek",
				label: "Greek",
				databaseTag: "ETHN",
				databaseValue: "greek",
			},
		],
		databaseTag: "ETHN",
	},
	{
		id: "height_weight",
		title: "Height and Weight",
		description: "This helps us calculate your body mass index (BMI).",
		skippable: true,
		options: [
			{
				value: "metric",
				label: "Enter in Metric (cm, kg)",
				databaseTag: "height_weight_unit",
				databaseValue: "metric",
			},
			{
				value: "imperial",
				label: "Enter in Imperial (feet/inches, lbs)",
				databaseTag: "height_weight_unit",
				databaseValue: "imperial",
			},
		],
		databaseTag: "height_weight_unit",
	},

	{
		id: "family_history",
		title: "Is there a family history of heart disease?",
		description:
			"First and second-generation family members with heart conditions.",
		skippable: true,
		options: [
			{
				value: "yes",
				label: "Yes",
				followUp: true,
				databaseTag: "SOCH",
				databaseValue: "yes",
			},
			{ value: "no", label: "No", databaseTag: "SOCH", databaseValue: "no" },
			{
				value: "unknown",
				label: "Unknown",
				databaseTag: "SOCH",
				databaseValue: "unknown",
			},
		],
		followUpQuestions: {
			yes: {
				id: "family_relationship",
				title: "Which family members have heart disease?",
				description: "Select all that apply.",
				skippable: true,
				options: [
					{
						value: "parents",
						label: "Parents",
						databaseTag: "SOCH1",
						databaseValue: "parents",
					},
					{
						value: "grandparents",
						label: "Grandparents",
						databaseTag: "SOCH1",
						databaseValue: "grandparents",
					},
					{
						value: "siblings",
						label: "Brothers or Sisters",
						databaseTag: "SOCH1",
						databaseValue: "siblings",
					},
					{
						value: "aunts-uncles",
						label: "Aunts or Uncles",
						databaseTag: "SOCH1",
						databaseValue: "aunts-uncles",
					},
					{
						value: "cousins",
						label: "Cousins",
						databaseTag: "SOCH1",
						databaseValue: "cousins",
					},
					{
						value: "children",
						label: "Children",
						databaseTag: "SOCH1",
						databaseValue: "children",
					},
				],
				databaseTag: "SOCH1",
			},
		},
		databaseTag: "SOCH",
	},
];

export default personalQuestions;

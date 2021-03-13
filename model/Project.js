const mongoose = require("mongoose");
const yup = require("yup");

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	tasks: {
		type: Array,
		required: true
	},
	status: {
		type: String,
		required: true,
		default: "to-do"
	},
	assigned: {
		type: String,
		type: Array,
		required: true
	}
});

const Project = mongoose.model("Project", projectSchema);

const projectValidationSchema = yup.object().shape({
	name: yup.string().required(),
	tasks: yup.array().required()
});

const validateProject = (project) => {
	return projectValidationSchema.validate(project, { abortEarly: false });
};

module.exports = {
	Project,
	validateProject
};

// status: yup
// .string()
// .required()
// .test("status", "Invalid status", (value) => {
// 	const states = ["to-do", "in-progress", "done"];
// 	return states.includes(value);
// })

//  tasks: yup
// .test(
// 	"tasks",
// 	"project must include at least 1 task",
// 	(tasks) => tasks.length > 0
// )

const mongoose = require("mongoose");
const yup = require("yup");

const taskSchema = new mongoose.Schema({
	project_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project"
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	status: {
		type: String,
		required: true,
		default: "to-do"
	},
	assignee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
});

taskSchema.methods.addTaskToProject = async (task, projectId) => {
	const project = await Project.findById(projectId);
	project.tasks.push(task);
};

const Task = mongoose.model("Task", taskSchema);

const taskValidationSchema = yup.object().shape({
	project_id: yup.string().required(),
	title: yup.string().required(),
	description: yup.string().required(),
	assignee: yup.string().required()
});

const validateTask = (task) => {
	return taskValidationSchema.validate(task, { abortEarly: false });
};

module.exports = {
	Task,
	validateTask
};

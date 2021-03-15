const { Task, validateTask } = require("../model/Task");
const { Project } = require("../model/Project");

const addNewTask = async (req, res) => {
	// validate input
	try {
		await validateTask(req.body);
	} catch (error) {
		return res.status(400).json(error.errors);
	}

	const { title, description, assignee, project_id } = req.body;

	try {
		let task = await Task.findOne({ title: title });
		if (task)
			return res
				.status(400)
				.json({ message: "task with the same already exist" });

		task = new Task({
			title,
			description,
			assignee,
			project_id
		});
		// save the task
		await task.save();

		// add the task to it's Project
		const project = await Project.findById(project_id);
		project.tasks.push(task);
		await project.save();

		res.json({
			message: "task added succsessfully",
			task: task
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { addNewTask };

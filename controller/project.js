const { Project, validateProject } = require("../model/Project");

const config = require("config");

const addNewProject = async (req, res) => {
	// validate input
	try {
		await validateProject(req.body);
	} catch (error) {
		return res.status(400).json(error.errors);
	}

	const { name, tasks } = req.body;

	try {
		let project = await Project.findOne({ name: name });
		if (project)
			return res
				.status(400)
				.json({ message: "project with the same already exist" });

		project = new Project({
			name,
			tasks
		});

		await project.save();

		res.json({
			message: "project added succsessfully",
			project: project
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { addNewProject };

const Task = require("../model/Task");
const asyncWrapper = require("../middeleware/async");
const { createCustomError } = require('../error/custom-error');


const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res,next) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: TaskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${TaskID}`, 404));
  }
  return res.status(200).json(task);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: TaskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${TaskID}`, 404));
  }
  return res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};

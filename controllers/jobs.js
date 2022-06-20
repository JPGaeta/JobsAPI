const Jobs = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({createdBy: req.user.userId})
  res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const getJob = async (req, res) => {
  res.send('get single')
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Jobs.create(req.body)
  res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
  res.send('update')
}

const deleteJob = async (req, res) => {
  res.send('delete')
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
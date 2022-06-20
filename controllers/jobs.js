const Jobs = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({createdBy: req.user.userId})
  res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const getJob = async (req, res) => {
  const {user:{userId}, params:{id: jobId}} = req
  
  const job = await Jobs.findOne({_id: jobId, createdBy: userId})
  if(!job){
    throw new NotFoundError('Job not found')
  }
  res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Jobs.create(req.body)
  res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
  const {user:{userId}, params:{id: jobId}, body:{company, position}} = req

  if(company === '' || position === ''){
    throw new BadRequestError('Company and/or Position are required')
  }
  const job = await Jobs.findByIdAndUpdate({_id: jobId, createdBy: userId}, req.body, {new: true, runValidators: true})
  if(!job){
    throw new NotFoundError('Job not found')
  }
  res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
  const {user:{userId}, params:{id: jobId}, body:{company, position}} = req

  const job = await Jobs.findByIdAndRemove({_id: jobId, createdBy: userId})
  if(!job){
    throw new NotFoundError('Job not found')
  }
  res.status(StatusCodes.OK).json({job})
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
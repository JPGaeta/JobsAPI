
const getAllJobs = async (req, res) => {
  res.send('register')
}

const getJob = async (req, res) => {
  res.send('get single')
}

const createJob = async (req, res) => {
  res.send('create')
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
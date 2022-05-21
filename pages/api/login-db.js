import data from 'utils/db.json'
export default async function handler(req, res) {
  const userFormClient = JSON.parse(req.body)
  const user = data.find(user=>user.name ===userFormClient.name && user.password===userFormClient.password) || null
  res.status(200).json({user: user})
}
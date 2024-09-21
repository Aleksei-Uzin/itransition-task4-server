import express from 'express'
import { ObjectId } from 'mongodb'
import { db } from '../db/connection.js'

const router = express.Router()

router.get('/', async (request, response) => {
  const collection = await db.collection('users')
  const result = await collection.find({}).toArray()
  response.send(result).status(200)
})

router.get('/:id', async (request, response) => {
  const collection = await db.collection('users')
  const query = { _id: new ObjectId(request.params.id) }
  const result = await collection.findOne(query)

  if (!result) response.send('Not found').status(404)
  else response.send(result).status(200)
})

router.post('/', async (request, response) => {
  try {
    const newDocument = {
      name: request.body.name,
      email: request.body.email,
      creationTime: request.body.creationTime,
      lastSignInTime: request.body.lastSignInTime,
      status: request.body.status,
      authUID: request.body.authUID,
    }
    const collection = await db.collection('users')
    const result = await collection.insertOne(newDocument)
    response.send(result).status(204)
  } catch (err) {
    console.error(err)
    response.status(500).send('Error adding record')
  }
})

router.patch('/:id', async (request, response) => {
  try {
    const query = { _id: new ObjectId(request.params.id) }
    const updates = {
      $set: {
        name: request.body.name,
        email: request.body.email,
        creationTime: request.body.creationTime,
        lastSignInTime: request.body.lastSignInTime,
        status: request.body.status,
        authUID: request.body.authUID,
      },
    }

    let collection = await db.collection('users')
    let result = await collection.updateOne(query, updates)
    response.send(result).status(200)
  } catch (err) {
    console.error(err)
    response.status(500).send('Error updating record')
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const query = { _id: new ObjectId(request.params.id) }
    const collection = await db.collection('users')
    const result = await collection.deleteOne(query)
    response.send(result).status(200)
  } catch (err) {
    console.error(err)
    response.status(500).send('Error deleting record')
  }
})

export default router

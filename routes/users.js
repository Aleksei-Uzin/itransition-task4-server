import admin from 'firebase-admin'
import express from 'express'
import { ObjectId } from 'mongodb'
import { db } from '../db/connection.js'

const databaseURL = process.env.FIREBASE_DATABASE_URL

const type = process.env.TYPE
const project_id = process.env.PROJECT_ID
const private_key_id = process.env.PRIVATE_KEY_ID
const private_key = process.env.PRIVATE_KEY
const client_email = process.env.CLIENT_EMAIL
const client_id = process.env.CLIENT_ID
const auth_uri = process.env.AUTH_URI
const token_uri = process.env.TOCKEN_URI
const auth_provider_x509_cert_url = process.env.AUTH_PROVIDER
const client_x509_cert_url = process.env.CLIENT_X509
const universe_domain = process.env.UNIVERSE_DOMAIN

admin.initializeApp({
  credential: admin.credential.cert({
    type,
    project_id,
    private_key_id,
    private_key,
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url,
    universe_domain,
  }),
  databaseURL,
})

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
    const status = request.body.status
    const updates = {
      $set: {
        status,
      },
    }

    await admin.auth().updateUser(request.body.uid, {
      disabled: !status,
    })

    const collection = await db.collection('users')
    const result = await collection.updateOne(query, updates)

    response.send(result).status(200)
  } catch (err) {
    console.error(err)
    response.status(500).send(err.message)
  }
})

router.patch('/', async (request, response) => {
  try {
    const email = request.body.email
    const updates = {
      $set: {
        lastSignInTime: request.body.lastSignInTime,
      },
    }

    const collection = await db.collection('users')
    const { _id } = await collection.findOne({ email })
    const result = await collection.updateOne({ _id }, updates)
    response.send(result).status(200)
  } catch (err) {
    console.error(err)
    response.status(500).send('Error updating record')
  }
})

router.delete('/:id/:uid', async (request, response) => {
  try {
    const query = { _id: new ObjectId(request.params.id) }
    const collection = await db.collection('users')
    const result = await collection.deleteOne(query)

    await admin.auth().deleteUser(request.params.uid)

    response.send(result).status(200)
  } catch (err) {
    console.error(err)
    response.status(500).send('Error deleting record')
  }
})

export default router

import admin from 'firebase-admin'
import express from 'express'
import { ObjectId, MongoServerError } from 'mongodb'
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
    /* credentials */
    type: 'service_account',
    project_id: 'itransition-task4-auth-app',
    private_key_id: '05bbb4cd622995856206e789187c1bf5de81e7d0',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSp5TNzKjfNGkh\nFhnfbC3SeMyXR4BXxT1IjyJd0N9V5WLZXcLc0zSaD0q4RbWQ3ONzeUwbNOJnNUlD\nKSh8bWR3vIFgy08k6DCXuzLuikxPksKa3YhbY6Kms4xj3XdY9Moa3tWtHsoX2EJ4\nkchmO5AGuE+qNzbhrioqnIb8rtcNx1ygJSV5Ar4nxMI+bSKa9au/uZDxBFTDefLA\nRRQhqaXGI2sIy2nJZJMCVFQEeT1nqAZL4NVsh/NU2G1CU7PVDnutyT0N66PYQDS3\nrgpUFhWMTWnwjSXyhYqehGq1ag6xcZGzwSKpGiHogIqV0QLIK34PrDfEL6m+JT2I\nFsbEZbnFAgMBAAECggEACwoaO8DGdtAN1FyOpY1LR3TqL+Fg4filsghCQk1gbuVz\nDTYjMKRm5M35WffZQIq65sHMEb7vQH5j5P+irgajlbzMwPBWqPX8Ge+HB0Y7Io5r\n4WbLrxJlIzxUlqU0DHbjoo3b/9MVvzMnpJ7rNCRZ82g0UJTNLP2OGyaR0mstPP0F\nz4xN/S3P/dd8I8uk1Tnhd5KmLq9IL+EpTw7ae0F1vOkan+rLa0x9T/V/x16GAD0K\nNtWLRI7aL2JWOdwcNXiQUhqvaWLGNS03X6NaYQOtikaiBjUPWvpy5A/r9TUJISxI\ndrrmt+g3pA4T6q3FcS1csjooabW/W9LCn3WdQeW6IQKBgQDrZ7jeo+5pVAeG6hfd\nltmgOloZkW17z2QUnOigoE0Uyeol5Il4lQDB8z2LR7qydQvAJdS2Vk+0S4KLkY2x\nmpOBBpH8QeRQSlkg/enWs97tIdKgVlKxOXMgAU+qzyxtgpEr/KoekQwzN+axRKoT\nmZLcZxUEn5g1orEXWYQ7zz/PEQKBgQDlFYfaWAUTXxbdZBOhJ4lNkJ6UrdtIYBoa\nMwCBgqISw+KK8da7WBmuN2QGWkHjVHm6sqTEZ2tvgXOTooL+ftk13GXpnqiU9wGu\n7JWTtwUQfiUL8/cuUbPgAqDwkBzh51Oo6Pc6vpOcwKXG7J+2uTa8TJWpS5AbQMBB\nmG+H+aindQKBgQCq+CQOn2USXpMw62f16g+ZDYhOtY6cs11ukx9pOcOB67wBVWB6\nkU2Bj5YNSEVSQywLm+5Hl5w/x+/CSi5s5WVn+kuguIKHxdfB3GgvJWgtNblx9gAM\n8zqn7gvcdKdByeiB1/n+RT5lHJ6R9NrJbWp6ZOug9gBoRAb2fG9LuRQQ4QKBgQCE\nbwkFqgLtKvit7lAGxzNyGtwCeeueEKimYru1I08M6B9MUfjgf1MBS1ZQ8dbLVCe3\nTdVBEcSjRsQJIlb2R2DM6WglQaqVy6I2fOEP7ytHWJWULmrEZUlGhF6EE9wOoMvV\nhzB9znTJlvl/YYYHfVVuUBvpLhzWFH3Qrg40HplojQKBgEvdrKhHUs3dwA4M6bFw\nUkoLJtrnx6q0uO2BKbW1jpv7KO1ftc31WQbnn0YFFMjiASbbKdMQmgWuxBzdS8jo\n3YSbn95XyF8oujkfkMhWZZ/GXjHspzx36uKqvQzuUx0vPAVPSn5LHNaiEw3kilWJ\ndwLzcDBv5L2D89hmlT5g727G\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-7qiza@itransition-task4-auth-app.iam.gserviceaccount.com',
    client_id: '103591005007629044900',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7qiza%40itransition-task4-auth-app.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
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
  const keyValueField = 'email'

  try {
    const newDocument = {
      name: request.body.name,
      email: request.body.email,
      creationTime: request.body.creationTime,
      lastSignInTime: request.body.lastSignInTime,
      status: request.body.status,
    }
    const collection = await db.collection('users')
    const result = await collection.insertOne(newDocument)
    collection.createIndex({ [keyValueField]: 1 }, { unique: true })
    response.send(result).status(204)
  } catch (err) {
    let errMessage

    if (err instanceof MongoServerError) {
      switch (err.code) {
        case 11000: {
          const duplicateField = err.keyValue[keyValueField]
          errMessage = `Duplication Error: ${duplicateField} already exists`
          break
        }
        default:
          errMessage = err.errmsg
      }
    }

    response.status(500).send(errMessage)
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

    const { uid } = await admin.auth().getUserByEmail(request.body.email)
    await admin.auth().updateUser(uid, {
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

router.delete('/:id/:email', async (request, response) => {
  try {
    const query = { _id: new ObjectId(request.params.id) }
    const collection = await db.collection('users')
    const result = await collection.deleteOne(query)

    const { uid } = await admin.auth().getUserByEmail(request.params.email)
    await admin.auth().deleteUser(uid)

    response.send(result).status(200)
  } catch (err) {
    console.error(err)
    response.status(500).send('Error deleting record')
  }
})

export default router

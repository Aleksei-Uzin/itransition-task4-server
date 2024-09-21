import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = process.env.ATLAS_URI || ''

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

try {
  await client.connect()
  await client.db('admin').command({ ping: 1 })
  console.log('Pinged your deployment. You successfully connected to MongoDB!')
} catch (err) {
  console.error(err)
}

export let db = client.db('Auth_Users')

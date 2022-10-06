let http = require('http');
let mongo = require('mongodb');
const {MongoClient} = require('mongodb'); 
const PORT = 5000;
const uri = 'mongodb://localhost:27017/test_project'

const client = new MongoClient(uri)

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("test_project").command({ ping: 1 });
    console.log("Connected successfully to server");
    const test_project = client.db("test_project")
    let cursor = test_project.collection('test_collection').find()
    let list = []
    await cursor.forEach( item => list.push(item));
    list = JSON.stringify(list)
    return list
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


const server = http.createServer(async (req, res) => {
  //set the request route
  if (req.url === "/api" && req.method === "GET") {
      //response headers
      res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'});
      const jsonData = await run().catch(console.dir);
      res.end(jsonData);
  }

  // If no route present
  else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
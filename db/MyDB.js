import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

function MyDB() {
  const myDB = {};
  const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017";
  myDB.createUser = async function (user = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const users = client.db("AlignCareer").collection("users");
      const success = await users.findOne({ user: user.user });
      if (success) {
        return false;
      }
      const new_user = await users.insertOne(user);
      const response = await users.findOne({ _id: new_user.insertedId });
      return { success: true, user_details: response };
    } finally {
      console.log("AlignCareer: Closing db connection");
      client.close();
    }
  };
  myDB.getUser = async function (user = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const users = client.db("AlignCareer").collection("users");
      const res = await users.findOne({ user: user.user });
      return res;
    } finally {
      console.log("AlignCareer: Closing db connection");
      client.close();
    }
  };
  myDB.updateProfile = async function (user = {}, profile = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const users = client.db("AlignCareer").collection("users");
      console.log("user " + user);
      console.log(profile);
      const res = await users.updateOne(
        { user: user.user },
        {
          $set: {
            location: profile.location,
            program: profile.program,
            offers: profile.offers,
            skills: profile.skills,
          },
        }
      );
      return res;
    } finally {
      console.log("AlignCareer: Closing db connection");
      client.close();
    }
  };
  myDB.authenticate = async function (user = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const users = client.db("AlignCareer").collection("users");
      const userInDb = await users.findOne({ user: user.user });
      console.log("first");
      if (!userInDb || userInDb.password != user.password) {
        return { success: false, user_details: {} };
      }
      return { success: true, user_details: userInDb };
    } finally {
      console.log("AlignCareer: Closing db connection");
      client.close();
    }
  };
  myDB.createPost = async function (entry = {}, user = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const posts = client.db("AlignCareer").collection("posts");
      const res = await posts.insertOne({
        author: user.user,
        title: entry.title,
        content: entry.content,
        writerEmail: entry.writerEmail,
      });
      return res;
    } finally {
      console.log("AlignCareer: Closing db connection");
      client.close();
    }
  };
  myDB.listPosts = async function (page = 1) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const posts = client.db("AlignCareer").collection("posts");
      const res = await posts
        .find()
        .skip((page - 1) * 10)
        .limit(10)
        .toArray();
      return res;
    } finally {
      console.log("AlignCareer: Closing db connection");
      client.close();
    }
  };
  myDB.getPost = async function (id = "") {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const posts = client.db("AlignCareer").collection("posts");
      const res = await posts.findOne({ _id: ObjectId(id) });
      return res;
    } finally {
      console.log("AlignCareer: Closing db connection");
      client.close();
    }
  };

  myDB.getEmail = async function (id = "") {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const users = client.db("AlignCareer").collection("users");
      const res = await users.findOne({ id: users.user });
      //
      console.log(id);
      return res.email;
    } finally {
      console.log("AlignCareer: Closing db connection");
      client.close();
    }
  };

  myDB.updatePost = async function (id = "", entry = {}) {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const posts = client.db("AlignCareer").collection("posts");
      const res = await posts.updateOne(
        { _id: ObjectId(id) },
        { $set: { content: entry.content } }
      );
      return res;
    } finally {
      console.log("AlignCareer: Closing db connection");
      client.close();
    }
  };
  myDB.deletePost = async function (id = "") {
    let client;
    try {
      client = new MongoClient(mongoURL);
      const posts = client.db("AlignCareer").collection("posts");
      const res = await posts.deleteOne({ _id: ObjectId(id) });
      return res;
    } finally {
      console.log("AlignCareer: Closing db connection");
      client.close();
    }
  };
  return myDB;
}

export default MyDB();

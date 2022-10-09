const mongoose = require("mongoose");
//  if database not present it create new one
mongoose
  .connect("mongodb://localhost:27017/anshu")
  .then(() => {
    console.log("succes");
  })
  .catch((err) => {
    console.log(err);
  });
//    a mongoose schema defines the structure of a document /
//  default values , validator etc.

const mySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: String,
  age: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

// A mongoose model is a wrapper on mongoose schema .
//  it provide an inferace to database for creating
//  quering  , updating  , deleting records , etc .

// collection creation
//  first is collection name shoulbe be capital
const Playlist = new mongoose.model("Playlist", mySchema);

//  create document or insert
const createDocumnet = async () => {
  try {
    const reactPlaylist = new Playlist({
      name: "devil",
      class: "bca",
      age: 20,
    });
    const JavscriptPlaylist = new Playlist({
      name: "hola",
      class: "mca",
      age: 22,
    });
    const mongoosePlaylist = new Playlist({
      name: "mogo",
      class: "mongojs",
      age: 21,
    });
    //  reactPlaylist.save for single document
    //  for multiple document
    const result = await Playlist.insertMany([
      reactPlaylist,
      JavscriptPlaylist,
      mongoosePlaylist,
    ]);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// createDocumnet();
const getDocument = async () => {
  const result = await Playlist.find({ name: "devil" })
    //    1 for true 0 for false
    //  it will only show name only
    .select({ _id: 0 ,name: 1 });
  console.log(result);
};

getDocument();

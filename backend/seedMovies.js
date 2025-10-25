require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/Movie');

async function seedMovies() {
  await mongoose.connect(process.env.MONGO_URI);
  await Movie.deleteMany({}); // clear previous data

  const movies = [
    { title: "Inception", genre: "Sci-Fi", language: "English", description: "A thief who steals corporate secrets through dream-sharing technology." },
    { title: "Avatar", genre: "Fantasy", language: "English", description: "A marine on an alien planet becomes torn between following orders and protecting a new world." },
    { title: "Leo", genre: "Action", language: "Tamil", description: "An ordinary man with a dark past is forced to reveal his hidden identity." },
    { title: "KGF", genre: "Action", language: "Kannada", description: "A man rises from poverty to become a gold mine empire king." },
    { title: "Jawan", genre: "Thriller", language: "Hindi", description: "A vigilante fights corruption and injustice for a better future." }
  ];

  await Movie.insertMany(movies);
  console.log("✅ Movies seeded successfully");
  process.exit();
}

seedMovies().catch(err => console.error(err));

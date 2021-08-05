
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected')
});

const sample = (array) => {
	return array[Math.floor(Math.random() * array.length)]
}

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '61097bd0b3cbba4f04d2dcbf',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)} `,
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis praesentium dolor nihil hic accusamus excepturi! Commodi nisi dicta minima tempora laboriosam.',
			price,
			images: [
				{
					url: 'https://res.cloudinary.com/nopius/image/upload/v1628082558/YelpCamp/n1hucmkxodcerjzqswqc.jpg',
					filename: 'YelpCamp/n1hucmkxodcerjzqswqc'
				}
			]
		})
		camp.save()
	}
}

seedDB();
// .then(() => {
// 	mongoose.connection.close();
// })
// 	.catch((e) => {
// 		console.log('Error!')
// 	})
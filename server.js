require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fetch = require('node-fetch');
const cryptoRouter = require('./routes/getCryptoPrice');
const rssRouter = require('./routes/getRSSFeed');

const server = express();

const PORT = process.env.PORT || 8080;

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res, next) => {
	try {
		res.status(200).send('The API is up and running');
	} catch (error) {
		res.status(404).send({ message: 'ran into an issue' }, error);
	}
});

server.use('/crypto', cryptoRouter);
server.use('/rss', rssRouter);

server.listen(PORT, () => {
	console.log(
		`🚀 Server is running on ${process.env.NODE_ENV} mode at: http://localhost:${PORT}`
	);
});

module.exports = server;

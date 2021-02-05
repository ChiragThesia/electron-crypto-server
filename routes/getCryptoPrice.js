require('dotenv').config();
const express = require('express');
const router = express.Router();

const rp = require('request-promise');
const requestOptions = {
	method: 'GET',
	headers: {
		'X-CMC_PRO_API_KEY': process.env.CRYPTO_PRICE
	},
	json: true
};

router.get('/getCryptoPrice', async (req, res, next) => {
	const { crypto } = req.query;
	const lowerCaseCryptoName = crypto.toLowerCase();
	await rp({
		...requestOptions,
		uri: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=${lowerCaseCryptoName}`
	})
		.then((coin) => {
			const valuesFromData = Object.values(coin.data);
			const valuesFromQuote = Object.values(valuesFromData[0].quote);
			const { name, symbol } = valuesFromData[0];
			const { price } = valuesFromQuote[0];
			res.status(200).send({ name, price, symbol });
		})
		.catch((error) => {
			console.log(error);
			next(error);
		});
});

module.exports = router;

require('dotenv').config();
const express = require('express');
const router = express.Router();

const Parser = require('rss-parser');
const rssParser = new Parser();

const links = [
	'https://rss.app/feeds/3yobdKnGIdX6zNhq.xml',
	'https://rss.app/feeds/i3C9Ngb6YSdQxjap.xml'
];
router.get('/rssFeed', async (req, res, next) => {
	try {
		const rssLinks = links.map((link) => {
			const newLinks = rssParser.parseURL(link);
			return newLinks;
		});
		const rssArray = await Promise.all(rssLinks).then((linkArray) => {
			// const linkData =
			return linkArray;
		});

		const linkData = rssArray.map((data) => {
			const tweetData = data.items.map((tweet) => {
				const { creator, title, link, pubDate } = tweet;
				const tweets = {
					name: creator,
					content: title,
					url: link,
					publicationDate: pubDate
				};
				return tweets;
			});
			return tweetData;
		});
		res.status(200).send(linkData);
	} catch (error) {
		next(error);
	}
});

module.exports = router;

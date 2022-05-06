const axios = require('axios');
var DomParser = require('react-native-html-parser').DOMParser;
const cheerio = require('react-native-cheerio');

const APIURL = 'https://mangapoisk.ru';
const getImages = async (url, j) => {
	try {
		let obj = [];
		let j = 0;
		await axios.get(APIURL + url).then(res => {
			const $ = cheerio.load(res.data);
			obj = $('img.page-image').map(function () {
				return {
					id: j++,
					href: $(this).attr('data-src') ?? $(this).attr('src'),
				};
			});
		});
		let b = obj.filter(v => {
			return v != undefined;
		});
		console.log(b[b.length - 1]);
		return b;
	} catch (e) {
		console.log(e);
	}
};

const getArticleData = async url => {
	try {
		let obj = {};

		await axios.get(APIURL + url).then(res => {
			const $ = cheerio.load(res.data);

			const article = $('div.card-body');
			let i = 0;
			let j = 0;
			obj = {
				titleRu: article.find('span.post-name').text(),
				titleEn: article
					.find('span.post-name-en')
					.text()
					.replace('/', ''),
				img: $('article img.img-fluid').attr('src'),
				rating: article.find('b.ratingValue').text(),
				reviews: $('div.post-info span').eq(0).text(),
				detailsData: [
					{
						name: 'Загужено глав',
						value: $('div.post-info span')
							.eq(5)
							.text()
							.split(' ')[1],
					},
					{
						name: 'Статус',
						value: $('div.post-info span')
							.eq(6)
							.text()
							.split(' ')[1],
					},
					{
						name: 'Тип',
						value: $(
							'.entry-title'
						)[0].childNodes[0].nodeValue.split('\n')[1],
					},
				],
				type: $('.entry-title')[0].childNodes[0].nodeValue.split(
					'\n'
				)[1],
				genres: $('div.post-info span')
					.eq(8)
					.text()
					.split(', ')
					.map(el => {
						return {
							name: el.trim(),
							id: i++,
						};
					}),
				year: $('div.post-info span').eq(9).text().split(' ')[1],
				description: $('div.manga-description').text().trim(),
				chapterList: $('ul.chapter-list-container li a').map(
					function () {
						return {
							id: j++,
							href: $(this).attr('href'),
							title: $(this).text().trim(),
							date: '31.12.9999',
							author: 'author',
						};
					}
				),
			};
		});
		return obj;
	} catch (e) {
		console.log('asda');
		console.log(e);
	}
};

const getCatalog = async (url, j) => {
	try {
		// console.log('started');
		let catalogList = [];
		let i = 0;
		await axios.get(url).then(res => {
			const $ = cheerio.load(res.data);
			$('article').map(function (i, el) {
				// this === el

				catalogList.push({
					title: $(this).find('a').attr('title'),
					description: $(this).find('p.card-text').text(),
					href: $(this).find('a.card-about').attr('href'),
					img:
						$(this).find('img.card-img-top').attr('data-src') ??
						$(this).find('img.card-img-top').attr('src'),
					id: i++,
					chaptersCount: $(this)
						.find('.card-numbers-item span')
						.eq(0)
						.text(),
				});
			});
			// console.log('ended');
		});
		return catalogList;
	} catch (e) {
		console.log(e);
		console.log('error');
	}
};

// (async () => {
// 	var startTime = performance.now();

// 	for (let i = 0; i < 20; i++) {
// 		await go('https://mangapoisk.ru/manga/martial-peak/chapter/1-' + i, i);
// 	}
// 	var endTime = performance.now();
// 	console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
// })();

export { getCatalog, getArticleData, getImages };

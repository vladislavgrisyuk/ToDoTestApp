import axios from 'axios';
var DomParser = require('react-native-html-parser').DOMParser;
const cheerio = require('react-native-cheerio');

const APIURL = 'https://mangamen.com/';

export type ArticleImage = {
	id: number;
	href: string;
};

const getImages = async (url: string) => {
	try {
		const reg = new RegExp('window.__pg =(.+])', 'g');

		let obj: ArticleImage[] = [];
		let j = 0;
		await axios.get<ArticleImage[]>(APIURL + url).then(res => {
			const imagesJson: ArticleImage[] = JSON.parse(
				res.data
					.toString()
					.match(reg)[0]
					.replace('window.__pg = ', '')
					.replace(/\"p\"/g, '"id"')
					.replace(/\"u\"/g, '"href"')
					.trim()
			);
			obj = imagesJson;

			// obj = $('img.page-image').map(function (this: any) {
			// 	return {
			// 		id: j++,
			// 		href: $(this).attr('data-src') ?? $(this).attr('src'),
			// 	};
			// });
		});
		return obj;
	} catch (e) {
		console.log(e);
	}
};

export type ChapterElement = {
	id: number;
	href: string;
	title: string;
	date: string;
	author: string;
};

export type ArticelDataDetailsElement = {
	id: number;
	name: string;
	value: string | string[];
};

export type ArticelGenreElement = {
	id: string;
	name: string;
};

export type ArticleProp = {
	article: ArticleData | undefined;
};

export type ArticleData = {
	titleRu: string;
	titleEn: string;
	img: string;
	rating: string;
	reviews: string;
	detailsData: ArticelDataDetailsElement[];
	type: string;
	genres: ArticelGenreElement[];
	year: string;
	description: string;
	chapterList: ChapterElement[];
};

const getArticleData = async (url: string) => {
	console.log(APIURL + url.substring(1, url.length).trim());
	let obj: ArticleData | undefined;
	await axios
		.get<ArticleData>(APIURL + url.substring(1, url.length))
		.then(res => {
			const $ = cheerio.load(res.data);
			const article = $('div.section__body');
			let i = 0;
			let j = 0;
			let tempDetailsData: ArticelDataDetailsElement[] = $(
				'.info-list__row'
			)
				.map(function (this: any) {
					return {
						id: i++,
						name: $(this).find('strong').text(),
						value: $(this).find('span').text(),
					};
				})
				.toArray();
			obj = {
				titleRu: $('.manga-title h1').text(),
				titleEn: $('.manga-title h4').text(),
				img: APIURL + $('.manga__image img').attr('src'),
				rating: article.find('.manga-rating__value').text(),
				reviews: $('.manga-rating__votes').text().split(' ')[1],
				detailsData: tempDetailsData.filter(v => {
					return (
						v.name.trim().toLowerCase() != 'жанры' &&
						v.name.trim().toLowerCase() != 'теги'
					);
				}),
				type: $('.entry-title')[0]?.childNodes[0]?.nodeValue.split(
					'\n'
				)[1],
				genres: $('.info-list__row a')
					.map(function (this: any) {
						return {
							name: $(this).text(),
							id: i++,
						};
					})
					.toArray(),
				year: $('div.post-info span').eq(9).text().split(' ')[1],
				description: $('.info-desc__content').text().trim(),
				chapterList: $('.chapters-list .chapter-item')
					.map(function (this: any) {
						return {
							id: j++,
							href: $(this)
								.find('.chapter-item__name a')
								.attr('href')
								.trim()
								.substring(1),
							title: $(this)
								.find('.chapter-item__name')
								.text()
								.trim(),
							date: $(this)
								.find('.chapter-item__date')
								.text()
								.trim(),
							author: 'admin',
						};
					})
					.toArray(),
			};
		});
	return obj;
};

export type CatalogElement = {
	title: string;
	description: string;
	href: string;
	img: string;
	id: number;
	chaptersCount: string;
};

const getCatalog = async (url: string) => {
	try {
		// console.log('started');
		let catalogList: CatalogElement[] = [];
		let i = 0;
		await axios.get(APIURL + url).then(res => {
			const $: any = cheerio.load(res.data);
			$('a.media-card').map(function (this: any, i: number) {
				// this === el
				catalogList.push({
					title: $(this).find('h5.media-card__subtitle').text(),
					description: $(this).find('h3.media-card__title').text(),
					href: $(this).attr('href'),
					img:
						APIURL +
						($(this).attr('data-src') ?? $(this).attr('src')),
					id: i++,
					// chaptersCount: $(this)
					// 	.find('.card-numbers-item span')
					// 	.eq(0)
					// 	.text(),
					chaptersCount: '0',
				});
			});
			// console.log('ended');
		});
		return catalogList;
	} catch (e) {
		console.log(e);
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

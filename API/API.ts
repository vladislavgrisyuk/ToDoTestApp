import axios from 'axios';
var DomParser = require('react-native-html-parser').DOMParser;
const cheerio = require('react-native-cheerio');

const APIURL = 'https://mangapoisk.ru';

export type ArticleImage = {
	id: number;
	href: string;
};

const getImages = async (url: string) => {
	try {
		let obj: ArticleImage[] = [];
		let j = 0;
		await axios.get<ArticleImage[]>(APIURL + url).then(res => {
			const $: any = cheerio.load(res.data);
			obj = $('img.page-image').map(function (this: any) {
				return {
					id: j++,
					href: $(this).attr('data-src') ?? $(this).attr('src'),
				};
			});
		});
		let b = obj.filter(v => {
			return v != undefined;
		});
		return b;
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
	value: string;
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
	let obj: ArticleData | undefined;
	await axios.get<ArticleData>(APIURL + url).then(res => {
		const $ = cheerio.load(res.data);

		const article = $('div.card-body');
		let i = 0;
		let j = 0;
		obj = {
			titleRu: article.find('span.post-name').text(),
			titleEn: article.find('span.post-name-en').text().replace('/', ''),
			img: $('article img.img-fluid').attr('src'),
			rating: article.find('b.ratingValue').text(),
			reviews: $('div.post-info span').eq(0).text(),
			detailsData: [
				{
					id: j++,
					name: 'Загужено глав',
					value: $('div.post-info span').eq(5).text().split(' ')[1],
				},
				{
					id: j++,
					name: 'Статус',
					value: $('div.post-info span').eq(6).text().split(' ')[1],
				},
				{
					id: j++,
					name: 'Тип',
					value: $('.entry-title')[0].childNodes[0].nodeValue.split(
						'\n'
					)[1],
				},
			],
			type: $('.entry-title')[0].childNodes[0].nodeValue.split('\n')[1],
			genres: $('div.post-info span')
				.eq(8)
				.text()
				.split(', ')
				.map((el: string) => {
					return {
						name: el.trim(),
						id: i++,
					};
				}),
			year: $('div.post-info span').eq(9).text().split(' ')[1],
			description: $('div.manga-description').text().trim(),
			chapterList: $('ul.chapter-list-container li a').map(function (
				this: any
			) {
				return {
					id: j++,
					href: $(this).attr('href'),
					title: $(this).text().trim(),
					date: '31.12.9999',
					author: 'author',
				};
			}),
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
		await axios.get(url).then(res => {
			const $: any = cheerio.load(res.data);
			$('article').map(function (this: any, i: number) {
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

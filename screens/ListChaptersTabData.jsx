import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { globalVars } from '../style'
import { styles } from '../style';

import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ChapterItem from './chapterTabData/chapterItem';


const ListChaptersTabData = () =>
{
	let id = 0
	const [chapters, setChapters] = useState([
		{
			id: id++,
			title: 'Chapter title',
			date: '31.12.9999',
			author: 'author'
		},
		{
			id: id++,
			title: 'Chapter title',
			date: '31.12.9999',
			author: 'author'
		},
		{
			id: id++,
			title: 'Chapter title',
			date: '31.12.9999',
			author: 'author'
		},
		{
			id: id++,
			title: 'Chapter title',
			date: '31.12.9999',
			author: 'author'
		},
		{
			id: id++,
			title: 'Chapter title',
			date: '31.12.9999',
			author: 'author'
		},
		{
			id: id++,
			title: 'Chapter title',
			date: '31.12.9999',
			author: 'author'
		},
		{
			id: id++,
			title: 'Chapter title',
			date: '31.12.9999',
			author: 'author'
		},
		{
			id: id++,
			title: 'Chapter title',
			date: '31.12.9999',
			author: 'author'
		},
		{
			id: id++,
			title: 'Chapter title',
			date: '31.12.9999',
			author: 'author'
		},
	]);

	return (
		<ScrollView style={ {
			flex: 1,
			backgroundColor: 'white'
		} }
			showsVerticalScrollIndicator={ false }>
			<FlatList
				data={ chapters }
				renderItem={ ({ item }) => (<ChapterItem item={ item } />) }
				keyExtractor={ (val) => val.id }
				scrollEnabled={ false }
			/>
		</ScrollView >
	);
}

const stylesLocal = StyleSheet.create({})

export default ListChaptersTabData;

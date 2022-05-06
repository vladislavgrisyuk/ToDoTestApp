import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import {
	ScrollView,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import { globalVars } from '../style';
import { styles } from '../style';

import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ChapterItem from './chapterTabData/chapterItem';

import {
	ArticelDataDetailsElement,
	ArticelGenreElement,
	ArticleData,
	ArticleProp,
	ChapterElement,
} from '../API/API';

const ListChaptersTabData = ({ article }: ArticleProp) => {
	let id = 0;
	const [chapters, setChapters] = useState<ChapterElement[]>();

	React.useEffect(() => {
		setChapters(article?.chapterList);
	});

	return (
		<ScrollView
			style={{
				flex: 1,
				backgroundColor: 'white',
			}}
			showsVerticalScrollIndicator={false}
		>
			<FlatList
				data={chapters}
				renderItem={({ item }) => <ChapterItem item={item} />}
				keyExtractor={val => val.id.toString()}
				scrollEnabled={false}
			/>
		</ScrollView>
	);
};

const stylesLocal = StyleSheet.create({});

export default ListChaptersTabData;

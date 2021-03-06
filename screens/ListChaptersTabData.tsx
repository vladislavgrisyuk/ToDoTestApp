import React, { useMemo, useState } from 'react';
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


type Props = {
	article: ArticleData;
};
type State = {
	article: ArticleData;
	isChanged: boolean;
};

class ListChaptersTabData extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			article: props.article,
			isChanged: false,
		};
	}

	shouldComponentUpdate(previousProps, previousState) {
		console.log('REQUEST UPDATE');
		if (
			previousProps.article !== this.props.article ||
			this.state.isChanged
		) {
			console.log('NEED UPDATE');
			this.setState({
				isChanged: false,
			});
			return true;
		}
		return false;
	}

	componentDidUpdate(previousProps, previousState) {
		if (previousProps.article !== this.props.article) {
			console.log('this is updated');
			this.setState({
				article: this.props.article,
				isChanged: true,
			});
		}
	}

	myRenderItem = ({ item }) => (

		<ChapterItem
			item={item}
			chapterList={this.state.article?.chapterList}
		/>
		
	);

	render() {
		return (
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: 'white',
				}}
				showsVerticalScrollIndicator={false}
			>
				<FlatList
					extraData={this.state.isChanged}
					removeClippedSubviews={true}
					initialNumToRender={100}
					maxToRenderPerBatch={100}
					updateCellsBatchingPeriod={100}
					windowSize={3}
					ListEmptyComponent={() => {
						return (
							<View
								style={{
									justifyContent: 'center',
								}}
							>
								<Text
									style={{
										textAlign: 'center',
									}}
								>
									Loading chapters...
								</Text>
							</View>
						);
					}}
					data={this.state.article?.chapterList}
					renderItem={({ item }) => (
						<ChapterItem
							item={item}
							chapterList={this.state.article?.chapterList}
						/>
					)}
					keyExtractor={val => val.id.toString()}
					scrollEnabled={false}
				/>
			</ScrollView>
		);
	}
}

const stylesLocal = StyleSheet.create({});

export default ListChaptersTabData;

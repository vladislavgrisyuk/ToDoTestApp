import React, { FC, useRef, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import {
	ScrollView,
	Swipeable,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import { globalVars } from '../style';
import {
	ArticelDataDetailsElement,
	ArticelGenreElement,
	ArticleData,
	ArticleProp,
} from '../API/API';

const blackColor = '#212529';

type InfoTabDataProp = {
	article: ArticleData | undefined;
	moveDetailsView: (v: string) => void;
	onChildrenScroll: (v: number) => void;
};

const InfoTabData: FC<InfoTabDataProp> = ({
	article,
	onChildrenScroll,
}: InfoTabDataProp) => {
	const description = article?.description;
	let i = 0;
	const [articelData, setArticelData] = useState<
		ArticelDataDetailsElement[] | undefined
	>([
		{
			id: 1,
			name: 'Загужено глав',
			value: '...',
		},
		{
			id: 2,
			name: 'Статус',
			value: '...',
		},
	]);

	const [genres, setGenres] = useState<ArticelGenreElement[] | undefined>([]);

	React.useEffect(() => {
		console.log('INFO UPDATE');
		setGenres(article?.genres);
		setArticelData(article?.detailsData);
	}, [article]);

	const [isMoreDescription, setisMoreDescription] = useState(false);
	return (
		<ScrollView
			onScroll={e => {
				onChildrenScroll(e.nativeEvent.contentOffset.y);
			}}
			scrollEventThrottle={16}
			bounces={false}
			showsVerticalScrollIndicator={false}
			style={{ backgroundColor: 'white' }}
			contentContainerStyle={{
				flexGrow: 1,
				backgroundColor: 'white',
				paddingVertical: 8,
			}}
		>
			<View style={{}}>
				{articelData?.map(item => {
					return (
						<View
							key={item.id}
							style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								paddingVertical: 3,
								paddingHorizontal: 13,
							}}
						>
							<View style={[styles.artcleMainData]}>
								<Text
									style={{
										color: globalVars.varColorGray,
										fontFamily: globalVars.fontExo500,
									}}
								>
									{item.name}
								</Text>
							</View>
							<View style={[styles.artcleMainData]}>
								<Text
									style={{
										color: blackColor,
										fontFamily: globalVars.fontExo400,
									}}
								>
									{item.value}
								</Text>
							</View>
						</View>
					);
				})}
			</View>
			<View
				style={{
					marginTop: 10,
					marginHorizontal: 13,
					flex: 1,
				}}
			>
				<Text
					numberOfLines={isMoreDescription ? 100 : 5}
					style={{
						fontFamily: globalVars.fontExo400,
						color: blackColor,
					}}
				>
					{description}
				</Text>
				<TouchableOpacity
					onPress={() => {
						setisMoreDescription(!isMoreDescription);
					}}
					style={{
						marginTop: 5,
					}}
				>
					<Text
						style={{
							color: globalVars.varColorOrange,
							textAlign: 'center',
						}}
					>
						{isMoreDescription ? 'Спрятать' : 'Подробнее...'}
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					paddingHorizontal: 12,
					marginTop: 15,
					paddingBottom: 308,
				}}
			>
				{genres?.map(it => {
					return (
						<TouchableOpacity
							key={it.id}
							style={{
								borderWidth: 1,
								borderColor: '#e5e5e5',
								borderRadius: 4,
								paddingHorizontal: 10,
								paddingVertical: 5,
								backgroundColor: 'hsla(240,5%,48%,.05)',
								marginRight: 8,
								marginBottom: 8,
							}}
						>
							<Text
								style={{
									color: 'rgba(60, 60, 67, .6)',
									fontSize: 13,
									fontFamily: globalVars.fontExo400,
								}}
							>
								{it.name}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	artcleMainData: {
		width: '50%',
	},
});

export default InfoTabData;

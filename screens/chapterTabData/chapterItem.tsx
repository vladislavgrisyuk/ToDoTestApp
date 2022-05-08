import React, { FC, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { globalVars } from '../../style';

import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { ChapterElement } from '../../API/API';

type ChapterItemProp = {
	item: ChapterElement;
	chapterList: ChapterElement[] | undefined;
};

const ChapterItem: FC<ChapterItemProp> = ({
	item,
	chapterList,
}: ChapterItemProp) => {
	const navigation = useNavigation<any>();
	return (
		<TouchableOpacity
			style={{
				display: 'flex',
				flexDirection: 'row',
				height: 58,
				paddingVertical: 5,
				borderBottomWidth: 1,
				borderBottomColor: 'hsla(240,4%,48%,.12)',
			}}
			onPress={() => {
				navigation.navigate('read', {
					href: item.href,
					chapterList: chapterList,
				});
			}}
		>
			<View
				style={{
					width: 40,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Entypo
					name='eye-with-line'
					size={18}
					color={globalVars.varColorGray}
				/>
			</View>
			<View
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					flexGrow: 1,
				}}
			>
				<View>
					<Text
						style={{
							fontFamily: globalVars.fontExo400,
							fontSize: 14,
							color: globalVars.varColorBlack,
						}}
					>
						{item.title}
					</Text>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<Text
						style={{
							fontFamily: globalVars.fontExo400,
							fontSize: 13,
							color: globalVars.varColorGray,
							marginRight: 20,
						}}
					>
						{item.date}
					</Text>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<FontAwesome
							style={{
								marginRight: 5,
							}}
							name='user-o'
							size={12}
							color={globalVars.varColorGray}
						/>
						<Text
							style={{
								fontFamily: globalVars.fontExo400,
								fontSize: 13,
								color: globalVars.varColorGray,
							}}
						>
							{item.author}
						</Text>
					</View>
				</View>
			</View>
			<TouchableOpacity
				style={{
					width: 40,
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<FontAwesome
					name='cloud-download'
					size={18}
					color={globalVars.varColorGray}
				/>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({});

export default ChapterItem;

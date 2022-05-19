import { Text, View } from 'react-native';
import React, { PureComponent } from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import InfoTabData from './infoTabData';
import ListChaptersTabData from './ListChaptersTabData';
import { globalVars } from '../style';
import { ArticleData } from '../API/API';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
type TabFooterProp = {
	article: ArticleData | undefined;
	onChildrenScroll: (v: number) => void;
	moveDetailsView: (v: string) => void;
};

type TabFooterState = {
	articleDataCurrent: ArticleData | undefined;
	index: number;
	routes: { key: string; title: string }[];
	onChildrenScroll: (n: number) => void;
};
export default class ArticleTabFooter extends React.Component<
	TabFooterProp,
	TabFooterState
> {
	constructor(props: TabFooterProp) {
		super(props);
		this.state = {
			onChildrenScroll: props.onChildrenScroll,
			articleDataCurrent: props.article,
			index: 0,
			routes: [
				{ key: 'Инфо', title: 'Инфо' },
				{ key: 'second', title: 'Second' },
			],
		};
	}

	componentDidUpdate(previousProps: any, previousState: any) {
		console.log('asdasdasdadas');
		if (previousProps.article !== this.props.article) {
			this.setState({
				articleDataCurrent: this.props.article,
			});
		}
	}

	tabLabels = {
		info: (focused: boolean) => (
			<AntDesign
				name='infocirlceo'
				size={20}
				color={
					focused ? globalVars.varColorBlack : globalVars.varColorGray
				}
			/>
		),
		list: (focused: boolean) => (
			<Entypo
				name='list'
				size={23}
				color={
					focused ? globalVars.varColorBlack : globalVars.varColorGray
				}
			/>
		),
		comments: (focused: boolean) => (
			<FontAwesome
				name='comments'
				size={23}
				color={
					focused ? globalVars.varColorBlack : globalVars.varColorGray
				}
			/>
		),
	};
	screen1 = (props: any) => (
		<InfoTabData
			{...props}
			article={this.state.articleDataCurrent}
			onChildrenScroll={this.state.onChildrenScroll}
		/>
	);

	screen2 = (props: any) => (
		<ListChaptersTabData
			{...props}
			article={this.state.articleDataCurrent}
		/>
	);

	TabViewComponent = () => {
		const [index, setIndex] = React.useState(0);
		const [routes] = React.useState([
			{ key: 'first', title: 'Информация' },
			{ key: 'second', title: 'Главы' },
		]);

		return (
			<TabView
				navigationState={{ index, routes }}
				renderScene={SceneMap({
					first: this.screen1,
					second: this.screen2,
				})}
				onIndexChange={setIndex}
			/>
		);
	};

	render() {
		return <this.TabViewComponent />;
	}
}

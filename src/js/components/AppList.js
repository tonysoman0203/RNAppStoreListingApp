/* @flow */

import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import AppItem from './AppItem'

type Props = {
    horizontal: boolean,
    entries: [],
    onLoadMore?: Function,
    ratings?: Object[],
    orientation: string,
    isRecommendList: boolean,
}

class AppList extends Component<Props> {
	constructor(props: Props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.containter}>
				<FlatList
					horizontal={this.props.horizontal}
					data={this.props.entries}
					removeClippedSubviews={false}
					renderItem={this._renderItem.bind(this)}
					keyExtractor={(item, index) => `item_${index}`}
					onEndReached={() => {
						this.props.onLoadMore == null
							? null
							: this.props.onLoadMore()
					}}
					onEndReachedThreshold={0.7}
				/>
			</View>
		)
	}

	_renderItem = ({ item, index }: Object) => {
		var i = parseInt(index)

		if (item) {
			// const map = Utils.buildMap(item.entry)
			if (this.props.ratings) {
				// console.log(`_renderItem = ${JSON.stringify(this.props.ratings[i])}`);
				item.entry.averageUserRating = this.props.ratings[
					i
				].averageUserRating
				item.entry.userRatingCount = this.props.ratings[
					i
				].userRatingCount
			}
			return (
				<AppItem
					orientation={this.props.orientation}
					indexText={`${parseInt(i) + 1}`}
					isRecommendedItem={this.props.isRecommendList}
					entry={item.entry}
				/>
			)
		} else {
			return null
		}
	}
}

export default AppList

const styles = StyleSheet.create({
	containter: {
		flex: 1,
	},
})

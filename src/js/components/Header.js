/* @flow */

import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements'

type Props = {
    onSearchBarInputed: Function,
		onClearText: Function,
		showLoading: Boolean;
}

class Header extends PureComponent<Props> {
	constructor(props: Props) {
		super(props)
	}

	render() {
		return (
			<View>
				<SearchBar
					round
					clearButtonMode={'always'}
					platform="ios"
					inputStyle={{ backgroundColor: 'white' }}
					onClearText={() => {
						this.props.onClearText()
					}}
					onChangeText={(text: String) => {
						this.props.onSearchBarInputed(text)
					}}
					lightTheme
					placeholder="Search"
				/>
			</View>
		)
	}
}

export default Header

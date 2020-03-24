import Actions from '../constants/Actions'
import Entry from '../models/Entry'
import Utils from '../utils/index'

const DataReducers = (state = {}, action) => {
	let data = null
	let topFree100Entries = []
	let extraData = []
	let entries = []
	let obj = null
	switch (action.type) {
	case Actions.GET_APP_RECOMMENDATION_SUCCESS: {
		data = action.data.data
		const entry = data.feed.entry
		entry.forEach((e) => {
			let map = Utils.buildMap(e)
			let entry = new Entry()
			
			entry.artist = map.get('im:artist')
			entry.artist.attributes = map.get('im:artist').attributes
			entry.category = map.get('category')
			entry.category.attributes = map.get('category').attributes
			entry.summary = map.get('summary')
			entry.price = map.get('im:price')
			entry.price.attributes = map.get('im:price').attributes
			entry.contentType = map.get('im:contentType')
			entry.contentType.attributes = map.get(
				'im:contentType'
			).attributes
			entry.rights = map.get('rights')
			entry.title = map.get('title')
			entry.id = map.get('id')
			entry.id.attributes = map.get('id').attributes
			entry.releaseDate = map.get('im:releaseDate')
			entry.releaseDate.attributes = map.get(
				'im:releaseDate'
			).attributes
			entry.name = map.get('im:name')
			entry.image = map.get('im:image')
			entry.link = map.get('link')
			entry.link.attributes = map.get('link').attributes
			entries.push({ entry })
		})
		const dataSource = { entries }

		return {
			...state,
			entries,
			dataSource,
		}
	}

	case Actions.TOP_FREE_APP_100_SUCCESS: {
		data = JSON.stringify(action.data.data)
		obj = JSON.parse(data)
		for (
			let iterator = 0;
			iterator < obj.feed.entry.length;
			iterator++
		) {
			//0-99
			let map = Utils.buildMap(obj.feed.entry[iterator])
			let entry = new Entry()
			entry.artist = map.get('im:artist')
			entry.artist.attributes = map.get('im:artist').attributes
			entry.category = map.get('category')
			entry.category.attributes = map.get('category').attributes
			entry.summary = map.get('summary')
			entry.price = map.get('im:price')
			entry.price.attributes = map.get('im:price').attributes
			entry.contentType = map.get('im:contentType')
			entry.contentType.attributes = map.get(
				'im:contentType'
			).attributes
			entry.rights = map.get('rights')
			entry.title = map.get('title')
			entry.id = map.get('id')
			entry.id.attributes = map.get('id').attributes
			entry.releaseDate = map.get('im:releaseDate')
			entry.releaseDate.attributes = map.get(
				'im:releaseDate'
			).attributes
			entry.name = map.get('im:name')
			entry.image = map.get('im:image')
			entry.link = map.get('link')
			entry.link.attributes = map.get('link').attributes
			if (iterator < 10) {
				topFree100Entries.push({ entry })
			} else {
				extraData.push({ entry })
			}
		}

		let dataSource = state.dataSource
		// console.log(`dataSource = ${JSON.stringify(dataSource)}`);
		dataSource.topFree100Entries = topFree100Entries
		dataSource.extraData = extraData

		return {
			...state,
			topFree100Entries,
			extraData,
			size: topFree100Entries.length,
			dataSource,
		}
	}

	case Actions.APP_RATING_SUCCESS: {
		const ratingInfo = action.ratingInfo
		//manipulicating the data with key-value pair
		const ratings = []
		ratingInfo.forEach((rating) => {
			const averageUserRating = rating.data.results[0].averageUserRating
			const userRatingCount = rating.data.results[0].userRatingCount
			const obj = {
				averageUserRating: averageUserRating,
				userRatingCount: userRatingCount,
			}
			ratings.push(obj)
		})
		// console.log(`ratings = ${JSON.stringify(ratings)}`);
		return {
			...state,
			ratings,
			size: ratings.length,
		}
	}

	case Actions.FETCH_MORE: {
		topFree100Entries = action.orignalData
		const initialPage = 0
		const extraPayload = 10
		for (
			let iterator = initialPage;
			iterator < extraPayload;
			iterator++
		) {
			const entry = action.extraData[iterator]
			topFree100Entries.push(entry)
		}
		action.extraData.splice(initialPage, extraPayload)
		return {
			...state,
			topFree100Entries,
		}
	}

	case Actions.FETCH_DATA_ERROR: {
		const error = action.error.request
		let message
		if (error && error.status == '403') {
			message = `No Authorization to access ${error.responseURL}`
		} else {
			message = 'No Network Connection. Please Try Again later'
		}
		return {
			...state,
			error: message,
		}
	}

	case Actions.SEARCH_DATA: {
		const key = action.key
		const dataSource = state.dataSource
		const entries = state.entries.length == dataSource.entries.length
			? state.entries
			: dataSource.entries
		const topFree100Entries = state.topFree100Entries.length ==
			dataSource.topFree100Entries.length
			? state.topFree100Entries
			: dataSource.topFree100Entries
		const extraData = state.extraData.length == dataSource.extraData.length
			? state.extraData
			: dataSource.extraData

		const appRecomFilterResult = Utils.checkAppContainsKey(entries, key) == null
			? entries
			: Utils.checkAppContainsKey(entries, key)
		const freeAppFilterResult = Utils.checkAppContainsKey(topFree100Entries, key) == null
			? topFree100Entries
			: Utils.checkAppContainsKey(topFree100Entries, key)
		const extraDataFilterResult = Utils.checkAppContainsKey(extraData, key) == null
			? extraData
			: Utils.checkAppContainsKey(extraData, key)
                
		return {
			...state,
			entries: appRecomFilterResult,
			topFree100Entries: freeAppFilterResult,
			extraData: extraDataFilterResult,
		}
	}

	default:
		return state
	}
}

export default DataReducers

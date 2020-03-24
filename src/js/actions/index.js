/* @flow */
import { AxiosError, AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import axiosInstance from '../config/Axios'
import Actions from '../constants/Actions'
import { DataSource } from '../constants/DataSource'
import Utils from '../utils/index'

export const retry = (): Dispatch => {
	return (dispatch) => {
		dispatch(showError())
		dispatch(getAppRecommendation())
	}
}

export const getAppRecommendation = (): Dispatch => {
	return (dispatch) => {
		dispatch(toggleLoading())
		callAppRecommendationApi()
			.then((appRecom) => {
				dispatch(getAppRecommendationSuccess(appRecom))
				callGetTopFreeAppApi()
					.then((res) => {
						dispatch(getTopFreeAppSuccess(res))
						genEntriesId(res)
							.then((ids) => {
								getAppRatingInfoAPI(ids)
									.then((appRating) => {
										dispatch(
											getAppRatingInfoAPISuccess(
												appRating
											)
										)
										dispatch(toggleLoading())
									})
									.catch((err) => {
										dispatch(toggleLoading())
										dispatch(fetchDataError(err))
										dispatch(showError())
									})
							})
							.catch((err) => {
								dispatch(toggleLoading())
								dispatch(fetchDataError(err))
								dispatch(showError())
							})
					})
					.catch((err) => {
						dispatch(toggleLoading())
						dispatch(fetchDataError(err))
						dispatch(showError())
					})
			})
			.catch((err) => {
				dispatch(toggleLoading())
				dispatch(fetchDataError(err))
				dispatch(showError())
			})
	}
}

export const doAppSearch = (text: string): Dispatch => {
	return (dispatch) => {
		dispatch(toggleLoading())
		dispatch(searchDataBykey(text))
		dispatch(toggleLoading())
	}
}

function callAppRecommendationApi() {
	return axiosInstance.post(DataSource.APP_RECOMMENDATION_10, null, null)
}

function callGetTopFreeAppApi() {
	return axiosInstance.post(DataSource.LIST_TOP_100, null, null)
}

function genEntriesId(res: AxiosResponse) {
	var entries = res.data.feed.entry
	var allEntries = []
	entries.forEach((item) => {
		var map = Utils.buildMap(item)
		var id = map.get('id').attributes['im:id']
		allEntries.push(id)
	})
	return Promise.resolve(allEntries)
}

function getAppRatingInfoAPI(ids: Array<string>) {
	var appInfo = ids.map(async (id) => {
		var lookupApi = DataSource.LOOK_UP_APP.replace('[app_id]', id)
		var resp = await axiosInstance.post(lookupApi, null, null)
		return resp
	})
	return Promise.all(appInfo).then((info) => {
		return info
	})
}

export const getAppRecommendationSuccess = (data: any) => ({
	type: Actions.GET_APP_RECOMMENDATION_SUCCESS,
	data: data,
})

export const getTopFreeAppSuccess = (data: any) => ({
	type: Actions.TOP_FREE_APP_100_SUCCESS,
	data: data,
})

export const getAppRatingInfoAPISuccess = (data: any) => ({
	type: Actions.APP_RATING_SUCCESS,
	ratingInfo: data,
})

export const fetchMore = (orignalData: any, extraData: any) => ({
	type: Actions.FETCH_MORE,
	extraData: extraData,
	orignalData: orignalData,
})

export const fetchDataError = (err: AxiosError) => ({
	type: Actions.FETCH_DATA_ERROR,
	error: err,
})

export const searchDataBykey = (text: string) => ({
	type: Actions.SEARCH_DATA,
	key: text,
})

//UI Related Action
export const toggleLoading = () => {
	return {
		type: Actions.FETCH_DATA_LOADING,
	}
}

export const showError = () => {
	return {
		type: Actions.SHOW_ERROR,
	}
}

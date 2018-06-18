/* @flow */

import * as Models from '../constants/models'
import Actions from '../constants/action-types'
import APIRequest from '../config/APIRequest'
import axiosInstance from '../config/Axios'
import {DataSource} from '../constants/DataSource'
import Utils from '../utils/Utils';

export const retry = () =>{
    return dispatch => {
        dispatch(showError())
        dispatch(getAppRecommendation())
    }
}

export const getAppRecommendation = () => {
    return dispatch =>{
        dispatch(toggleLoading())
        callAppRecommendationApi()
        .then(appRecom =>{
            dispatch(getAppRecommendationSuccess(appRecom))
            callGetTopFreeAppApi()
            .then(res => {
                console.log(`callAPI = ${JSON.stringify(res)}`);
                dispatch(getTopFreeAppSuccess(res))
                genEntriesId(res)
                .then(ids => {
                    getAppRatingInfoAPI(ids)
                    .then(appRating =>{
                        console.log(`resolve appRating = ${JSON.stringify(appRating.length)}`);
                        dispatch(getAppRatingInfoAPISuccess(appRating))
                        dispatch(toggleLoading())
                    })
                    .catch(err =>{
                        dispatch(toggleLoading())
                        dispatch(fetchDataError(err))
                        dispatch(showError())
                    })
                })
                .catch(err =>{
                    dispatch(toggleLoading())
                    dispatch(fetchDataError(err))
                    dispatch(showError())
                })
            })
            .catch(err =>{
                dispatch(toggleLoading())
                dispatch(fetchDataError(err))
                dispatch(showError())
            })
        })
        .catch(err =>{
            dispatch(toggleLoading())
            dispatch(fetchDataError(err))
            dispatch(showError())
        })
    }
}

export const getDataByRegion = (region) => {
    return dispatch => {
        dispatch(toggleLoading())
        callFireBaseOrderByRegion(region)
        .then(response => {
            console.log(`getDataByRegion = ${JSON.stringify(response)}`);
            dispatch(toggleLoading())
            dispatch(callFirebaseSuccess(response))
            
        })
        .catch((err)=>{

        })
    }
}

function callAppRecommendationApi(){
    return axiosInstance.post(DataSource.APP_RECOMMENDATION_10,null,null)
}

function callGetTopFreeAppApi(){
    return axiosInstance.post(DataSource.LIST_TOP_100, null, null)
}

function genEntriesId(res){
    var entries = res.data.feed.entry;
    var allEntries = [];
    // console.log(`allEntries = ${allEntries.length}`);
    entries.forEach(item => {
        var map = Utils.buildMap(item)
        var id = map.get('id').attributes[`im:id`];
        // console.log(`check id is = ${id}`);
        allEntries.push(id)
    })
    return Promise.resolve(allEntries)
}

function getAppRatingInfoAPI(ids: Array) {
    var appInfo = ids.map(async id=> {
        var lookupApi = DataSource.LOOK_UP_APP.replace('[app_id]',id);

        console.log(`getAppRatingInfoAPI lookupApi = ${lookupApi}`);
        var resp = await axiosInstance.post(lookupApi, null, null)
        // console.log(`getAppRatingInfoAPI resp = ${JSON.stringify(resp)}`);
        return resp
    })
    return Promise.all(appInfo).then(info=>{
        // console.log(`getAppRatingInfoAPI info = ${JSON.stringify(info.length)}`);
        return info
    })
}

export const toggleLoading = (state) =>{
    return ({
        type: Actions.FETCH_DATA_LOADING,
        state
    })
}

export const showError = (state) => {
    return({
        type: Actions.SHOW_ERROR,
        state
    })
}

export const getAppRecommendationSuccess = (data) => ({
    type: Actions.GET_APP_RECOMMENDATION_SUCCESS,
    data: data
})

export const getTopFreeAppSuccess = (data) => ({
    type: Actions.TOP_FREE_APP_100_SUCCESS, 
    data: data
})

export const getAppRatingInfoAPISuccess = (data) => ({
    type: Actions.APP_RATING_SUCCESS, 
    ratingInfo: data
})

export const fetchMore = (offset, extraData) => ({
    type: Actions.FETCH_MORE,
    extraData: extraData,
    orignalData: offset
})

export const fetchDataError = (err) => ({
    type: Actions.FETCH_DATA_ERROR,
    error: err
})
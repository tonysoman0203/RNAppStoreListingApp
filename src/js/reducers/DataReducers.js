import * as Models from '../constants/models'
import Actions from '../constants/action-types'
import moment from 'moment'
import Utils from '../utils/index';

const DataReducers = (state = {} ,action) =>{
    switch(action.type){
        case Actions.GET_APP_RECOMMENDATION_SUCCESS: {
            var entries = []
            var data = JSON.stringify(action.data.data)
            var obj = JSON.parse(data)
            obj.feed.entry.forEach((entry) => {
                entries.push({entry});
            });
            var dataSource = {entries}
            
            return({
                ...state,
                entries,
                dataSource
            })
        }

        case Actions.TOP_FREE_APP_100_SUCCESS: {
            var topFree100Entries = []
            var extraData = []
            var data = JSON.stringify(action.data.data)
            var obj = JSON.parse(data)
            for (var iterator = 0;iterator<obj.feed.entry.length;iterator++) { //0-99
                var entry = obj.feed.entry[iterator]
                if(iterator < 10 ){
                    topFree100Entries.push({entry})
                } else{
                    extraData.push({entry})  
                }         
            }

            var dataSource = state.dataSource
            console.log(`dataSource = ${JSON.stringify(dataSource)}`);
            dataSource.topFree100Entries = topFree100Entries;
            dataSource.extraData = extraData

            return({
                ...state,
                topFree100Entries,
                extraData,
                size: topFree100Entries.length,
                dataSource
            })
            
        }

        case Actions.APP_RATING_SUCCESS: {
            var ratingInfo = action.ratingInfo
            //manipulicating the data with key-value pair
            var ratings = []
            ratingInfo.forEach(rating => {
               var averageUserRating = rating.data.results[0].averageUserRating
               var userRatingCount = rating.data.results[0].userRatingCount 
               var obj = {
                    "averageUserRating": averageUserRating,
                    "userRatingCount": userRatingCount
                }
               ratings.push(obj)
            })
            console.log(`ratings = ${JSON.stringify(ratings)}`);
            return({
                ...state,
                ratings,
                size: ratings.length
            })
        }

        case Actions.FETCH_MORE: {
            var topFree100Entries = action.orignalData
            var initialPage = 0
            var extraPayload = 10
            for (var iterator = initialPage ; iterator < extraPayload;iterator++) {
                var entry = action.extraData[iterator]
                topFree100Entries.push(entry)
            }
            action.extraData.splice(initialPage,extraPayload) 
            return({
                ...state,
                topFree100Entries
            })
        }

        case Actions.FETCH_DATA_ERROR: {
            console.log(`FETCH_DATA_ERROR !!`);
            var error = action.error.request
            console.log(`FETCH_DATA_ERROR error = ${JSON.stringify(error)}`)
            if(error.status == "403"){
                error = `No Authorization to access ${error.responseURL}`
            }else{
                error = `No Network Connection. Please Try Again later`
            }
            return({
                ...state,
                error: error
            })
        }

        case Actions.SEARCH_DATA:{
            var key = action.key;
            var dataSource = state.dataSource;
            var entries = state.entries.length == dataSource.entries.length ? state.entries: dataSource.entries
            var topFree100Entries = state.topFree100Entries.length == dataSource.topFree100Entries.length ? state.topFree100Entries: dataSource.topFree100Entries;
            var extraData = state.extraData.length == dataSource.extraData.length ? state.extraData: dataSource.extraData;;
            
            var appRecomFilterResult = Utils.checkAppContainsKey(entries, key) == null ? entries : Utils.checkAppContainsKey(entries, key);
            var freeAppFilterResult = Utils.checkAppContainsKey(topFree100Entries, key) == null ? topFree100Entries : Utils.checkAppContainsKey(topFree100Entries, key);
            var extraDataFilterResult =  Utils.checkAppContainsKey(extraData, key) == null ? extraData : Utils.checkAppContainsKey(extraData, key);
            
            return({
                ...state,
                entries:appRecomFilterResult,
                topFree100Entries:freeAppFilterResult,
                extraData:extraDataFilterResult
            })
        }

        default: return state
    }
}

export default DataReducers
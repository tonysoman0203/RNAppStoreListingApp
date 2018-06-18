import * as Models from '../constants/models'
import Actions from '../constants/action-types'
import moment from 'moment'

const DataReducers = (state = {} ,action) =>{
    switch(action.type){
        case Actions.GET_APP_RECOMMENDATION_SUCCESS: {
            var entries = []
            //console.log(`GET_APP_RECOMMENDATION_SUCCESS = ${JSON.stringify(action.data)}`);
            var data = JSON.stringify(action.data.data)
            //console.log(`data = ${JSON.stringify(data)}`);
            var obj = JSON.parse(data)
            //console.log(`@@@@@@@@@ = ${JSON.stringify(obj.feed.entry)}`);
            
            // for (var i = 0;i<10;i++){
            //     var entry = obj.feed.entry[i]
            //     entries.push({entry})
            // }
            obj.feed.entry.forEach((entry) => {
                entries.push({entry});
            });

            return({
                ...state,
                entries
            })
        }

        case Actions.TOP_FREE_APP_100_SUCCESS: {
            var topFree100Entries = []
            var extraData = []
            console.log(`TOP_FREE_APP_100_SUCCESS = ${JSON.stringify(action.data.data)}`);
            var data = JSON.stringify(action.data.data)
            var obj = JSON.parse(data)
            for (var iterator = 0;iterator<obj.feed.entry.length;iterator++) { //0-99
                // console.log(`iterator = ${JSON.stringify(iterator)}`);
                var entry = obj.feed.entry[iterator]
                if(iterator < 10 ){
                    topFree100Entries.push({entry})
                } else{
                    extraData.push({entry})  
                }
                      
            }
            // obj.feed.entry.forEach((entry) => {
            //     topFree100Entries.push({entry});
            // });

            console.log(`TOP_FREE_APP_100_SUCCESS topFree100Entries : ${topFree100Entries.length} extraData:${extraData.length}`);
            return({
                ...state,
                topFree100Entries,
                extraData,
                size: topFree100Entries.length
            })
            
        }

        case Actions.APP_RATING_SUCCESS: {
            var ratingInfo = action.ratingInfo
            console.log(`APP_RATING_SUCCESS = ${ratingInfo.length}`);
            //TODO: manipulicating the data with key-value pair
            //TODO: bundleId: {
            // "averageUserRating": "",
            // "userRatingCount":""
            // }
            var ratings = []
            ratingInfo.forEach(rating => {
                console.log(`each rating = ${JSON.stringify(rating)}`);
               var bundleId = rating.data.results[0].bundleId;
               var averageUserRating = rating.data.results[0].averageUserRating
               var userRatingCount = rating.data.results[0].userRatingCount
               console.log(`averageUserRating = ${averageUserRating}`);
               console.log(`userRatingCount = ${userRatingCount}`);
               
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
            console.log(`fetchMore action = ${JSON.stringify(action)}`);
            var topFree100Entries = action.orignalData
            var initialPage = 0
            var extraPayload = 10
            console.log(`fetchMore check data size extraPayload : = ${extraPayload} original: ${topFree100Entries.length}`);
            for (var iterator = initialPage ; iterator < extraPayload;iterator++) {
               console.log(`fetchMOre iterator = ${iterator}`);
                var entry = action.extraData[iterator]
                console.log(`action.extraData iterator ${iterator } = ${JSON.stringify(entry)}`);
                topFree100Entries.push(entry)
            }
            action.extraData.splice(initialPage,extraPayload) 
            // console.log(`topFree100Entries.size = ${topFree100Entries.length}`);
            // obj.feed.entry.forEach((entry) => {
            //     topFree100Entries.push({entry});
            // });

            return({
                ...state,
                topFree100Entries
            })
        }

        case Actions.FETCH_DATA_ERROR: {
            console.log(`FETCH_DATA_ERROR !!`);
            return({
                ...state,
                error: [action.error]
            })
        }
        default: return state
    }
}

export default DataReducers
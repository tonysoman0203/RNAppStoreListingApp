import { Dimensions } from 'react-native'
export default class Utils {
    static buildMap(obj) {
        let map = new Map();
        Object.keys(obj).forEach(key => {
            map.set(key, obj[key]);
        });
        return map;
    }
    static isLandscape = () => {
        const dim = Dimensions.get('window');
        return dim.width >= dim.height;
    };

    static isEmpty = (text) => {
        return text == '' || text == null || text == undefined
    }

    static checkAppContainsKey(source, key){
        if(Utils.isEmpty(key)) return null;
        return source.filter((item, index, array)=>{
                //var map = this.buildMap(item.entry)
                var pName = item.entry.name.label
                var pSummary = item.entry.summary.label
                var pcategory = item.entry.category.attributes.term
                var pAuthor = item.entry.artist.label
                // console.log(`productMap find pName = ${pName} pcategory:${pcategory} pAuthor: ${pAuthor} pSummary=${pSummary}`);
                return pName.includes(key) || pSummary.includes(key) || pcategory.includes(key) || pAuthor.includes(key)
        })
    }
}

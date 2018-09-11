/**
 *  @Description:
 *  @date   2018/9/10
 *  @author liuzhenchao
 *
 **/

/**
 * 对象数组快速排序
 *
 * @param arr Array 对象数组
 * @param key string 用于排序的属性
 * @param dir 1升序、-1降序
 *
 * @example:
 * var SortByKey = require('../public/utils/sort');
 * const sortByKey = new SortByKey();
 * sortByKey.sort([{name:'b',id:12},{name:'c',id:21},{name:'a',id:2}],'id')
 * sortByKey.sort([{name:'b',id:12},{name:'c',id:21},{name:'a',id:2}],'id','-1')
 * sortByKey.sort([{name:'b',id:12},{name:'c',id:21},{name:'a',id:2}],'id','1')
 */

class SortByKey {
    sort(arr, key, dir) {
        let _this = this;
        key = key || 'id';
        dir = dir || '-1';
        if (arr.length == 0) {
            return []
        }
        var left = new Array();
        var right = new Array();
        var pivot = arr[0][key];
        var pivotObj = arr[0];

        if (dir === 1) {
            //升序
            for (var i = 1; i < arr.length; i++) {
                arr[i][key] < pivot ? left.push(arr[i]) : right.push(arr[i]);
            }
        } else {
            //降序
            for (var i = 1; i < arr.length; i++) {
                arr[i][key] > pivot ? left.push(arr[i]) : right.push(arr[i]);
            }
        }
        return _this.sort(left, key, dir).concat(pivotObj, _this.sort(right, key, dir));
    }
}
module.exports = SortByKey;
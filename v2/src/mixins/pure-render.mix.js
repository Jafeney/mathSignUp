/**
 * @desc 前端工程使用的工具方法
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

export default function pureRender(source) {
    if (source.get('preload')) {
        return true
    } else {
        return false
    }
}

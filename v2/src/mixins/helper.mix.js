/**
 * @desc 前端工程使用的工具方法
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

export function bodyUrlencoded(body) {
    let data = Object.entries(body);
    let str = `${data[0][0]}=${data[0][1]}`;
    data.forEach((item,i) => {
        if (i>0) {
            str+= `&&${item[0]}=${item[1]}`;
        }
    })
    return str
}

export function parseURL(url) {
    let _url = url.replace(/&/g,'*')
    return _url
}

export function limitStringlength(str, length) {
    return str.substr(0, length) + '...'
}

export function mapTypetoCategory(type) {
    switch (type) {
        case 100:
            return '医学本科组';
        case 200:
            return '医学专科组';
        case 300:
            return '非医学本科组';
        case 400:
            return '非医学专科组';
        default:
            return '其他组别';
    }
}

import moment from "moment";

const checkvalidity = token => {
    if(!token) return null
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let payload = JSON.parse(decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')));

    // let exp = moment.unix('1668330365');
    //kalo positive belum lewat, kalo negative la lewat
    let exp = moment.unix(payload.exp)
    return (exp.diff(moment(), "seconds") >= 0)
}

export default checkvalidity;
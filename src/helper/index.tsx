import moment from 'moment';
import { APP_ID, BUSCD } from './env';

const getBusinessCode = () => {
    return BUSCD
}

const todayDate = () => {
    return moment().format('YYYY-MM-DD')
}

const getApplicationID = () => {
    return APP_ID
}

const getSession = () => {
    let session = localStorage.getItem('auth.session')
    if(session) return JSON.parse(session)
    return null
}

export { 
    getBusinessCode, 
    todayDate,
    getApplicationID,
    getSession,
}
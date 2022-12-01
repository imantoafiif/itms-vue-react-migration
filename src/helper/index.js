import moment from 'moment';

const getBusinessCode = () => {
    return process.env.REACT_APP_BUSCD
}

const todayDate = () => {
    return moment().format('YYYY-MM-DD')
}

const getApplicationID = () => {
    return process.env.REACT_APP_ID
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
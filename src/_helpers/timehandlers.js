import _ from 'lodash'
import moment from 'moment'

/**
 * Converts time from (decimal) hours to hh:mm 
 * @param {number} time as decimal hours 
 */
export const timeToString = (time) => {

    let hours = Math.floor(time)
    let minutes = Math.round((time - Math.floor(time))*60)

    if (minutes < 10) {
        minutes = '0'+minutes
    }

    return (hours + ':' + minutes)
}

/**
 * Converts hours and minutes to decimal hours
 * @param {number} hours
 * @param {number} minutes
 */
export const hoursMinutesToTime = (hours, minutes) => {
    return (hours + minutes/60)
}

/**
 * Format time to hh:mm 
 * @param {number} hours 
 * @param {number} minutes 
 */
export const formatHoursMinutes = (hours, minutes) => {
    return (hours + ':' + (minutes < 10 ? '0' + minutes : minutes))
}


/**
 * 
 * @param {*} data 
 */
export const arrayToTime = (data) => (
    _.map(data, ({ hours, minutes}) => (
        hours + minutes/60
    ))
)

export const formatDateArray = (data) => (
    _.map(data, ({date}) => (
        moment(date).format('DD.MM.YYYY')
    ))
)
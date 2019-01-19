import React from 'react'
import moment from 'moment'
import { Table, Grid } from 'semantic-ui-react'
import _ from 'lodash'
import { timeToString, hoursMinutesToTime } from '../../_helpers/timehandlers'


const SeasonSummary = ({ data, seasonField }) => (

    <Table celled fixed>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>{seasonField}</Table.HeaderCell>
                <Table.HeaderCell>Matka</Table.HeaderCell>
                <Table.HeaderCell>Aika</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {_.map(data, ({ sport, season, total, totalTime }) => (
                <Table.Row key={sport+season}>
                    <Table.Cell>{season}</Table.Cell>
                    <Table.Cell>{total}</Table.Cell>
                    <Table.Cell>{timeToString(totalTime)}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
)

const seasonSummary = ( data, field='weekAndYear' ) => (
    _(data).groupBy(field)
            .map((values, key) => ({
                 'season': key,
                'total': _.sumBy(values, 'distance'),
                'totalTime': _.sumBy(values, 'time')
            })).value()
)

const Summary = ({ data }) => {

    //Totals of all
    const totals = _(data).groupBy('sport')
        .map((values, key) => ({
            'sport': key,
            'distance': _.sumBy(values, 'distance')
        })).value()

    // add week and monthnumbers to individual exercise and
    const weeks = _.map(data, ({ date, distance, hours, minutes, sport }) => ({
        'sport': sport,
        'distance': distance,
        'time': hoursMinutesToTime(hours, minutes),
        'weekAndYear': moment(date).isoWeek() + '/' + moment(date).year(),
        'monthAndYear': (moment(date).month() + 1) + '/' + moment(date).year()
    }))
  
    const weekSummary = seasonSummary(weeks, 'weekAndYear')
    const monthSummary = seasonSummary(weeks, 'monthAndYear')
   
    return <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                    <h3>Viikko-yhteenveto</h3>
                    <SeasonSummary data={weekSummary} seasonField='Viikko' />
                </Grid.Column>
                <Grid.Column>
                    <h3>Kuukausi-yhteenveto</h3>
                    <SeasonSummary data={monthSummary} seasonField='Kuukausi' />
                </Grid.Column>
              </Grid.Row>  
            </Grid>
    /* const weekSummary = _(weeks).groupBy('weekAndYear')
            .map((values, key) => ({
                'week': key,
                'total': _.sumBy(values, 'distance'),
                'totalTime': _.sumBy(values, 'time')
            })).value()
 */
    /* const monthSummary = _(weeks).groupBy('monthAndYear')
            .map((values, key) => ({
                'month': key,
                'total': _.sumBy(values, 'distance'),
                'totaltime'
            }))
 */
    // Group by sports
   /* const weeksBySport = _.groupBy(weeks, (item) => {
        return item.sport
    })*/

    // Then group by week
   /* _.forEach(weeksBySport, (value, key) => {
        weeksBySport[key] = _.groupBy(weeksBySport[key], (item) => {
            return item.weekAndYear
        })
    })*/

    //
    /*const weekSummary = []
    //const sportRes2 =
    _.forEach(weeksBySport, (value, key) => {
        console.log(value)
        console.log(key)

        _.forEach(value, (value2, key2) => {
            console.log(value2)
            console.log(key2)
            console.log(_.sumBy(value2, 'distance'))

            weekSummary.push({
                sport: key,
                week: key2,
                total: _.sumBy(value2, 'distance')
            })
        })

    })

    console.log(weekSummary)
    */

    //return <WeekSummary weekData={weekSummary} />

}


/**
 * Shows weekly totals (distance, time) of data (exercises)
 */
const SummaryTable = (props) => (
    <Summary data={props.data}/>
)

/* class SummaryTable extends React.Component {

    render() {
        return (<Summary data={this.props.data} />)
    }
} */

export default SummaryTable
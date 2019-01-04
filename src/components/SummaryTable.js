import React from 'react'
import moment from 'moment'
import { Table } from 'semantic-ui-react'
import _ from 'lodash'


const WeekSummary = ({ weekData }) => (

    <Table sortable celled fixed>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell> Laji </Table.HeaderCell>
                <Table.HeaderCell>Viikko</Table.HeaderCell>
                <Table.HeaderCell>Matka</Table.HeaderCell>
                <Table.HeaderCell>Aika</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {_.map(weekData, ({ sport, week, total }) => (
                <Table.Row key={sport+week}>
                    <Table.Cell>{sport}</Table.Cell>
                    <Table.Cell>{week}</Table.Cell>
                    <Table.Cell>{total}</Table.Cell>
                    <Table.Cell>AIKA TÄHÄN</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
)

const Summary = ({ data }) => {

    const totalWeeks = _(data).groupBy('sport')
        .map((values, key) => ({
            'sport': key,
            'distance': _.sumBy(values, 'distance')
        })).value()

    // add week and monthnumbers to individual exercise and
    const weeks = _.map(data, ({ date, distance, time, sport }) => ({
        'sport': sport,
        'distance': distance,
        'time': time,
        'weekAndYear': moment(date).isoWeek() + '/' + moment(date).year(),
        'monthAndYear': moment(data).month() + '/' + moment(date).year()
    }))

    // Group by sports
    const weeksBySport = _.groupBy(weeks, (item) => {
        return item.sport
    })

    // Then group by week
    _.forEach(weeksBySport, (value, key) => {
        weeksBySport[key] = _.groupBy(weeksBySport[key], (item) => {
            return item.weekAndYear
        })
    })

    //
    const weekSummary = []
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
    

    return <WeekSummary weekData={weekSummary} />
}

class SummaryTable extends React.Component {

    render() {
        return (<Summary data={this.props.data} />)
    }
}

export default SummaryTable
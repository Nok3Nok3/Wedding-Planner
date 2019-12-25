import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

@inject('manage_seats')
@observer
class Table extends Component {
	getTableInvitees = () => {
		// this.props.t.id
	}

	selectTable = () => {
		this.props.manage_seats.selectedTable = this.props.t.id
		this.props.manage_seats.selectedTableName = this.props.t.table_name
	}
	render() {
		console.log(this.props.manage_seats.invitees)
		return (
			<div>
	<Button
		onClick={this.selectTable}
		component={Link}
		to='/addtotable' >
			<table className='table'>
				<thead>
					<tr>
						<td>
							<div className="tableName">	{this.props.t.table_name} - {this.props.t.num_seats}</div>
						</td>
					</tr>
				</thead>
				<tbody>
					{this.props.manage_seats.invitees
						.filter(i => i.table_id === this.props.t.id)
						.map(i => (
							<tr key={i.name}>
								<td key={i.name} ><span>{i.name}</span>  <span className="numOfinvitees">({i.num_invitees})</span></td>
							</tr>
						))}
				</tbody>
			</table>
						</Button>
		</div>
		)
	}
}

export default Table

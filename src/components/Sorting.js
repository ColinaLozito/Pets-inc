import React from 'react';

export default class Sorting extends React.Component {

	//// Sort method ///////
	handleSorting(e){

		var key = parseInt(e.target.value,10); /// set the target value to variable
		let arrayCopy = [...this.props.data]; // get the data and copy it to be manipulated
		// sorting depend of the key value	
		//console.log(arrayCopy)
		arrayCopy.sort(
			function(a, b){
				if (key === 0) return b['rating'] - a['rating']; // sort items by desc rating value
				if (key === 1) return a['rating'] - b['rating']; // sort items by asc rating value
				if (key === 2) return b['price'] - a['price'];  // sort items by desc price value
				if (key === 3) return a['price'] - b['price'];  // sort items by asc price value
				return 0
			 }
		)
		//// doo action 
		this.props.updateParent(arrayCopy)
	}


	render () {
		return (
			<div className="form-group rating-sort row">
				<div className="col-md-12 sort-title">
					<label className="col-md-12 form-group" htmlFor="sel1"><h5>Sort by</h5></label>
				</div>
				<div className="col-md-12 select-container">
					<form id="checkboxForm">
						<select className="form-control" id="rtn_sort" onChange={this.handleSorting.bind(this)}>
							<option defaultValue="selected">Non sort</option>
							<option value="0">High to Low Rating</option>
							<option value="1">Low to High Rating</option>
							<option value="2">High to Low Price</option>
							<option value="3">Low to High Price</option>
						</select>
					</form>
				</div>
			</div>
		)
	}

}
import React from 'react';
import InputRange from 'react-input-range';

export default class Filters extends React.Component {


	// create an array of the checkbox filters
	handlePetType(e){
		let array = this.props.data.petsFilter;
		let value = e.target.value
		let position = array.indexOf(value)
		
		if (array.includes(value)) {
			//if value allready exist will be removed to avoid issues on onChange event
			array.splice(position, 1)
			this.handleFilters()
		}else{
			// if the value doesen't exist it will be added to the checkbox array
			array.push(value)
			this.handleFilters()
		}
	}


	///  filter by price range and if there is a check box selected
	handleFilters(){
		let data = this.props.data.data
		let petsFilter = this.props.data.petsFilter
		let originalData = this.props.data.originalData
		let maxPrice = this.props.data.priceRange.max
		let minPrice = this.props.data.priceRange.min
		let dataWithPriceFilter = []
		let newData = []
		// set the data that will be filtered
		data = originalData
		//if (petsFilter.length === 0) data = originalData
		// then the data will be filtered starting with the price range 
		data.map((item, i)=>{
			let price = item.price
			if (price >= minPrice && maxPrice >= price ) dataWithPriceFilter.push(item)
			return true
		})
		// filter by TYPE before know the price range
		if(petsFilter.length !== 0) {
			dataWithPriceFilter.map((a, i)=>{
				petsFilter.map((t, i)=> {
					// its replace the new Array with the filtered data
					if (a.animal === t) newData.push(a)
					return true
				})
				return true
			})
			// if there is check box filter the state data will be set in this way
			this.props.updateParent(newData)
		}else {
			// if there is not check box the new data State will be as the price range result
			this.props.updateParent(dataWithPriceFilter)
		}
		document.getElementById("checkboxForm").reset();
	}

	// create dinamicly each check box input by type of pets if this exist
	petsCheckBoxes() {
		let petsCB = [];
		let pets = this.props.data.pets
		// create eaach input and store in an array
		pets.map((a, i)=>{
			petsCB.push(
			  	<div className="checkbox" key={i}>
			  		<label><input type="checkbox" value={a} onChange={this.handlePetType.bind(this)}/>{a}</label>
			  	</div>
		 	)
		 	return true;
		})
		// print the array in the render function
		return (
		   <div>
		    {petsCB}
		   </div>
		);
	}

	render(){
		return(
			<div className="form-group rating-sort row">
				<div className="col-md-12 filter-title">
					<label className="form-group" htmlFor="sel1"><h5>Filters by</h5></label>
				</div>
				<div className="col-md-12 pet-type-container">
					<div className="row">
						<div className="col-md-12 pet-type-title">
							<label><strong>Pet type</strong></label>
						</div>
						<br />
						<div className="col-md-12 animal-checkboxes">
							<div className="form-check">
								{this.petsCheckBoxes()}
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-12 price-range-container">
					<label><strong>Price range</strong></label>
					<hr />
					<InputRange
				          draggableTrack
				          maxValue={1000}
				          minValue={10}
				          onChange={value => this.props.updatePrice(value)}
				          onChangeComplete={this.handleFilters.bind(this)}
				          value={this.props.data.priceRange} />
				    <hr />
				</div>
			</div>
		)
	}

 }
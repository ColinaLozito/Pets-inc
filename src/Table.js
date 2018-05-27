import React from 'react';
import { petService } from './service';
import PetRow from './components/PetRow'
import Sorting from './components/Sorting'
import Filters from './components/Filters'
import '../public/css/app.css';


export default class Table extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			originalData:[],
			pets:[],
			priceRange: {
				min: 10,
				max: 1000,
			},
			petsFilter:[]
		}
	}

	// method that update the main STATE from others components
	updateState(data){
		this.setState({
			data:data
		})
	}

	// this method will update the price range from other component
	updatePriceRange(data){
		this.setState({
			priceRange:data
		})
	}

/////////////////////////////  HANDING DATA   ////////////////////////////////
	componentWillMount(){
		this.petFetch()
	}

	/// Fetching data from service
	petFetch(){	
		let self = this
		// get the data from the services
		petService.fetch()
		.then( (response)=> {
			// send data to be manipulated before store in the state
			self.handleData(response)
		})
		.catch(function(error) {
			// the services have some issues in the moment to retrive data
			// if this happens the sistem will call the service again 
			self.componentWillMount()
			console.log('Looks like there was a problem: \n', error);
		})
	}

	// Manipulate the response before sotre in the State
	handleData(response){
		let petsList = []
		let data = []
		// Push each item in a new array
		response.map((item)=>{	
			data.push(item)
			return item
		})
		// Check each item to get each tipe of pets and stores in a new array
		data.map((animal, i)=>{
			if (petsList.includes(animal.animal)) {
				return true
			}else{
				petsList.push(animal.animal) // if the type of pet does not exist push it in a new array
			}
			return true
		})
		if (data.length < 1) this.componentWillMount() // if the data lenght is less than 1 calls the fetching again
		// Store the data in the State
		this.setState({
			data:data,
			originalData: data,
			pets: petsList 
		})	
	}


	render(){
		return (

			<div className="pet-table col-md-12">
				<div className="row">
					<div className="col-md-3">
						<div className="row filters-container">

							<div className="col-md-12 filters">
								<div className="row">
									<div className="col-md-12">

									<Filters 
										data={this.state} 
										updateParent={ this.updateState.bind(this)}
										updatePrice={ this.updatePriceRange.bind(this)}/>
										
									</div>								
								</div>	
							</div>

							<div className="col-md-12 sorts">
								<div className="row">
									<div className="col-md-12">
											
										<Sorting data={this.state.data} updateParent={ this.updateState.bind(this) }/>
									
									</div>
								</div>	
							</div>
							
						</div>
					</div>
					<div className="col-md-9">
						<div className="row">
		                    <div className="col-md-12 pet-info">

			                    {this.state.data.map((pet, i) => (
									<PetRow key={i} i={i} pet={pet} object={this}/>                    			
								))}

		                    </div>
		                </div>
					</div>
				</div>
			</div>
		);
	}
}

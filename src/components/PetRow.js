import React from 'react';
import Dog from '../../public/img/Dog.jpg';
import Cat from '../../public/img/Cat.jpg';
import Bird from '../../public/img/Bird.jpg';
import Turtle from '../../public/img/Turtle.jpg';
import Capybara from '../../public/img/Capybara.jpg';
import Pig from '../../public/img/Pig.jpg';
import Star from '../../public/img/star.png';

export default class PetRow extends React.Component {

	picPicker(pet){
		if (pet === 'Dog') {
			return(	<img className="pet-img" alt="pet-pic" src={Dog}/> )
		}
		if (pet === 'Cat') {
			return(	<img className="pet-img" alt="pet-pic" src={Cat}/> )
		}
		if (pet === 'Bird') {
			return(	<img className="pet-img" alt="pet-pic" src={Bird}/> )
		}
		if (pet === 'Turtle') {
			return(	<img className="pet-img" alt="pet-pic" src={Turtle}/> )
		}
		if (pet === 'Capybara') {
			return(	<img className="pet-img" alt="pet-pic" src={Capybara}/> )
		}
		if (pet === 'Pig') {
			return(	<img className="pet-img" alt="pet-pic" src={Pig}/> )
		}
	}

	rankingStar(rank){

		var indents = [];
		for (var i = 0; i < rank; i++) {
		  indents.push(
		  	<img key={i} src={Star} className='star' alt="pet-img" />
		 );
		}
		
		return (
		   <div className="rank-stars">
		    {indents}
		   </div>
		);

	}

	render () {
		return (

			<div className="row info" key={this.props.i}>
				<div className="col-md-4 first-info-block">
					<div className="pic-container">
						{this.picPicker(this.props.pet.animal)}
					</div>
				</div>
				<div className="col-md-4 second-info-block">
					<div className="type-content">
						<h5>Type</h5>
		                <p>{this.props.pet.animal}</p>
					</div>
					<div className="colour-content">
						<h5>Colour</h5>
						<div className={this.props.pet.colour}></div>
		                <p>{this.props.pet.colour}</p>
						
					</div>
					<div className="pattern-content">
						<h5>Pattern</h5>
		                <p>{this.props.pet.pattern}</p>
					</div>
	                
					
				</div>
				<div className="col-md-4 third-info-block">
					<div className="col-md-12 price-container">
						<h5>Price</h5>
	                	<p>{this.props.pet.price} $</p>
					</div>
					<div className="col-md-12 ranking-container">
						<h5>Ranking</h5>
	                	{this.rankingStar(this.props.pet.rating)}
					</div>
					
				</div>
			</div>
		)
	}
}
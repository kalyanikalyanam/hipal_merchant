// import React from "react";
// import firebase from '../config';
// import Sidebar from './sidebar';
// import Header from './header';
// class PopupTesting extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {

         
//         };
//     }
  

//     render() {
//         return (
        
// <>

// <div className="col-md-12">
// <div className="card">
// <div className="card-body">


// <button type="button" className="btn btn-secondary mb-1" data-toggle="modal" data-target="#add_edit_position">
// Add Edit Position
// </button>






// </div>
// </div>






// </div>







				
							


// <div className="modal fade" id="add_edit_position" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
// <div className="modal-dialog modal-sm hipal_pop" role="document">
// <div className="modal-content">


// <div className="modal-header">
// <h5 className="modal-title" id="smallmodalLabel">Add / Edit Position 
// </h5>
// </div>


// <div className="modal-body product_edit">





// <div className="col-12 w-100-row">
// <div className="row form-group">
// <div className="col col-md-4">
// <label className=" form-control-label">Position</label>
// </div>
// <div className="col-12 col-md-6">
// <input type="text" id="text-input" name="text-input" placeholder="Accounts" className="form-control edit_product"/>
// </div>
// </div>
// </div>

// <div className="col-12 w-100-row">
// <div className="row form-group">
// <div className="col col-md-4">
// <label className=" form-control-label">Details</label>
// </div>
// <div className="col-12 col-md-6">
// <textarea name="textarea-input" id="textarea-input" rows="3" placeholder="Does the accounting work" className="form-control edit_product"></textarea>
// </div>
// </div>
// </div>


// <div className="col-12 w-100-row">
// <div className="row form-group">
// <div className="col col-md-4">
// <label className=" form-control-label">Task List</label>
// </div>
// <div className="col-12 col-md-6">
// <textarea name="textarea-input" id="textarea-input" rows="3" placeholder="Detailed Task List " className="form-control edit_product"></textarea>
// </div>
// </div>
// </div>


// <div className="col-12 w-100-row">
// <div className="row form-group">
// <div className="col col-md-4">
// <label className=" form-control-label">Documentation</label>
// </div>
// <div className="col-12 col-md-6">


// <div className="upload_img upload_small">
//  <div className="form-group">
// 	<div className="img_show product_img_small"><img id="img-upload"/></div>
//        <div className="input-group">
//             <span className="input-group-btn">
//                 <span className="btn btn-default btn-file">
//                     Upload PDF or Word File <input type="file" id="imgInp"/>
//                 </span>
//             </span>
//             <input type="text" className="form-control" readonly=""/>
//         </div>
        
//     </div></div>


// </div>
// </div>
// </div>




// </div>



// <div className="modal-footer">
// <button type="button" className="btn close_btn" data-dismiss="modal">Cancel</button>
// <button type="button" className="btn save_btn">Save</button>
// </div>


// </div>
// </div>
// </div>

			
		


 
// </>
              
                                                                                               
//         );
//     }
// }

// export default PopupTesting;



// 
import React from "react";
class PopupTesting extends React.Component {
	constructor() {
		super();
		this.state = {
			colors: {
				red: true,
				green: false,
				blue: true,
				yellow: false,
				cyan: false,
			},
		};
	}

	handleClick = (event) => {
		const { name, checked } = event.target;

		this.setState((prevState) => {
			const colors = prevState.colors;
			colors[name] = checked;
			return colors;
		});
	};

	render() {
		const favColors = Object.keys(this.state.colors)
			.filter((key) => this.state.colors[key])
			.join(", ");
		return (
			<div className="App">
				<header className="header">
					<h1>Handling Multiple Checkboxes</h1>
				</header>

				<main>
					<div>
						<label>Choose your favourite colors</label>
						<div>
							<input checked={this.state.colors.red} onChange={this.handleClick} type="checkbox" name="red" /> Red
						</div>
						<div>
							<input checked={this.state.colors.blue} onChange={this.handleClick} type="checkbox" name="blue" /> Blue
						</div>
						<div>
							<input checked={this.state.colors.green} onChange={this.handleClick} type="checkbox" name="green" /> Green
						</div>
						<div>
							<input checked={this.state.colors.yellow} onChange={this.handleClick} type="checkbox" name="yellow" /> Yellow
						</div>
						<div>
							<input checked={this.state.colors.cyan} onChange={this.handleClick} type="checkbox" name="cyan" /> Cyan
						</div>
					</div>
					<p> Your favourite colors are: {favColors}</p>
				</main>
			</div>
		);
	}
}

export default PopupTesting;

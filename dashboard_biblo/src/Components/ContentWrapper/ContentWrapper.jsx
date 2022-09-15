import React from "react";
import Topbar from "../Topbar/Topbar";
import ContentRowTop from "./SubComponents/ContentRowTop/ContentRowTop";
import Footer from "../Footer/Footer";
import Table from "../Table/Table";

class ContentWrapper extends React.Component {

	constructor() {
		super();
		this.state = {
			movies: [],
			columnTables: [],
      usuarios: []
		}
	}

	async componentDidMount() {
    const response = await fetch("http://localhost:3001/api/movies");
		const data = await response.json();
		console.log(data.data)
		let columnas = [ "genre", "length", "title", "rating", "awards"];
    
    const responseUsers = await fetch("http://localhost:4000/api/users");
    const dataUsers = await responseUsers.json();
    console.log(dataUsers)

		this.setState({ movies: data.data, columnTables: columnas, usuarios: dataUsers })
	}

	render() {

		return(
			<div id="content-wrapper" className="d-flex flex-column">
	
				{/* <!-- Main Content --> */}
				<div id="content">
	
					{/* <!-- Topbar --> */}
					<Topbar />
					{/* <!-- End of Topbar --> */}
	
					{/* <!-- Content Row Top --> */}
					<ContentRowTop usuarios= { this.state.usuarios } />
					{/* <!--End Content Row Top--> */}
				</div>
				{/* <!-- End of MainContent --> */}
	
	
				<Table data={ this.state.movies } columns={this.state.columnTables} />
	
				{/* <!-- Footer --> */}
				<Footer />
				{/* <!-- End of Footer --> */}
	
			</div>
		)
	}
}

export default ContentWrapper;
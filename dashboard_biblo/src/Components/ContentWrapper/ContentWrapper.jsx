import React from "react";
import ContentRowTop from "./SubComponents/ContentRowTop/ContentRowTop";
import Footer from "../Footer/Footer";
import Table from "../Table/Table";

class ContentWrapper extends React.Component {

	constructor() {
		super();
		this.state = {
			libros: [],
			columnTables: [],
			usuarios: []
		}
	}

	async componentDidMount() {
		const response = await fetch("http://localhost:4000/api/products");
		const data = await response.json();
		const categs = Object.entries(data.countByCategory);
		const ultimoProd = data.productos[data.productos.length -1]
		console.log(ultimoProd)
		let columnas = ["titulo", "categoria", "detail", "descripcion"];

		const responseUsers = await fetch("http://localhost:4000/api/users");
		const dataUsers = await responseUsers.json();
		console.log(dataUsers)
		this.setState({ libros: data.productos, columnTables: columnas, usuarios: dataUsers, categorias: categs, ultimoProd })
	}

	render() {

		return (
			<div id="content-wrapper" className="d-flex flex-column">

				{/* <!-- Main Content --> */}
				<div id="content">

					{/* <!-- Content Row Top --> */}
					<ContentRowTop usuarios={this.state.usuarios} libros={this.state.libros} categorias={this.state.categorias} ultimoProd={this.state.ultimoProd} />
					{/* <!--End Content Row Top--> */}

				</div>
				{/* <!-- End of MainContent --> */}

				<Table data={this.state.libros} columns={this.state.columnTables} />

				{/* <!-- Footer --> */}
				<Footer />
				{/* <!-- End of Footer --> */}
			</div>
		)
	}
}

export default ContentWrapper;
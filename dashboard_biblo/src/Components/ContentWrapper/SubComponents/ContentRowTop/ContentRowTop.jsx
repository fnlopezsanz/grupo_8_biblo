import React from "react";
import CategoriasInDB from "../../../GenresInDB/CategoriasInDB";
import ContentRowBooks from "./ContentRowBooks/ContentRowBooks";

function ContentRowTop(props) {

  const { usuarios = {}, libros  = [], categorias = [], ultimoProd = {} } = props;

	let infoTarjetas = [
		{
			title: "Total de Libros en Base de Datos",
			color: "border-left-primary",
			icon: "fas fa-book",
			value: libros.length
		},
		{
			title: "Total de Categorías",
			color: "border-left-success",
			icon: "fas fa-typewriter",
			value: categorias.length
		},
		{
			title: "Cantidad de Usuarios",
			color: "border-left-warning",
			icon: "fas fa-user",
			value: usuarios.count
		}
	]

    return(
        <div className="container-fluid">
					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">BIBLO Dashboard</h1>
					</div>
				
					{/* <!-- Content Row Books--> */}
					<div className="row">
						{
							infoTarjetas.map(function(unaTarjeta){
								return <ContentRowBooks key={ unaTarjeta.title } title={unaTarjeta.title} icon={ unaTarjeta.icon } color={ unaTarjeta.color } value={ unaTarjeta.value } />
							})
						}
					</div>
					{/* <!-- End Books in Data Base --> */}

	
					{/* <!-- Content Row Last Book in Data Base --> */}
					<div className="row">
						{/* <!-- Last Book in DB --> */}
						<div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h5 className="m-0 font-weight-bold text-gray-800">Último producto agregado</h5>
								</div>
								<div className="card-body">
                                    <h5 className="m-0 font-weight-bold text-gray-800">{ultimoProd.titulo}</h5>
									<hr />
									<p>{ultimoProd.descripcion}</p>
              <a className="btn btn-danger" target="_blank" rel="nofollow" href={`http://localhost:4000/products/${ultimoProd.id}`}>Ver detalle del producto</a>
								</div>
							</div>
						</div>
						{/* <!-- End content row last book in Data Base --> */}

						{/* <!-- Categorias in DB --> */}
						<CategoriasInDB />

					</div>
				</div>
    )
}

export default ContentRowTop;
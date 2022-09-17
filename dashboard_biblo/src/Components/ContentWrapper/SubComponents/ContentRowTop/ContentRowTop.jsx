import React from "react";
import imagenUP from '../../../../Assets/images/lastbook.jpg';
import CategoriasInDB from "../../../GenresInDB/CategoriasInDB";
import ContentRowBooks from "./ContentRowBooks/ContentRowBooks";

function ContentRowTop(props) {

  const { usuarios = {}, libros  = [], categorias = [], ultimoProd = {} } = props;

	let infoTarjetas = [
		{
			title: "Total de Libros en Base de Datos",
			color: "border-left-primary",
			value: libros.length
		},
		{
			title: "Total de Categorías",
			color: "border-left-success",
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
						<h1 className="h3 mb-0 text-gray-800">Biblo Dashboard</h1>
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
									<h5 className="m-0 font-weight-bold text-gray-800">Último producto agregado al catálogo</h5>
								</div>
								<div className="card-body">
                                    <h5 className="m-0 font-weight-bold text-gray-800">{ultimoProd.titulo}</h5>
									<div className="text-center">
										<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={ {width: "40rem"} } src={imagenUP} alt="" />
									</div>
									<p>{ultimoProd.descripcion}</p>
									<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalle del producto</a>
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
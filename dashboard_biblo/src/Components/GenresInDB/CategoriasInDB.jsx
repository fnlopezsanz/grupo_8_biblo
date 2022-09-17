import React, { Component } from "react";
import Categoria from "./Subcomponents/Categoria";

class CategoriasInDB extends Component {

    constructor() {
        super();
        this.state = {
            categorias: [],
        }
    }


    async componentDidMount() {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();
          const categs = Object.entries(data.countByCategory)
          
          console.log(categs)
            
            this.setState({categorias: categs});

    }    

   /*  handleMouse = () => {
        let h5 = document.querySelector("h5.card-body");
        h5.classList.add("bg-secondary  ")
    } */

    render() {
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Libros por Categoría</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">

                            {
                              this.state.categorias.length == 0 && <h3>Cargando...</h3>
                            }
                            {
                              this.state.categorias.map(categoria => <Categoria key={categoria[0]} name={categoria[0]} cant={categoria[1]} />)
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoriasInDB;
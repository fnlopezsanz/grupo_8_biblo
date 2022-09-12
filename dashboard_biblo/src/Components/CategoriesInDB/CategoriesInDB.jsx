import React, { Component } from "react";
import Category from "./Subcomponents/Category";

class CategoriesInDB extends Component {

    constructor() {
        super();
        this.state = {
            categories: []
        }
    }


    async componentDidMount() {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();
        
            this.setState({categories: data.countByCategory});
      /* console.log(this.state) */
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
                        <h5 className="m-0 font-weight-bold text-gray-800" onMouseOver={ (e) => e.target.parentNode.nextElementSibling.classList.add("bg-secondary") } >Categorías</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">

                            {
                                this.state.categories.length == 0 && <h3>Cargando...</h3>
                            }
                            { 
                    this.state.categories.map(category => <Category key={category.categoria} name={category.categoria} />)
                            }
                            

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoriesInDB;
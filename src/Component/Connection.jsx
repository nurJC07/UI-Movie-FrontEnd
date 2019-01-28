import React, { Component} from 'react'
import axios from 'axios';
import '../index.css'
import '../Support/CSS/produk.css'

class Connection extends Component {
    state = { listCon: [], idSelectedtoEdit: 0}

    componentDidMount() {
       this.getProdukList();
      }

    getProdukList = () => {
        axios.get('http://localhost:2019/connectionlist')
            .then((res) => {
            console.log(res.data)
            this.setState({listCon: res.data, idSelectedtoEdit: 0})
        }).catch((err) => {
            console.log (err)
        })
    }
            
    onBtnAddClick = () => {
        var namaMovie = this.refs.namaMovieAdd.value;
        var namaCategory = this.refs.namaCatAdd.value;
        
        axios.post('http://localhost:2019/addconnection', {
            namaMovie, namaCategory
        })
        .then((res) => {
            console.log(res)
            this.getProdukList()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are sure want to delete this item?')){
            axios.delete('http://localhost:2019/deletecategory/' + id)
            .then((res) => {
                this.getProdukList();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
   
    renderBodyProduk = () => {
        
        var listJSXProduk = this.state.listCon.map(({ namaMovie, namaCategory }) => {
            if(namaMovie !== this.state.idSelectedtoEdit ) {
                return (
                    <tr>
                        <td>{namaMovie}</td>
                        <td>{namaCategory}</td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(namaMovie)} /></td>
                    </tr> 
                    )
            }
            
           
        })
        return listJSXProduk;
    }
      
    render() {
        return (          
           
            <div className="container-fluid">
            <div className="row" >
            <div className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">List Category</h2>
            </div>
                </div>
                <center>
           
            <table>   
                    <thead>
                        <tr>
                            <th>Nama Movie</th>
                            <th>Nama Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyProduk()}
                    </tbody>
                    <tfoot>
                        <tr>
                           
                            <td><select ref="namaMovieAdd" placeholder="Masukkan nama movie"></select></td>
                            <td><select type="text" ref="namaCatAdd" placeholder="Masukkan nama category"></select></td>
                            <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                           
                        </tr>
                    </tfoot>
                </table>
                </center>
       
            </div>
           
            
            )
    }
}
        
 
export default Connection;
import React, { Component} from 'react'
import axios from 'axios';
import '../index.css'
import '../Support/CSS/produk.css'

class ManageMovie extends Component {
    state = { listMovie: [], idSelectedtoEdit: 0}

    componentDidMount() {
       this.getProdukList();
      }

    getProdukList = () => {
        axios.get('http://localhost:2019/movielist')
            .then((res) => {
            console.log(res.data)
            this.setState({listMovie: res.data, idSelectedtoEdit: 0})
        }).catch((err) => {
            console.log (err)
        })
    }
            
    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var tahun = this.refs.tahunAdd.value;
        var description = this.refs.descAdd.value;

        axios.post('http://localhost:2019/addmovie', {
            nama, tahun, description
        })
        .then((res) => {
            console.log(res)
            this.getProdukList()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnEditClick = (Idnya) => {
        this.setState({idSelectedtoEdit:Idnya})
    }

    onBtnSaveClick = (id) => {
        var nama = this.refs.namaEdit.value;
        var tahun = this.refs.tahunEdit.value;
        var description = this.refs.descEdit.value;

        axios.put('http://localhost:2019/editmovie/'+id, {
            nama, tahun, description
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
            axios.delete('http://localhost:2019/deletemovie/' + id)
            .then((res) => {
                this.getProdukList();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
   
    renderBodyProduk = () => {
        
        var listJSXProduk = this.state.listMovie.map(({ id, nama, tahun, description}) => {
            if(id !== this.state.idSelectedtoEdit) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{tahun}</td>
                        <td>{description}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.setState({ idSelectedtoEdit: id })} /></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                    </tr> 
                    )
            }
            
            return (
                <tr>
                    <td>{id}</td>
                    <td><input type="text" defaultValue={nama} ref="namaEdit"/></td> 
                    <td><input type="number" ref="tahunEdit" defaultValue={tahun} /></td>  
                    <td> <input type="text" defaultValue={description} ref="descEdit"/></td>
                    
                    <td><input className="btn btn-primary" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)} /></td>
                    <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({ idSelectedtoEdit: 0 })} /></td>
                </tr> 
                )
        })
        return listJSXProduk;
    }
      
    render() {
        return (          
           
            <div className="container-fluid">
            <div className="row" >
            <div className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">List Movie</h2>
            </div>
                </div>
                <center>
           
            <table>   
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Tahun</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyProduk()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><input type="text" ref="namaAdd" placeholder="Masukkan nama movie"/></td>
                            <td><input type="number" ref="tahunAdd" placeholder="Tahun"/></td>
                            <td><input ref="descAdd" placeholder="Masukkan Deskripsi Movie"/></td>
                            <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                </center>
       
            </div>
           
            
            )
    }
}
        
 
export default ManageMovie;
import React, { Component} from 'react'
import axios from 'axios';
import '../index.css'
import '../Support/CSS/produk.css'

class ManageCategory extends Component {
    state = { listCat: [], idSelectedtoEdit: 0}

    componentDidMount() {
       this.getProdukList();
      }

    getProdukList = () => {
        axios.get('http://localhost:2019/categorylist')
            .then((res) => {
            console.log(res.data)
            this.setState({listCat: res.data, idSelectedtoEdit: 0})
        }).catch((err) => {
            console.log (err)
        })
    }
            
    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        
        axios.post('http://localhost:2019/addcategory', {
            nama
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

        axios.put('http://localhost:2019/editcategory/'+id, {
            nama
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
        
        var listJSXProduk = this.state.listCat.map(({ id, nama }) => {
            if(id !== this.state.idSelectedtoEdit) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.setState({ idSelectedtoEdit: id })} /></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                    </tr> 
                    )
            }
            
            return (
                <tr>
                    <td>{id}</td>
                    <td><input type="text" defaultValue={nama} ref="namaEdit"/></td>                    
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
            <h2 className="section-heading text-uppercase">List Category</h2>
            </div>
                </div>
                <center>
           
            <table>   
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
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
        
 
export default ManageCategory;
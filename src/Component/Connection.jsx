import React, {Component} from 'react';
import axios from 'axios';
import '../index.css'
import '../Support/CSS/produk.css'


class Connection extends Component{
    state = {listConnection: [], selectedEditProductId: 0}

    componentDidMount(){
        axios.get('http://localhost:2019/connectionlist')
        .then((res)=>{
        this.setState({listConnection:res.data})
        })
    }

    onBtnAddClick = () => {
        axios.post('http://localhost:2019/addconnection', {
            namaMovie: this.refs.AddNamaMovie.value,
            NamaCategory: this.refs.AddNamaCategory.value,
                      })
        .then((res) => {
            alert("Add Movie Success")
            this.setState({listCategory:res.data})
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure to delete?')) {
            axios.delete('http://localhost:2019/deletecategory/' + id)
            .then((res) => {
                alert('Delete Success');
                this.setState({ listConnection: res.data })
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }
    renderConnectionList = () => {
        var listJSX = this.state.listConnection.map((item) => {
             
            return (
                <tr>
                    <td>{item.nama}</td>
                    <td>{item.nama}</td>
                    <td><input type="button" class="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                </tr>
        )})
        return listJSX;
    }
    
    render(){
        return(
            <div>
            <center>
                <h1>Connection List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nama Movie</th>
                            <th>Nama Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderConnectionList()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><input type="text" ref="AddNamaMovie" placeholder="Masukan Nama Movie"/></td>
                            <td><input type="text" ref="AddNamaCat" placeholder="Masukan Nama Category"/></td>
                            <td><input type="button" class="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                        </tr>
                    </tfoot>
                </table>
            </center>
            </div>
        )
    }
}

export default Connection;
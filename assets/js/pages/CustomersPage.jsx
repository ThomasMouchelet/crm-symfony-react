import React, {useEffect, useState} from 'react'
import Pagination from '../components/Pagination'
import CustomersAPI from "../services/customersAPI"

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")

    const fetchCustomers = async () => {
        try{
            const data = await CustomersAPI.findAll()
            setCustomers(data)
        }catch(error){
            console.log(error.response)
        }
    }

    useEffect(()=>{
        fetchCustomers()
    },[])

    const handleDelete = async (id) => {
        
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id != id))

        try{
            await CustomersAPI.deleteCustomer(id)
        }catch(error){
            console.log(error.response)
            setCustomers(originalCustomers)
        }
    }

    const handleSearch = (event) => {
        const value = event.currentTarget.value
        setSearch(value)
        setCurrentPage(1)
    }

    const filterredCustomers = customers.filter(c => 
            c.firstName.toLowerCase().includes(search.toLowerCase()) || 
            c.lastName.toLowerCase().includes(search.toLowerCase()) || 
            c.email.toLowerCase().includes(search.toLowerCase()) || 
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
        )
    
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const itemsPerPage = 10
    const paginatedCustomers = Pagination.getData(filterredCustomers,currentPage,itemsPerPage)

    return ( 
        <>
            <h1>Liste des clients</h1>

            <div className="form-group">
                <input onChange={handleSearch} value={search} type="text" className="form-control" placeholder="Recherhcer..."/>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCustomers.map(customer => {
                        
                        return(
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>
                                    <a href="">
                                        {customer.firstName} {customer.lastName}
                                    </a>
                                </td>
                                <td>{customer.email}</td>
                                <td>{customer.company}</td>
                                <td className="text-center">
                                    <span className="badge badge-primary">{customer.invoices.length}</span>
                                </td>
                                <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(customer.id)}
                                        disabled={customer.invoices.length > 0} 
                                        className="btn btn-sm btn-danger"
                                    >
                                        supprimer
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {itemsPerPage < filterredCustomers.length && <Pagination 
                currentPage={currentPage} 
                itemsPerPage={itemsPerPage} 
                length={filterredCustomers.length}
                onPageChange={handlePageChange}
            />}
        </>
     );
}
 
export default CustomersPage;
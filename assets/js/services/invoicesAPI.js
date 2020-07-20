import axios from "axios"

function findAll(){
    return axios.get('https://127.0.0.1:8000/api/invoices')
            .then(response => response.data["hydra:member"])
}

function deleteInvoice(id){
    return axios.delete(`https://127.0.0.1:8000/api/invoices/${id}`)
        .then(response => console.log(`La facture numéro ${id} a bien été supprimée`))
}

export default{
    findAll,
    deleteInvoice
}
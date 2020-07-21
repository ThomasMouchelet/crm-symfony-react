import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import invoicesAPI from "../services/invoicesAPI";
import moment from "moment";
import { Link } from "react-router-dom";

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "info",
  CANCELLED: "danger",
};

const InvoicesPage = (props) => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchInvoices = async () => {
    try {
      const data = await invoicesAPI.findAll();
      setInvoices(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDelete = async (id) => {
    const originalInvoices = [...invoices];

    setInvoices(invoices.filter((invoice) => invoice.id != id));

    try {
      await invoicesAPI.deleteInvoice(id);
    } catch (error) {
      console.log(error);
      setInvoices(originalInvoices);
    }
  };

  const handleEdit = () => {};

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  };

  const filterredInvoices = invoices.filter(
    (i) =>
      i.status.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.company.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 10;
  const paginatedInvoices = Pagination.getData(
    filterredInvoices,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Liste des factures</h1>
        <Link to="/invoices/new" className="btn btn-primary">
          Ajouter une facture
        </Link>
      </div>

      <div className="form-group">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          className="form-control"
          placeholder="Recherhcer..."
        />
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>id</th>
            <th>Client</th>
            <th>Date</th>
            <th className="text-center">Montant</th>
            <th className="text-center">Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map((invoice) => {
            return (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>
                  <Link to={`/invoices/${invoice.id}`}>
                    {invoice.customer.company}
                  </Link>
                </td>
                <td>{moment(invoice.sentAt).format("DD/MM/YYYY")}</td>
                <td className="text-center">
                  {invoice.amount.toLocaleString()} €
                </td>
                <td className="text-center">
                  <span
                    className={`badge badge-${STATUS_CLASSES[invoice.status]}`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(invoice.id)}
                    className="btn btn-sm btn-primary"
                  >
                    Editer
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(invoice.id)}
                    className="btn btn-sm btn-danger"
                  >
                    supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {itemsPerPage < filterredInvoices.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filterredInvoices.length}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default InvoicesPage;

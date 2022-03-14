import React, { Component, useState } from "react";
import { Switch, Route , Link } from "react-router-dom";
import Table from "app/page/common/table";
import ListGroup from "app/page/common/listGroup";
import AllProducts from "app/page/admin/admin-page/allProducts";
import { icons } from "assets/icons/icons-svg";
import { Toasts } from "../common/toasts/toasts";
import "./styles/containerAdmin.scss";

class ContainerAdmin extends Component {
  columns = {
    order: [
      { value: "_id", label: "id" },
      { value: "customer", label: "customer name" },
      { value: "products", label: "product name" },
      { value: "date", label: "date" },
      { value: "state", label: "state" },
      {
        key: "1233",
        content: (item) => (
          <div
            onClick={() => {
              return this.props.onDelete(item, "orders");
            }}
            className=" btn-delete"
          >
            {icons.iconDelete}
          </div>
        ),
      },
    ],
    allProducts: [
      { value: '_id', label: "Id" },
      { value: 'title', label: "Title" },
      { value: 'content', label: "Content" },
      {
        key: "13233",
        content: (item) => (
          <Link
            to={`/admin/all-products/${item._id}`}
            className=" btn-edit"
          >
            {icons.iconEdit}
          </Link>
        ),
      },
      {
        key: "6233",
        content: (item) => (
          <div
            onClick={() => {
              return this.props.onDelete(item, "products");
            }}
            className=" btn-delete"
          >
            {icons.iconDelete}
          </div>
        ),
      },
    ]
  };

  render() {
    const { products, orders , onCreate } = this.props;

    return (
      <main className="container container-admin">
        <ListGroup />
        <Switch>
          <Route
            path="/admin/table-order"
            render={(props) => (
              <Table
                heading={"Đơn Hàng"}
                columns={this.columns.order}
                data={orders}
                {...props}
              />
            )}
          />
          <Route
            path="/admin/all-products"
            render={(props) => (
              <AllProducts
                products={products}
                columns={this.columns.allProducts}
                onCreate={onCreate}
                {...props}
                onDelete={this.props.onDelete}
              />
            )}
          />
        </Switch>
      </main>
    );
  }
}

export default ContainerAdmin;

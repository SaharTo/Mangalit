import React, { Component } from "react";
import styles from "./admin.module.css";
import { AddMeat } from "../helpers/addMeat";
import { EditMeat } from "../helpers/editMeat";
import { DeleteMeat } from "../helpers/deleteMeat";

export class Admin extends Component {
  state = {
    page: null,
  };

  componentDidMount() {
    this.setState({ page: "add" });
  }

  handleChange({ target }) {
    this.setState({ page: target.value });
  }

  render() {
    const { page } = this.state;
    if (!page) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl" className={styles.admin}>
        <label htmlFor="page" className={styles.pageLabel}>
          בחירת דף
          <select
            className={styles.pageSelect}
            id="page"
            value={page}
            onChange={this.handleChange.bind(this)}
          >
            <option value="add">add</option>
            <option value="edit">edit</option>
            <option value="delete">delete</option>
          </select>
        </label>
        {page === "add" && <AddMeat />}
        {page === "edit" && <EditMeat />}
        {page === "delete" && <DeleteMeat />}
      </div>
    );
  }
}

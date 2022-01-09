import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./chatbot.module.css";
import { ThemeProvider } from "styled-components";

import ChatBot from "react-simple-chatbot";

// all available props
const theme = {
  background: "#ebe6e6",
  fontFamily: "Arial",
  headerBgColor: "#b89494",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#a08c8c",
  botFontColor: "#fff",
  userBubbleColor: "#c98282",
  userFontColor: "#fff",
};

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      men: "",
      women: "",
      withPitot: "",

      //gender: "", //comment out this 2 lines
      //age: "",
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, men, women, withPitot } = steps;

    this.setState({ name, men, women, withPitot });
  }

  render() {
    const { name, men, women, withPitot } = this.state;
    let meatQuantity = 0;
    if (withPitot.value === "עם") {
      meatQuantity = parseInt(men.value) * 0.6 + parseInt(women.value) * 0.45;
    }
    if (withPitot.value === "בלי") {
      meatQuantity = parseInt(men.value) * 0.7 + parseInt(women.value) * 0.55;
    }
    return (
      <div style={{ width: "100%" }}>
        <h3 dir="rtl">סיכום</h3>
        <table dir="rtl">
          <tbody>
            <tr>
              <td className={styles.td} dir="rtl">
                שם
              </td>
              <td className={styles.td} dir="rtl">
                {name.value}
              </td>
            </tr>
            <tr>
              <td className={styles.td} dir="rtl">
                מספר גברים
              </td>
              <td className={styles.td} dir="rtl">
                {men.value}
              </td>
            </tr>
            <tr>
              <td className={styles.td} dir="rtl">
                מספר נשים
              </td>
              <td className={styles.td} dir="rtl">
                {women.value}
              </td>
            </tr>
            <tr>
              <td className={styles.td} dir="rtl">
                פיתות וסלטים
              </td>
              <td className={styles.td} dir="rtl">
                {withPitot.value}
              </td>
            </tr>
            <tr>
              <td className={styles.total} dir="rtl">
                כמה בשר להביא (ק"ג)
              </td>
              <td className={styles.total} dir="rtl">
                {meatQuantity.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class SimpleForm extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          placeholder="לחץ/י כאן כדי להקליד"
          headerComponent={
            <div className={styles.header} dir="auto">
              מנגלבוט
            </div>
          }
          floatingStyle="right"
          steps={[
            {
              id: "0",
              message:
                "ברוך הבא למנגלית, הצ'אט-בוט שיעזור לך לתכנן את הכמויות לעל האש הבא",
              trigger: "1",
            },
            {
              id: "1",
              message: "מה השם שלך?",
              trigger: "name",
            },
            {
              id: "name",
              user: true,
              trigger: "3",
            },
            {
              id: "3",
              message:
                " שלום {previousValue}  :) , ברשותך, נשאל אותך כמה שאלות בנוגע לעלהאש על מנת לעזור לך עם הכמויות.",
              trigger: "4",
            },
            {
              id: "4",
              message: "?כמה גברים תהיו",
              trigger: "men",
            },
            {
              id: "men",
              user: true,
              validator: (value) => {
                if (isNaN(value)) {
                  return "נא לבחור מספר";
                }
                if (value < 0) {
                  return "נא לבחור מספר חיובי או 0"
                }
                if (value % 1 !== 0) {
                  return "נא לבחור מספר שלם"
                }
                return true;
              },
              trigger: "6",
            },
            {
              id: "6",
              message: "?כמה נשים תהיו",
              trigger: "women",
            },
            {
              id: "women",
              user: true,
              validator: (value) => {
                if (isNaN(value)) {
                  return "נא לבחור מספר";
                }
                if (value < 0) {
                  return "נא לבחור מספר חיובי"
                }
                if (value % 1 !== 0) {
                  return "נא לבחור מספר שלם"
                }
                return true;
              },
              trigger: "8",
            },
            {
              id: "8",
              message: "?האם אתם אוכלים עם פיתות וסלטים",
              trigger: "withPitot",
            },
            {
              id: "withPitot",
              options: [
                { value: "עם", label: "עם", trigger: "10" },
                { value: "בלי", label: "בלי", trigger: "10" },
              ],
            },
            {
              id: "10",
              message: "נפלא, אנחנו עושים לך את החישובים",
              trigger: "review",
            },
            {
              id: "review",
              component: <Review />,
              asMessage: true,
              trigger: "update",
            },
            {
              id: "update",
              message: "?האם תרצה לשנות חלק מהשדות",
              trigger: "update-question",
            },
            {
              id: "update-question",
              options: [
                { value: "כן", label: "כן", trigger: "update-yes" },
                { value: "לא", label: "לא", trigger: "end-message" },
              ],
            },
            {
              id: "update-yes",
              message: "איזה שדה תרצה לשנות?",
              trigger: "update-fields",
            },
            {
              id: "update-fields",
              options: [
                { value: "שם", label: "שם", trigger: "update-name" },
                { value: "גברים", label: "גברים", trigger: "update-men" },
                { value: "נשים", label: "נשים", trigger: "update-women" },
                {
                  value: "פיתות וסלטים",
                  label: "פיתות וסלטים",
                  trigger: "update-withPitot",
                },
              ],
            },
            {
              id: "update-name",
              update: "name",
              trigger: "10",
            },
            {
              id: "update-men",
              update: "men",
              trigger: "10",
            },
            {
              id: "update-women",
              update: "women",
              trigger: "10",
            },
            {
              id: "update-withPitot",
              update: "withPitot",
              trigger: "10",
            },
            {
              id: "end-message",
              message: "תודה שהשתמשת במנגלבוט",
              end: true,
            },
          ]}
        ></ChatBot>
      </ThemeProvider>
    );
  }
}
export default SimpleForm;

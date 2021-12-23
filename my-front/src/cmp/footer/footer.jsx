import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";

export default function Footer() {

    return (
        <div className={styles.footer}>
            <img className={styles.logo} src="https://res.cloudinary.com/manglit/image/upload/v1640106848/assets/logo_nlsu44.png" alt="mangalit" />
            <p> רוצים לדעת עוד? כתבו לנו במייל: themangalit@gmail.com</p>
            <div className={styles.links}>
                <a href="https://www.instagram.com/mangal_it">אינסטגרם</a>
                <a href="https://www.facebook.com/STMangalit">פייסבוק</a>
                <NavLink activeClassName="activeNav" to="/about">
                    אודות
                </NavLink>
            </div>
            <p>&copy; כל הזכויות שמורות </p>
        </div>
    )
}

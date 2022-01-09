import axios from "axios";

export const uploadImg = async(file) => {
    //console.log("inside upload Image");
    const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;

    const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;

    const FORM_DATA = new FormData();
    FORM_DATA.append("file", file);
    FORM_DATA.append("upload_preset", UPLOAD_PRESET);
    try {
        const res = await axios.post(UPLOAD_URL, FORM_DATA);
        return res.data.url;
    } catch (err) {
        console.error("ERROR!", err);
    }
};
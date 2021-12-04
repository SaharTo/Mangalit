// import styles from "./meatInfoTemp.module.css";
import { Card } from "react-bootstrap";
const meatInfo = (props) => {
  //Im not sure if we will use it
  return (
    <Card style={{ width: "18rem" }}>
      {
        //<Card.Img variant="top" src={props.markedMeat.MeatImageUrl} />
      }
      <Card.Body>
        <Card.Title>{props.markedMeat.meatName}</Card.Title>
        <Card.Text>{props.markedMeat.meatDescription}</Card.Text>
        {
          //<Button variant="primary">Go somewhere</Button>
        }
      </Card.Body>
    </Card>
  );
};
export default meatInfo;

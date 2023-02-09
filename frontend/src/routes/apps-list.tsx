import { Col, Row } from "antd";
import CardItem from "../components/card";

function AppsList() {
  return (
    <Row align="stretch" justify="start" gutter={[24, 24]}>

      <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 6 }}>
        <CardItem/>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 6 }}>
        <CardItem/>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 6 }}>
        <CardItem/>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 6 }}>
        <CardItem/>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 6 }}>
        <CardItem/>
      </Col>

    </Row>
  );
}

export default AppsList;

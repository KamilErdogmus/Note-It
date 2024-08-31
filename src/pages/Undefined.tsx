import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Undefined = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100 text-light"
    >
      <Row className="text-center">
        <Col>
          <h1 className="display-1 fw-bold">404</h1>
          <p>Page Not Found</p>
          <p className="mb-4">
            The page you're looking for doesn't exist or has been
            moved.
          </p>
          <Link to="/">
            <Button variant="primary">Go to Homepage</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Undefined;

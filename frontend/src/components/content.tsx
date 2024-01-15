import { Container } from "react-bootstrap";

function Content({ children }) {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}

export default Content;

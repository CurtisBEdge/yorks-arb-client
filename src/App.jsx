import { Container } from "@mui/material";
import Header from "./Header";
import AppRouter from "./AppRouter";

const App = () => {

  return (
    <Container>
    <Header/>
      <AppRouter/>
    </Container>
  );
};

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicketDescription from "./components/TicketDescription";
import Home from "./components/Home";
import "./styles/TopContainer.css";
import { Resources } from "./components/Resources";
import Header from "./components/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div className="header-outer-div">
            <Header />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myTickets"></Route>
            <Route path="/uploadedTickets"></Route>
            <Route
              path="/ticket-description/:id"
              element={<TicketDescription />}
            ></Route>
            <Route path="/learning-resources" element={<Resources />}></Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { MedalsPage } from "./pages/MedalsPage";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [medals, setMedals] = useState([]);

  useEffect(() => {
    fetch("/api/medals")
      .then((data) => data.json())
      .then((data) => setMedals(data));
  }, []);

  return (
    <>
      <ErrorBoundary
        fallback={
          <div className="text-lg mt-32 mx-auto max-w-md text-center">
            Error: We couldn't find your stuff 😢
          </div>
        }
      >
        <MedalsPage medals={medals} />
      </ErrorBoundary>
    </>
  );
}

export default App;

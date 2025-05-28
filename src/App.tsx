import { medalData } from "./features/medals/medal-data";
import { MedalsPage } from "./pages/MedalsPage";

function App() {
  return (
    <>
      <MedalsPage medals={medalData} />
    </>
  );
}

export default App;

import "./App.css";
import { PageLayout } from "./components/PageLayout/PageLayout";
import { Aside } from "./components/Aside/Aside";
import { Main } from "./components/Main/Main";

function App() {
    return (
        <PageLayout>
            <Aside />
            <Main />
        </PageLayout>
    );
}

export default App;

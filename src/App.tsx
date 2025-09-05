import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-serif">
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import { WeatherApp } from './WeatherApp';
import { WeatherProvider } from './provider/WeatherProvider';
import { Navbar } from './components/Navbar';

const queryClient = new QueryClient();


function App() {


  return (
    
      <WeatherProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <article id="main-container">
            <WeatherApp />
          </article>
        </QueryClientProvider>
      </WeatherProvider>
  )
}

export default App

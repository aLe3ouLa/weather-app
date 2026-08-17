
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import { WeatherApp } from './WeatherApp';
import { WeatherProvider } from './provider/WeatherProvider';

const queryClient = new QueryClient();


function App() {


  return (
    <article id="main-container">
      <WeatherProvider>
        <QueryClientProvider client={queryClient}>
          <WeatherApp />
        </QueryClientProvider>
      </WeatherProvider>
    </article>
  )
}

export default App

import './Hero.css';
import { CountryInput } from "./CountryInput";

export const Hero = () => {
   return (<article className="hero">
     <h1>How's the sky is looking today?</h1>
     <CountryInput />
     </article>
   )
}
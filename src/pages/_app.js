import '@/styles/globals.css'

// Internal Import
import { Erc20Provider } from '../../context/NiruTokenIco.js';
import Navbar from '../../components/Navbar/Navbar';
const App = ({ Component, pageProps }) => (
   <Erc20Provider>
      <Navbar />
      <Component {...pageProps} />
   </Erc20Provider>

)
export default App;

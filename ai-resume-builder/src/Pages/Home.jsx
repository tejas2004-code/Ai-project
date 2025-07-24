
import '../Styles/style.css';
import Footer from './footer';
import { Hero } from './hero';
import { Features } from './feature';
import { Templates } from './Templates';


const Home = () => {
  return (
    <div className='home  h-screen bg-[#323946]'>
     <Hero/>
  <Templates/>
     <Features/>
  <Footer/>
    </div>
  )
}

export default Home

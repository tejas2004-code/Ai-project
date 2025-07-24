
import './dashboard.css';
import AddResume from './AddResume';
import UseGetAllResume from '@/CostumHook/UseGetAllResume';
const Dashbord = () => {
  UseGetAllResume();
  return (
    <section className='bg-[#fff] text-black h-screen '>
    <div className='p-10 md:px-20 lg:px-32'> 
 <h2 className='font-bold text-3xl'>My Resume</h2>
 <p>Start Creating Ai resume to your Next job role</p>
 <div className=' mt-5'>
  <AddResume/>
 </div>
    </div></section>
  )
}

export default Dashbord;
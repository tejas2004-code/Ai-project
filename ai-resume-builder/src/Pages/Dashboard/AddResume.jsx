import { Loader, PlusSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate} from 'react-router-dom'
import { useResumeStore } from '../Store/useResumeStore';
import RecentResumeCard from './RecentResumeCard';

const AddResume = () => {
  const [openDailog, setopenDailog] = useState(false);
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const[error,setError]=useState(false);
  const {
    updateTitle,
    Resumetitle,
    experiencelevel,
    updateExperiencelevel,
  } = useResumeStore();

  useEffect(() => {
    console.log("title", Resumetitle,experiencelevel);
  }, [Resumetitle,experiencelevel]);  

  const Create = () => {
    if (!Resumetitle) {
     setError(true);
      return;
    }
    
    setloader(true);
    setTimeout(() => {
      navigate('/resume/create');
      setloader(false);
      setopenDailog(false); 
    }, 1000);
  }

  return (
    <div className='flex '>
      <div 
        className='p-14 py-24 w-60 mr-4 border items-center flex justify-center backdrop-blur-lg bg-[#999]/50 
        rounded-xl h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed' 
        onClick={() => setopenDailog(true)}
      >
        <PlusSquare/>
      </div>
      
      <RecentResumeCard />
      
      <Dialog open={openDailog}>
        <DialogContent className='bg-white text-black'>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add details for your new resume</p>
              
              <Input 
                className='mt-2 placeholder-opacity-5 rounded' 
                onChange={(e) =>{ updateTitle(e.target.value);
                  setError(false);
                } } 
                placeholder='Ex. Full Stack Developer'
                required
              />
              
              <div className="mt-4 space-y-2">
                <Label>Experience Level</Label>
                <RadioGroup 
                  required
                  onValueChange={(value) => updateExperiencelevel(value)}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={true} id="fresher" />
                    <Label htmlFor="fresher">Fresher</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={false} id="experienced" />
                    <Label htmlFor="experienced">Experienced</Label>
                  </div>
                </RadioGroup>
              </div>
              {error && <p className='text-red-500 mt-3'>Please fill in all fields and select your experience level</p>}
              

            </DialogDescription>
            
            <div className='flex justify-end gap-5 '>
              <Button variant='ghost' onClick={() => setopenDailog(false)} className='border-2 rounded'>
                Cancel
              </Button>
              <Button 
                className='text-white rounded' 
                onClick={Create}
              >
                {!loader ? "Create" : <Loader className='animate-spin w-5 text-xl'/>}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume;
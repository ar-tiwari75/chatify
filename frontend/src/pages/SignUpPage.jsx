import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'

function SignUp() {
  const [formData, setFormData] = useState({fullname:'', email:'', password:''})
  const {signup, isSigningUp} = useAuthStore()
  const handleSubmit = (e) => {}
  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className='relative w-full max-w-6xl md:h-[800px] h-[650px]'>
        <BorderAnimatedContainer />
        <div className='w-full flex flex-col md:flex-row'>
          {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              
            </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
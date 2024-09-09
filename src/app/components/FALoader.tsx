

import spinner from '../assets/images/loading.gif'
import Image from 'next/image'
export default function FALoader() {
    return <>
        <div className=' m-auto w-100 d-flex justify-content-center align-center' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Image style={{ width: '30%',height:'5%'}} width={80} height={80} src={spinner} alt='Finosys Loader' />
        </div>
    </>
}
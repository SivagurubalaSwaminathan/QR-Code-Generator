import React, { useState } from 'react'


function App() {
  const [img, setImg] = useState("");
  const [loading , setloading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] =useState("")
 async function generateQR()
  {
   setloading(true);
   try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
   }
   catch(error)
   {
     console.error("Error generating QR Code" , error);
   }
   finally
   {
      setloading(false);
   }
  }
  function downloadQR()
  {
    fetch(img).then((Response)=>Response.blob()).then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="QrCode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error)=>{
      console.error("Error downloading QR Code", error);
    });
    
  }
  return (
    <>
     <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait ....</p>}
      {img && <img src={img} className='qr-code-image' alt='' />}
      <div>
        <label htmlFor='dataInput' className='input-label'>Data for QR Code</label>
        <input type='text' value={qrData} id='dataInput' placeholder='Enter the URL' onChange={(e) =>setQrData(e.target.value)}/>
        <label htmlFor='sizeInput' className='input-label'>Image Size (ex.,150)</label>
        <input type='text'  value ={qrSize}id='sizeInput' placeholder='Enter the Image Size' onChange={(e) =>setQrSize(e.target.value)}/>
        <button className='generate-button' disabled={loading} onClick={ generateQR }>Generate QR Code</button>
        <button className='download-button' onClick={downloadQR}>Download QR Code</button>
        
      </div>
      <p className='footer'>Designed by <a href='https://www.linkedin.com/in/sivagurubala-swaminathan/'>Sivagurubala-Swaminathan </a></p>

     </div>
    </>
    
  )
}

export default App
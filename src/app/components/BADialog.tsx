"use client"
import { tokens } from '@fluentui/react-components';
import { DismissFilled } from '@fluentui/react-icons';
// components/Dialog.tsx
import React from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  handleClick?: () => void;
  body: React.ReactNode;
  title: any,
  width: any,
  btnLabel?: string,
  height?: string,
  extraField?:any,
  extraHeader?:any
}

const BADialog: React.FC<DialogProps> = ({ isOpen, onClose, body, title, width, handleClick, btnLabel, height,extraField,extraHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="backdrop" >
      <div className="dialog" style={{backgroundColor:tokens.colorNeutralBackground1,display:'flex',flexDirection:'column', maxWidth: width ? width : '600px', height: height ? height : '200px' }}>
        <div className='d flex justify-between align-center'>
          <div className='d flex justify-between align-center '>
            <h1 className='text-xl mr-2'>{title}</h1>
            {extraHeader && <h1 className='text-xl mr-2'>{extraHeader}</h1>}
            
          </div>
          <div>

            <h1 onClick={onClose} className='text-xl cursor-pointer'>
              <DismissFilled style={{ fontSize: '25px' }} />
            </h1>
          </div>
        </div>
        {/* ////////body */}
        <div style={{height:title !== 'Confirmation'?'386px':''}}>
          {body}
        </div>
        {/* ////////body */}
       
          <div className='footer'>
            <div className='text-lg'>{extraField}</div>
            <div>
              <button className="close-btn mr-2" onClick={handleClick}>
                {btnLabel ? btnLabel : 'OK'}
              </button>
              <button style={{border:'1px solid black'}} className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
       
      </div>

      <style jsx>{`
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 4000;
        }

        .dialog {
          // background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          // max-width: ${width}
          width: 100%;
          z-index:5000;
            display:flex;
            flex-direction:column;
              // justify-content:end;
              // align-items:end;
        }

        .close-btn {
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
       
        }
          .cancel-btn{
             margin-top: 10px;
          padding: 10px 20px;
          // background-color: #0070f3;
          border:2px solid black;
          color: black;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          }
          .footer{
              display:flex;
              justify-content:space-between;
              align-items:center;
          }
      `}</style>
    </div>
  );
};

export { BADialog };

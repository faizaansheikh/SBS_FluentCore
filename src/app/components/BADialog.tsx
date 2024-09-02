"use client";
import { useState } from 'react';
import { Dialog, DialogType, DialogFooter, DefaultButton, DialogContent } from '@fluentui/react';

const BADialog = (props: any) => {
  const { open, setOpen, close, body, footer, title,width } = props
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div style={{
      width:'600px'
    }}>

      <Dialog
        hidden={!open}
        onDismiss={() => setOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: title,
        }}
        styles={{
          main:{
            // maxWidth: '300px', 
            // minWidth:'300px', 
            width:width?width:'900px'
          }
        }}

        
      >


        <DialogContent>
          {body}
        </DialogContent>


        <DialogFooter>
          {footer}
          <DefaultButton onClick={() => close()} text="Close" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export  {BADialog};

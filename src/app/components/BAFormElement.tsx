"use client"

import BAComponentSwitcher, { formElement } from "./BAComponentSwitcher"


type propsType = {
    model: any,
    setModel: any,
    formElements: any,
    disabledForm?: boolean,

}
const stackStyles = {
    root: {
        width: '100%',
    },
};

const columnStyles = {
    root: {
        backgroundColor: '#0078d4',
        color: 'white',
        padding: 20,
    },
};

export default function BAFormElement(props: propsType) {
    const { model, setModel, formElements, disabledForm } = props;

    return <>
        <div className="grid"  >
            {formElements.map((element: any, index: any) => {
                return <div key={index} className={`col-${element.col}_sm-12`}>
                    <div className="box">
                        <BAComponentSwitcher
                            element={element}
                            model={model}
                            setModel={setModel}
                            rowIndex={index}
                        // disabledForm={disabledForm}
                        />
                    </div>
                </div>


            })}
        </div>
    </>

}

{/* <div className="grid">
       
<div className="col-6_sm-12 ">
  <div className="box">Column 1</div>
</div>
<div className="col-6_sm-12 ">
  <div className="box">Column 2</div>
</div>

</div> */}
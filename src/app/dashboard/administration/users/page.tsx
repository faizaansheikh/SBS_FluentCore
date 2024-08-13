"use client"

import { BAButton } from "@/app/components/BAButton";
import BAFormElement from "@/app/components/BAFormElement";
import BAScreenHeader from "@/app/components/BAScreenHeader";
import { BASetupGrid } from "@/app/components/BASetupGrid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UsersConfig } from "@/app/config/setupConfig";
export default function Users() {
    const router = useRouter();
    const [model, setModel] = useState({
        IsActive: true,
    });
    let formElem = [

        {
            col: 3,
            elementType: "input",
            key: "Password",
            label: "Password",
            type: "password",
            required: true,
        },
        {
            col: 3,
            elementType: "input",
            key: "Designation",
            label: "Designation",
            required: true,
        },


    ];
    return <>
        <div>
            <BASetupGrid
                title={'Users'}
                config={UsersConfig}
                addEdit={
                    (

                        (row: any) => {
                            router.push(`/dashboard/administration/userform`)
                        }
                    )
                }


            />
        </div>
    </>
}


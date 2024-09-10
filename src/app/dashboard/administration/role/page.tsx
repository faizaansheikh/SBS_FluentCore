"use client"
import { BASetupGrid } from "@/app/components/BASetupGrid";
import { RolesConfig } from "@/app/config/setupConfig";
export default function Role() {  
    return <>
        <div>
            <BASetupGrid
                // ControlId={Id}
                title={'Roles'}
                config={RolesConfig}
                FormName={"Roles"}
                module={"Security"}
                primaryKey={"rowID"}
                controller={"Security/Role"}
                path={`/dashboard/administration/roleform`}
            />
        </div>
    </>
}


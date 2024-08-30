"use client"
import { BASetupGrid } from "@/app/components/BASetupGrid";
import { UsersConfig } from "@/app/config/setupConfig";
export default function Users() {  
    return <>
        <div>
            <BASetupGrid
                // ControlId={Id}
                title={'Users'}
                config={UsersConfig}
                FormName={"Users"}
                module={"Security"}
                primaryKey={"rowID"}
                controller={"Security/Users"}
                path={`/dashboard/administration/userform`}
            />
        </div>
    </>
}


"use client"
import { BASetupGrid } from "@/app/components/BASetupGrid";
import { PeriodConfig } from "@/app/config/setupConfig";
export default function Period() {  
    return <>
        <div>
            <BASetupGrid
                // ControlId={Id}
                title={'Period'}
                config={PeriodConfig}
                FormName={"Period"}
                module={"Financials"}
                primaryKey={"rowID"}
                // controller={"Financials/Role"}
                path={`/dashboard/administration/periodform`}
            />
        </div>
    </>
}


"use client"
import { BASetupGrid } from "@/app/components/BASetupGrid";
import {  TaxDetailConfig } from "@/app/config/setupConfig";
export default function TaxDetail() {  
    return <>
        <div>
            <BASetupGrid
                // ControlId={Id}
                title={'Tax Detail'}
                config={TaxDetailConfig}
                FormName={"TaxDetail"}
                module={"Financials"}
                primaryKey={"rowID"}
                // controller={"Financials/Role"}
                path={`/dashboard/administration/periodform`}
            />
        </div>
    </>
}


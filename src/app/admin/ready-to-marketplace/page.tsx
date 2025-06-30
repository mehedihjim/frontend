"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {ReadyToMarketPlaceManage} from "@/app/admin/ready-to-marketplace/ReadyToMarketplaceManage";

const ReadyToMarketplace = () => {
    
    return (
        <DefaultLayout>
            <ReadyToMarketPlaceManage></ReadyToMarketPlaceManage>
        </DefaultLayout>
    )
}

export default ReadyToMarketplace;
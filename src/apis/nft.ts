import httpRequest from "@/request";

export interface saveDeployParams {
    fkActivityId: number;
    walletAddress: string;
    deployNetwork: string;
    contractName: string;
    contractAddress: string;
}

// 获取活动状态
export function apiActivityStatus(id:string) {
    return httpRequest({
        url: `/api/activity/${id}/status`,
        method: "get",
    })
}

// 检查部署
export function apiActivityDeploy(walletAddress:string,deployNetwork:string) {
    return httpRequest({
        url: `/api/check/deploy?walletAddress=${walletAddress}&deployNetwork=${deployNetwork}`,
        method: "get",
    })
}

// 保存合约部署数据
export function apiSaveDeployInfo(params:saveDeployParams) {
    return httpRequest({
        url: `/api/nft/airdrop`,
        method: "post",
        data:params
    })
}
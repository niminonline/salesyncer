
export interface AdminLoginResponse{
    status:string,
    message:string,
    token?:string,
    adminEmail?:string
}

export interface Branch{
    branchName:string,
    branchCode:string,
    location:string,
    
}
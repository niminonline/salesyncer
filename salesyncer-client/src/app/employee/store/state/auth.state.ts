

export interface AuthState{
    email:string|null,
    token:string|null
}
export const initialAuthState:AuthState={
    email: null,
    token:null
}


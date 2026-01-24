export interface User {
    data(data: any): unknown;
    id: number;
    username: string,
    sex: string,
    name: string;
    lname: string;
    fname: string;
    mname: string;
    email: string;
    email_verified_at: string;
    active: boolean;
    role: string;
}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        csrf_token: string;
    };
    categories: string[];
    permissions: string[];
    statuses:Status[]
};


// cateogires
export interface Service {
	data(data: any): unknown;
    id: number;
    name: string;
    description: string;
    active: boolean;
    created_at: Date,
    update_at: Date
}



export interface Template {
	data(data: any): unknown;
    id: number;
    template:string;
    created_at:Date;
    updated_at:Date;
}

export interface PaginateResponse {
    data: any[];
    total: number;

}

export interface AngularPaginatorInstance {
    id?: string;
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
}

export interface Page {
    number: number;
    text: any;
    active: boolean;
}

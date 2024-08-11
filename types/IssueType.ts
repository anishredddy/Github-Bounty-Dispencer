export interface IssueType{
    id: number;
    number: number;
    title: string;
    description: string;
    bounty?: number;
    opened_by: string;
    closed_by?: string;
    url: string; 
    repo?: string;
}
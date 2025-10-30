interface DadataI {
    token: string;
    url: string;

    get(this: DadataI, text: string): Promise<string[]>;
}

export default DadataI;

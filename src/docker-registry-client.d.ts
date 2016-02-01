declare module "docker-registry-client" {

    module Registry {
        function createClientV2(options: any, cb?: Function): Client;

        interface CreateClientOptions {
            name: string;
            username?: string;
            password?: string;
            insecure?: boolean;
        }

        class Client {
            listTags(callback: (err: Error, result: {
                name: string,
                tags: string[]
            }) => void): void;
            close(): void;
        }
    }

    export = Registry;
}
// This file is auto-generated. Do not edit manually.
export type MethodsPermissions = {
    accounts: {
        create: boolean;
        read: boolean;
        list: boolean;
    };
    balances: {
        read: boolean;
        update: boolean;
        self: {
            read: boolean;
            update: boolean;
        };
    };
    collections: {
        create: boolean;
        read: boolean;
        items: {
            add: boolean;
            read: boolean;
            remove: boolean;
        };
        metadata: {
            update: boolean;
        };
    };
    groups: {
        create: boolean;
        read: boolean;
        delete: boolean;
        accounts: {
            add: boolean;
            remove: boolean;
            read: boolean;
        };
    };
    images: {
        create: boolean;
        read: boolean;
    };
    operations: {
        create: boolean;
        read: boolean;
        metadata: {
            update: boolean;
        };
    };
    pipelines: {
        create: boolean;
        read: boolean;
    };
    poses: {
        create: boolean;
        read: boolean;
        update: boolean;
    };
    stacks: {
        create: boolean;
        read: boolean;
        items: {
            add: boolean;
            remove: boolean;
        };
        metadata: {
            update: boolean;
        };
    };
    resources: {
        access: {
            read: boolean;
            grant: boolean;
            revoke: boolean;
            attach: boolean;
            detach: boolean;
        };
    };
    storage: {
        create: boolean;
        delete: boolean;
        read: boolean;
        update: boolean;
    };
};
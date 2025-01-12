export interface SDKOptions {
    authToken: () => string | Promise<string>;
    endpoint?: string;
}

export type ListProps = {
    cursor?: string;
    limit?: number;
    orderBy?: 'createdAt_ASC' | 'createdAt_DESC' | 'updatedAt_ASC' | 'updatedAt_DESC';
};

// ------------------------------------------------------------
// METHODS PERMISSIONS START
// ------------------------------------------------------------

type Add = { add: boolean };
type Remove = { remove: boolean };

type Create = { create: boolean };
type Delete = { delete: boolean };
type Read = { read: boolean };
type Update = { update: boolean };

export interface MethodsPermissions {
    access: Add & Read & Remove;
    accounts: Create & Read;
    balances: Read &
        Update & {
            self: Read & Update;
        };
    collections: Create &
        Read &
        Update & {
            children: Add & Read & Remove;
            parents: Add & Read & Remove;
            stacks: Add & Remove;
        };
    groups: Create &
        Read &
        Delete & {
            accounts: Add & Remove & Read;
        };
    images: Create & Read;
    operations: Create &
        Read & {
            metadata: Update;
        };
    pipelines: Create & Read & Update;
    poses: Create & Read;
    stacks: Create &
        Read & {
            operations: Add & Remove;
            metadata: Update;
        };
    storage: Create & Delete & Read & Update;
}

// ------------------------------------------------------------
// METHODS PERMISSIONS END
// ------------------------------------------------------------

import { defaultPermissions } from './permissions';
import * as jose from 'jose';
import { MethodsPermissions } from '../autogenerated/permissions';

const createPrivateKey = (key: string) => {
    const header = `-----BEGIN PRIVATE KEY-----\n`;
    const footer = `\n-----END PRIVATE KEY-----`;

    // @ts-ignore
    const keyBody = key.match(/.{1,64}/g).join('\n');
    return header + keyBody + footer;
};

const createToken = async (props: {
    appKeyId: string;
    appKeySecret: string;
    expiresInSeconds: number;
    payload: jose.JWTPayload;
}) => {
    const alg = 'RS256';
    const pkcs8 = createPrivateKey(props.appKeySecret);
    const privateKey = await jose.importPKCS8(pkcs8, alg);

    return await new jose.SignJWT(props.payload as any)
        .setIssuedAt()
        .setExpirationTime(`${props.expiresInSeconds}s`)
        .setProtectedHeader({ alg, kid: props.appKeyId })
        .sign(privateKey);
};

const serializePermissions = (permissions: MethodsPermissions): string[] => {
    const result: string[] = [];

    const traverse = (obj: any, path: string[] = []) => {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'boolean' && value === true) {
                result.push(path.concat(key).join(':'));
            } else if (typeof value === 'object') {
                traverse(value, path.concat(key));
            }
        }
    };

    traverse(permissions);
    return result;
};

export const createTokenSigner = (options: { appId: string; appKeyId: string; appKeySecret: string }) => ({
    createAccountToken: async (props: {
        accountId: string;
        expiresInSeconds: number;
        permissions?: Partial<MethodsPermissions>;
    }) =>
        createToken({
            appKeyId: options.appKeyId,
            appKeySecret: options.appKeySecret,
            expiresInSeconds: props.expiresInSeconds,
            payload: {
                iss: options.appId,
                permissions: serializePermissions({ ...defaultPermissions, ...(props.permissions ?? {}) }),
                sub: props.accountId,
            },
        }),
    createRootToken: async (props: { expiresInSeconds: number }) =>
        createToken({
            appKeyId: options.appKeyId,
            appKeySecret: options.appKeySecret,
            expiresInSeconds: props.expiresInSeconds ?? 3600,
            payload: {
                iss: options.appId,
                permissions: ['*'],
            },
        }),
});

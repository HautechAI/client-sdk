import { AccountsApi } from '../../autogenerated';
import { ClientSDKOptions } from '../../types';
import { useAutogeneratedAPI } from '../api';

const accounts = (options: ClientSDKOptions) => {
    const api = useAutogeneratedAPI({ API: AccountsApi, options });
    return {
        create: async (props: { alias?: string } = {}) =>
            api.call({
                run: (methods) => methods.accountsControllerCreateAccountV1({ alias: props.alias }),
            }),
        get: async (props: { id: string }) =>
            api.callWithReturningUndefinedOn404({
                run: (methods) => methods.accountsControllerGetAccountV1(props.id),
            }),
        getByAlias: async (props: { alias: string }) =>
            api.callWithReturningUndefinedOn404({
                run: (methods) => methods.accountsControllerGetAccountByAliasV1(props.alias),
            }),
    };
};

export default accounts;

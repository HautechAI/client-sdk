import { BalancesApi } from '../../autogenerated';
import { SDKOptions } from '../../types';
import { useAutogeneratedAPI } from '../api';

const balances = (options: SDKOptions) => {
    const api = useAutogeneratedAPI({ API: BalancesApi, options });
    return {
        add: async (props: { accountId: string; amount: string }): Promise<void> =>
            api.call({
                run: (methods) => methods.balancesControllerAddBalanceV1(props.accountId, { amount: props.amount }),
            }),
        get: async (): Promise<string> =>
            api.call({
                run: (methods) => methods.balancesControllerGetBalanceForSelfV1(),
                transform: (data) => data.balance,
            }),
        getByAccountId: async (props: { accountId: string }): Promise<string> =>
            api.call({
                run: (methods) => methods.balancesControllerGetBalanceV1(props.accountId),
                transform: (data) => data.balance,
            }),
    };
};

export default balances;

import { ClientSDKOptions } from '../../types';
import {
    AddAccountToGroupControllerParamsDtoRoleEnum,
    GroupsApi,
    RemoveAccountFromGroupControllerParamsDtoRoleEnum,
} from '../../autogenerated';
import { useAutogeneratedAPI } from '../api';

const groups = (options: ClientSDKOptions) => {
    const api = useAutogeneratedAPI({ API: GroupsApi, options });
    return {
        accounts: {
            add: async (props: {
                accountId: string;
                groupId: string;
                role: AddAccountToGroupControllerParamsDtoRoleEnum;
            }): Promise<void> =>
                api.call({
                    run: (methods) =>
                        methods.groupsControllerAddAccountV1(props.groupId, {
                            accountId: props.accountId,
                            role: props.role,
                        }),
                }),
            remove: async (props: {
                accountId: string;
                groupId: string;
                role: RemoveAccountFromGroupControllerParamsDtoRoleEnum;
            }): Promise<void> =>
                api.call({
                    run: (methods) =>
                        methods.groupsControllerRemoveAccountV1(props.groupId, {
                            accountId: props.accountId,
                            role: props.role,
                        }),
                }),
        },
        create: async () =>
            api.call({
                run: (methods) => methods.groupsControllerCreateGroupV1(),
            }),
        delete: async (props: { id: string }): Promise<void> =>
            api.call({
                run: (methods) => methods.groupsControllerDeleteGroupV1(props.id),
            }),
        get: (props: { id: string }) =>
            api.callWithReturningUndefinedOn404({
                run: (methods) => methods.groupsControllerGetGroupV1(props.id),
            }),
    };
};

export default groups;

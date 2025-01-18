import { SDKOptions, ListProps, ListResponse } from '../../types';
import { StackEntity, StacksApi } from '../../autogenerated';
import { useAutogeneratedAPI } from '../api';
import { transformToListResponse } from '../transformers';

const stacks = (options: SDKOptions) => {
    const api = useAutogeneratedAPI({ API: StacksApi, options });
    return {
        create: async (props: { metadata?: any } = {}): Promise<StackEntity> =>
            api.call({
                run: (methods) =>
                    methods.stacksControllerCreateStackV1({
                        metadata: props.metadata,
                    }),
            }),
        get: async (props: { id: string }): Promise<StackEntity | undefined> =>
            api.callWithReturningUndefinedOn404({
                run: (methods) => methods.stacksControllerGetStackV1(props.id),
            }),
        list: async (props: ListProps = {}): Promise<ListResponse<StackEntity>> =>
            api.call({
                run: (methods) => methods.stacksControllerListStacksV1(props.orderBy, props.limit, props.cursor),
                transform: transformToListResponse,
            }),
        operations: {
            add: async (props: { operationIds: string[]; stackId: string }): Promise<void> =>
                api.call({
                    run: (methods) =>
                        methods.stacksControllerAddOperationsV1(props.stackId, { operationIds: props.operationIds }),
                }),
            remove: async (props: { operationIds: string[]; stackId: string }): Promise<void> =>
                api.call({
                    run: (methods) =>
                        methods.stacksControllerRemoveOperationV1(props.stackId, { operationIds: props.operationIds }),
                }),
        },
        updateMetadata: async (props: { id: string; metadata?: any }): Promise<void> =>
            api.call({
                run: (methods) => methods.stacksControllerUpdateMetadataV1(props.id, { overwrite: props.metadata }),
            }),
    };
};

export default stacks;

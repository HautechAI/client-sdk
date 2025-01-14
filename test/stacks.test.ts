import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import { sdk } from './utils';

describe('Stacks', () => {
    it('should create stack', async () => {
        const stack = await sdk.stacks.create();
        expect(stack).toBeDefined();

        const sameStack = await sdk.stacks.get({ id: stack.id });
        expect(sameStack).toEqual(stack);
    });

    it('should list stacks', async () => {
        const stacks = await sdk.stacks.list();
        expect(stacks).toBeDefined();
    });

    it('should add and remove operations to stack', async () => {
        const file = new Blob([fs.readFileSync('./test/image.jpeg')], { type: 'image/jpeg' });

        const image = await sdk.images.createFromFile({ file });
        expect(image).toBeDefined();

        const operation = await sdk.operations.create.generate.v1({
            input: {
                aspectRatio: '1:1',
                imageWeight: 0.5,
                inferenceSteps: 20,
                guidanceScale: 7,
                negativePrompt: 'A ugly image of a cat',
                prompt: 'A beautiful image of a cat',
                productImageId: image.id,
                seed: 123,
                strength: 0.5,
            },
        });
        expect(operation).toBeDefined();

        const stack = await sdk.stacks.create();
        expect(stack).toBeDefined();

        await sdk.stacks.operations.add({ stackId: stack.id, operationIds: [operation.id] });
        await sdk.stacks.operations.remove({ stackId: stack.id, operationIds: [operation.id] });
    });
});

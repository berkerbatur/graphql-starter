import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

import * as path from 'path';

type Config = Parameters<typeof mergeTypeDefs>[1];

export const mergeTypes = (types: any[], options?: { schemaDefinition?: boolean, all?: boolean } & Partial<Config>) => {
    const schemaDefinition = options && typeof options.schemaDefinition === 'boolean'
        ? options.schemaDefinition
        : true;

    return mergeTypeDefs(types, {
        useSchemaDefinition: schemaDefinition,
        forceSchemaDefinition: schemaDefinition,
        throwOnConflict: true,
        commentDescriptions: true,
        reverseDirectives: true
    });
};

const typesArray = loadFilesSync(path.join(__dirname, './typedefs'));

export const typeDefs = mergeTypes(typesArray);

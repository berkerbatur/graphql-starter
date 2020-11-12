import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

import * as path from 'path';

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));

export const resolvers = mergeResolvers(resolversArray);
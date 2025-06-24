import { CheckGroupV2 } from 'checkly/constructs';
import { environments } from '../utils/endpoint-array';

/* Explainer:
Creates array of groups based on available environments and makes them
immediately exportable to other files by referencing apiGroups.<environment>.

We pass minimal configuration to the groups, so that they don't overwrite check
settings.
*/

// Function to create a single group
function createGroup(environmentName: string) {
  return new CheckGroupV2(`${environmentName}-api-group`, {
    name: `API ${environmentName} Group`,
    activated: true,
    tags: [environmentName, 'api', 'cli'],
  });
}

// Export a function that generates groups from an array of environments
export function createGroupsFromEnvironments(environments: string[]) {
  const groups: Record<string, CheckGroupV2> = {};

  for (const env of environments) {
    groups[env] = createGroup(env);
  }

  return groups;
}

// Create groups
export const apiGroups = createGroupsFromEnvironments(environments);

import { CheckGroupV2 } from 'checkly/constructs';

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

// Example usage:
const environments = ['BETA', 'ZS1', 'ZS2'];
export const apiGroups = createGroupsFromEnvironments(environments);

import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';
const resolver = new Resolver();

resolver.define('createStudyProject', async ({payload}) => {
  const { leadAccountId, student1, student2 } = payload;
  var bodyData = {
    description: "Automated study collaboration project",
    key: "STUDY",
    leadAccountId: leadAccountId,
    name: `Study Collab: ${student1} and ${student2}`,
    projectTypeKey: "software",
  };
  try {
    const response = await api.asApp().requestJira(
      route`/rest/api/2/project`, {
      method: "POST",
      headrs: {
        'Accept': "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify(bodyData)
    })

    return response.json();
  } catch(err) {
    console.log(err);
    throw new Error("Creating new Jira project failed");
  }
});

export const handler = resolver.getDefinitions();

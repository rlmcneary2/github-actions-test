import core from "@actions/core";
import { context } from "@actions/github";
import fetch from "node-fetch";

async function main() {
  try {
    // core.info(`context=\n${JSON.stringify(context, null, 2)}`);

    const issueIds = core.getInput("issueIds");
    core.info(`issueIds='${issueIds}'`);

    const ids = issueIds.split(",");

    // If this is from a PR was the PR merged>
    const merged = context.payload.pull_request?.merged;
    core.info(`merged='${merged}'`);

    if (!merged) {
      return;
    }

    const repoId = context.payload.repository?.id;
    const workspaceId = "TODO";

    await Promise.all(ids.map(id => {
      const url = new URL("https://https://api.zenhub.com");
      url.pathname = `/p2/workspaces/${workspaceId}/repositories/${repoId}/issues/${id}/moves`;

      const init = {
        method: "POST"
      };

      const response = await fetch(url, init);
      core.info(`response=\n${JSON.stringify(response, null, 2)}`);
    }));

  } catch (err) {
    core.setFailed(err.message);
  }
}

main();

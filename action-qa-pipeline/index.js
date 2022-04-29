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
    const engineeringWorkspaceId = "60997aff441f2f0011219bc1";
    const qaPipelineId = "Z2lkOi8vcmFwdG9yL1BpcGVsaW5lLzI2ODAzMTE";

    await Promise.all(ids.map(id => {
      const url = new URL("https://https://api.zenhub.com");
      url.pathname = `/p2/workspaces/${engineeringWorkspaceId}/repositories/${repoId}/issues/${id}/moves`;

      const init = {
        body: JSON.stringify({
          pipeline_id: qaPipelineId,
          position: "bottom"
        }),
        headers: {
          "X-Authentication-Token": "85e7967f659573178f3d7cf6bdf6d51a3e723eb03447321d431c1d150fbd491d0eaeb00014ba73ed"
        },
        method: "POST"
      };

      const response = await fetch(url, init);
      core.info(`response[${id}]=\n${JSON.stringify(response, null, 2)}`);
    }));

  } catch (err) {
    core.setFailed(err.message);
  }
}

main();

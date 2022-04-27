import core from "@actions/core";
import { context } from "@actions/github";

function main() {
  try {
    // core.info(`context=\n${JSON.stringify(context, null, 2)}`);

    const issueIds = core.getInput("issueIds");
    const ids = issueIds.split(",");

    core.info(`ids=${JSON.stringify(ids)}`);

    core.setOutput("issueIds", issueIds);
  } catch (err) {
    core.setFailed(err.message);
  }
}

main();

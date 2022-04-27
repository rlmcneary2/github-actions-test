import core from "@actions/core";
import { context } from "@actions/github";

function main() {
  try {
    // core.debug(JSON.stringify(context, null, 2));
    core.info("context=");
    core.info(JSON.stringify(context, null, 2));

    const {
      payload: {
        pull_request: { body },
      },
    } = context;
    core.info(`body='${body}'`);

    const matches = /#[\s]?([1-9]+)/.exec(body);
    core.info(`matches='${JSON.stringify(matches)}'`);

    if (!matches.length) {
      core.setOutput("issueId", "");
      return;
    }

    core.setOutput("issueId", matches[0]);
  } catch (err) {
    core.setFailed(err.message);
  }
}

main();

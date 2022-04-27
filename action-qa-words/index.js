import core from "@actions/core";
import { context } from "@actions/github";

function main() {
  try {
    // core.info(`context=\n${JSON.stringify(context, null, 2)}`);

    const {
      payload: {
        pull_request: { body },
      },
    } = context;
    core.info(`body='${body}'`);

    // const matches = /#([1-9]+)/.exec(body);
    // core.info(`matches=${JSON.stringify(matches)}`);

    // if (matches.length < 2) {
    //   core.setOutput("issueId", "");
    //   return;
    // }

    // Is there a QA word related to the issue #?
    // qa #1234
    // QA bafsllc/clearwater#1234
    const matches = /qa[^\S\r\n]+[\w/]*#([1-9]+)/gi.exec(body);
    core.info(`matches=${JSON.stringify(matches)}`);

    if (matches.length < 2) {
      core.setOutput("issueId", "");
      return;
    }

    core.setOutput("issueId", matches[1]);
  } catch (err) {
    core.setFailed(err.message);
  }
}

main();

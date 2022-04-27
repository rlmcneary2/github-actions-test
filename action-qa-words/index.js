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

    // Is there a QA word related to the issue #?
    // example: "qa #1234"
    // example "QA bafsllc/clearwater#1234"
    const matches = /qa[^\S\r\n]+[\w/]*#([1-9]+)/dgi.exec(body);
    core.info(`matches=${JSON.stringify(matches)}`);

    if (matches?.length < 2) {
      core.setOutput("issueId", "");
      return;
    }

    const arrMatches = Array.from(matches);
    core.info(`arrMatches=${JSON.stringify(arrMatches)}`);

    const issueIds = [];
    while (arrMatches.length) {
      arrMatches.shift();
      issueIds.push(arrMatches.shift());
    }

    core.setOutput("issueIds", issueIds.join(","));
  } catch (err) {
    core.setFailed(err.message);
  }
}

main();

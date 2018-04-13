const JIRA = {
  host: "jira.evbhome.com",
  endpoints: {
    createIssue: "/secure/QuickCreateIssue.jspa?decorator=none",
    formTokens: "/secure/QuickCreateIssue!default.jspa?decorator=none"
  },
  fields: {
    issueType: { bug: 1 },
    environment: { production: "10680", qa: "" },
    priority: { blocker: 0, critical: 1, major: 2, minor: 3, trivial: 4 },
    project: { SUP: { name: "Support Triage", pid: 10011 } }
  }
};

const findLoggedInJiraUser = () =>
  [...document.querySelectorAll("meta")]
    .filter(node => node.name === "ajs-remote-user")
    .map(node => node.content)
    .pop();

const getJiraFormTokens = () => {
  return jiraPost({ endpoint: "formTokens" }).then(r =>
    r.text().then(body => {
      return ({ atl_token, formToken } = JSON.parse(body));
    })
  );
};

const jiraPost = ({ body, headers, endpoint }) => {
  let url = `${JIRA.host}${JIRA.endpoints[endpoint]}`;
  let init = {
    method: "POST",
    headers: {
      Accept: "*/*",
      Connection: "keep-alive",
      ...headers
    },
    credentials: "same-origin",
    mode: "same-origin",
    body: body || ""
  };
  return fetch(url, init);
};

export const createJiraIssueSUP = ({
  assignee,
  components,
  description,
  environment,
  labels,
  priority,
  reporter,
  summary
}) => {
  let tokens;
  jiraPost({ endpoint: "formTokens" }).then(response => {
    response.text().then(body => {
      let { atl_token, formToken } = JSON.parse(body);
      console.log(atl_token, formToken);
    });
  });
  let normalizedFormData = {
    summary,
    description,
    assignee: assignee ? assignee : -1, // -1 appears to be "Automatic"
    reporter: reporter ? reporter : findLoggedInJiraUser(),
    pid: JIRA.fields.project.SUP.pid,
    issuetype: JIRA.fields.issueType.bug,
    priority: JIRA.fields.priority[priority],
    components: components ? components.join(",") : undefined,
    labels: labels ? labels.join(",") : undefined,

    // environment
    customfield_11140:
      JIRA.fields.environment[environment] ||
      JIRA.fields.environment.production,

    // required tokens
    atl_token: "",
    formToken: ""
  };
  let body = Object.keys(normalizedFormData)
    .filter(param => normalizedFormData[param] !== undefined)
    .map(param => `${param}=${normalizedFormData[param]}`)
    .join("&");

  // return jiraPost({
  //   body: encodeURIComponent(body),
  //   endpoint: "createIssue",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  //   }
  // });
};

// EXAMPLE REQUEST HEADERS AND BODY
/*
POST https://jira.evbhome.com/secure/QuickCreateIssue.jspa?decorator=none
Request Headers
Accept:  * /*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.5
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 975
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Cookie: seraph.rememberme.cookie=39311%3A2256ce9bde4c7d790dc6f73f46b6da619ab8805b; JSESSIONID=F615725A17FEDE54FD32919A18950577; atlassian.xsrf.token=BLP5-EU9I-G4CR-MFZ6|a137ee250a7dabca635ab3ac1e6277a2dd62e4c7|lin; jira.editor.user.mode=source
DNT: 1
Host: jira.evbhome.com
Pragma: no-cache
Referer: https://jira.evbhome.com/secure/Dashboard.jspa?selectPageId=13913
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:59.0) Gecko/20100101 Firefox/59.0
X-AUSERNAME: ccummings
X-Requested-With: XMLHttpRequest

REquest Body
pid=10011
&issuetype=1
&atl_token=BLP5-EU9I-G4CR-MFZ6%7Ca137ee250a7dabca635ab3ac1e6277a2dd62e4c7%7Clin
&formToken=5d07b67ec6b404aa63257d6164d96547db2a2d4b
&summary=Ignore+This
&priority=3
&assignee=-1
&reporter=ccummings
&description=Hello%0D%0A*STR*%0D%0A%23+do+stuff%0D%0A%23+do+other+stuff%0D%0A%0D%0A*expected*%3A+stuff%0D%0A*result*%3A+stuff%0D%0A%5Beid%3A%7Chttp%3A%2F%2Fexample.com%5D
&components=14412
&dnd-dropzone=
&labels=bug
&customfield_10024=
&customfield_10140=
&customfield_10242=
&duedate=
&customfield_10340=
&customfield_11140=10680
&customfield_12341=
&fieldsToRetain=project
&fieldsToRetain=issuetype
&fieldsToRetain=priority
&fieldsToRetain=assignee
&fieldsToRetain=reporter
&fieldsToRetain=components
&fieldsToRetain=labels
&fieldsToRetain=customfield_10024
&fieldsToRetain=customfield_10140
&fieldsToRetain=customfield_10242
&fieldsToRetain=duedate
&fieldsToRetain=customfield_10540
&fieldsToRetain=customfield_10340
&fieldsToRetain=customfield_11140
&fieldsToRetain=customfield_12341
*/

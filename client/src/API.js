const api_url = "http://localhost:1337";

export async function listLogEntries() {
  //fetch log entries from backend and return the fetched info as json
  const res = await fetch(`${api_url}/api/logs`);
  return res.json();
}

//create post request to post a new log entry, post just means send the created data to the api
export async function creatLogEntry(entry) {
  const res = await fetch(`${api_url}/api/logs`, {
    method: "post",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return res.json();
}

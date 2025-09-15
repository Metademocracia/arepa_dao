import axios from 'axios';
//import fetch from 'fetch';


/*function getQuery(query, variables) {
  try {


    const limit = 5;


    fetch(process.env.ROUTER_GRAPH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { limit },
      })
    })
      .then(r => r.json())
      .then(data => console.log('data returned:', data));
  } catch (error) {
    console.log("error graph: ", error.toString());
  }
}*/

function getQuery(query, variables) {
  return axios.post(process.env.ROUTER_GRAPH,
    {
      "extensions":{"headers":null},
      "operationName": "MyQuery",
      "query": query,
      "variables": variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
}

function getQueryDaoV2(query, variables) {
  return axios.post(process.env.ROUTER_GRAPH_DAOS,
    {
      "extensions":{"headers":null},
      "operationName": "MyQuery",
      "query": query,
      "variables": variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer 5bbe3f24e298a1443a7876d8269a6504',
      },
    });
}

export default {
  getQuery,
  getQueryDaoV2
}

function fetchGitHubIssues() {
  const API_TOKEN = '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'
  // var url = 'https://api.github.com/repos/octocat/Spoon-Knife/issues';
  var url = 'https://api.github.com/repos/Hemephelus/what-do-i-need/contents/README.md';
  // var url = 'https://api.github.com/repos/octokit/octokit.js/contents/README.md';
  // var url = 'https://api.github.com/repos/Hemephelus/GreedyPig/issues';
  // var url = 'https://api.github.com/repos/Hemephelus/GreedyPig';
  // var url = 'https://api.github.com/repos/Hemephelus/GreedyPig/git/blobs/main/code.js';

  var headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${API_TOKEN}`
  };
  
  var options = {
    'method': 'get',
    'headers': headers
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var responseData = response.getContentText();
  // Logger.log(responseData); // Handle the API response data in the Logs
  var jsonData = JSON.parse(responseData);
  
  // Logger.log(jsonData); // Handle the API response data in the Logs
  console.log(jsonData); // Handle the API response data in the Logs
}
































const fs = require('fs');
const simpleGit = require('simple-git');
const path = require('path');

// Initialize Git
const git = simpleGit();

// File path and content to write
const filePath = path.join(__dirname, 'file.txt');

// Function to write to file, commit, and push
async function makeCommit() {
  // Step 1: Write random content to the file
  const content = `Random content: ${Math.random()}`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Wrote to ${filePath}: ${content}`);

  // Step 2: Add the file to git
  await git.add(filePath);

  // Step 3: Commit with a message
  const commitMessage = `Auto-commit: ${new Date().toISOString()}`;
  await git.commit(commitMessage);
  console.log(`Committed with message: ${commitMessage}`);

  // Step 4: Push to the remote repository
  await git.push('origin', 'main');
  console.log('Pushed to repository');
}

// Run the function every X minutes
setInterval(makeCommit, 5 * 60 * 1000);  // Runs every 5 minutes

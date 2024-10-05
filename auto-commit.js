const fs = require('fs');
const simpleGit = require('simple-git');
const path = require('path');

// Initialize Git
const git = simpleGit();

// File path for logging
const filePath = path.join(__dirname, 'commmit-bot-logs.txt');

// Function to write to file, commit, and push
async function makeCommit() {
  // Step 1: Get current date and time
  const now = new Date();
  const dateTimeString = now.toISOString();

  // Step 2: Add all changed files to git
  await git.add('.');
  console.log('Added all changed files to staging area');

  // Step 3: Commit with a message
  const commitMessage = `Auto-commit: ${dateTimeString}`;
  const commitResult = await git.commit(commitMessage);
  const commitHash = commitResult.commit;
  console.log(`Committed with message: ${commitMessage}`);

  // Step 4: Push to the remote repository
  await git.push('origin', 'main');
  console.log('Pushed to repository');

  // Step 5: Write log entry
  const logEntry = `Commit made at ${dateTimeString}\nPrevious Commit Hash: ${commitHash}\n\n`;
  fs.appendFileSync(filePath, logEntry, 'utf8');
  console.log(`Logged commit information to ${filePath}`);
}

// Get the interval from command line arguments
const intervalArg = process.argv[2];
const intervalMinutes = intervalArg ? parseFloat(intervalArg) : 5; // Default to 5 minutes if no argument provided

if (isNaN(intervalMinutes) || intervalMinutes <= 0) {
  console.error('Please provide a valid positive number for the interval in minutes.');
  process.exit(1);
}

const intervalMilliseconds = intervalMinutes * 60 * 1000; // Convert minutes to milliseconds

console.log(`Commit Bot will commit and push every ${intervalMinutes} minute${intervalMinutes === 1 ? '' : 's'}!`);

// Run the function every X minutes
setInterval(makeCommit, intervalMilliseconds);

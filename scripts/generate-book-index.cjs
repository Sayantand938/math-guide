// File: scripts/generate-book-index.js

const fs = require('fs');
const path = require('path');

// Define the path to your books content and the main index file.
const booksDirectory = path.join(__dirname, '..', 'public', 'books');
const mainIndexPath = path.join(booksDirectory, 'books.json');

console.log('Starting to update book index...');

try {
  // Read the main books.json file to get the basic structure.
  const booksData = JSON.parse(fs.readFileSync(mainIndexPath, 'utf-8'));

  // Loop through each book defined in books.json (e.g., 'ganitprabha').
  for (const book of booksData) {
    console.log(`\nProcessing book: ${book.book} (ID: ${book.id})`);

    // Loop through each chapter for the current book.
    for (const chapter of book.chapters) {
      // Construct the path to the chapter's directory.
      // e.g., public/books/ganitprabha/chapter-12
      const chapterDir = `chapter-${chapter.sl}`;
      const chapterPath = path.join(booksDirectory, book.id, chapterDir);
      
      // Initialize an empty exercises array for the chapter.
      chapter.exercises = [];

      // Check if the chapter directory actually exists.
      if (fs.existsSync(chapterPath)) {
        // Read all files in the chapter directory.
        const files = fs.readdirSync(chapterPath);
        
        // Filter for .json files, remove the extension, and sort them.
        const exercises = files
          .filter(file => file.endsWith('.json'))
          .map(file => file.replace('.json', ''))
          .sort((a, b) => parseFloat(a) - parseFloat(b)); // Sorts "2.1", "2.2", "2.10" correctly

        // If exercises were found, assign them to the chapter object.
        if (exercises.length > 0) {
          chapter.exercises = exercises;
          console.log(`  - Found ${exercises.length} exercises for Chapter ${chapter.sl}: [${exercises.join(', ')}]`);
        } else {
            console.log(`  - No exercises found for Chapter ${chapter.sl}.`);
        }
      } else {
        console.log(`  - Directory not found for Chapter ${chapter.sl}, skipping.`);
      }
    }
  }

  // Write the updated data back to the books.json file with pretty formatting.
  fs.writeFileSync(mainIndexPath, JSON.stringify(booksData, null, 2));

  console.log('\n✅ Successfully updated public/books/books.json!');

} catch (error) {
  console.error('❌ Error updating book index:', error);
  process.exit(1); // Exit with an error code
}
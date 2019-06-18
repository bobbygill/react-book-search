# react-book-search
Search and display books using axios:

This app will display a list of books, based on what users search for.

Display a text input, pre-populated with a value, like “harry potter”.

When the app loads, it will automatically fetch for a list of books based on the value inside of the text input.

The list of books should display the name of the book and a description for each item. Also make sure to display it’s categories. If available, display the thumbnail of the book as well.

Clicking on the title of the book should take you to the external book page.

Allow users to search for different books. Feel free to add a “submit” button.

Once users try to search for new books, reload the items of the page with items that match the current search term.

If no results are found, display a proper message: “no books found for ‘12345678987654326765’”.

While the book list loads, display a loading message or spinner.

# Here's an example request for books with the term "harry potter"
GET https://www.googleapis.com/books/v1/volumes?q=harry potter

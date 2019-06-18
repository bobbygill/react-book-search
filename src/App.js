import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import spinnerImage from "./images/spinner.gif";
import Book from "./Book";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bookTitleInput: "harry potter",
			bookList: [],
			hasFailed: false,
			isLoading: true,
			previousBook: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios
			.get("https://www.googleapis.com/books/v1/volumes?q=harry potter")
			.then(response => {
				console.log("the first response is", response);
				this.setState({
					bookList: response.data.items,
					isLoading: false
				});
				console.log("the state is now", this.state.bookList);
			})
			.catch(error => {
				this.setState({
					hasFailed: true
				});
				console.log("an error as occurred");
			});
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		axios
			.get(
				`https://www.googleapis.com/books/v1/volumes?q=${
					this.state.bookTitleInput
				}`
			)
			.then(response => {
				// console.log("Repsonse", response);
				console.log("response total items is", response.data.totalItems);
				if (response.data.totalItems == 0) {
					this.setState({
						hasFailed: true,
						isLoading: false,
						previousBook: this.state.bookTitleInput
					});
				} else {
					this.setState({
						bookList: response.data.items,
						hasFailed: false,
						isLoading: false
					});
				}
			})
			.catch(error => {
				console.log("is this working?");
				// console.log("book list is", this.state.bookList);
				// console.log("state failed is", this.state.hasFailed);
				console.log(error.toString());
				console.log(this.state.bookList);
				// console.log(this.state.bookList[3].volumeInfo.imageLinks.smallThumbnail);
			});
	}

	render() {
		return (
			<div className="App">
				<form className="App" onSubmit={this.handleSubmit}>
					<input
						name="bookTitleInput"
						value={this.state.bookTitleInput}
						onChange={this.handleChange}
					/>

					<button type="submit">Search</button>
				</form>

				{this.state.hasFailed && (
					<p>no books found for {this.state.previousBook}</p>
				)}

				{this.state.isLoading && <img src={spinnerImage} />}

				{!this.state.hasFailed &&
					this.state.bookList.map(book => {
						return (
							<ul>
								<li key={book}>
									<Book
										title={book.volumeInfo.title}
										url={book.volumeInfo.infoLink}
										category={book.volumeInfo.categories}
										description={book.volumeInfo.description}
									>
										{book.volumeInfo.imageLinks && (
											<img
												src={book.volumeInfo.imageLinks.smallThumbnail}
												alt=""
											/>
										)}
									</Book>
								</li>
							</ul>
						);
					})}
			</div>
		);
	}
}

export default App;

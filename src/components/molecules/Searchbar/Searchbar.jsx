import React, { Component } from 'react';
import Button from 'components/atoms/Button/Button';

class Searchbar extends Component {
    state={
        value: ''
    }
    onInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
  render() {
    const {onSubmit} = this.props
    return (
      <header className="searchbar">
        <form className="form" onSubmit={(e) => onSubmit(e, this.state.value)}>
          <Button type="submit" className="SearchForm-button">
            
          </Button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar

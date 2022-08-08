import React, { Component } from 'react';
import Button from 'components/atoms/Button/Button';
import styles from './SearchBar.module.scss'
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
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={(e) => onSubmit(e, this.state.value)}>
          <Button type="submit">
            
          </Button>

          <input
            className={styles.SearchFormInput}
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

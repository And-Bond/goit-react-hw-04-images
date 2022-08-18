import React, { useState } from 'react';
import Button from 'components/atoms/Button/Button';
import styles from './SearchBar.module.scss';
import proptypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const onInputChange = e => {
    setValue(e.target.value)
  };
  return (
    <header className={styles.Searchbar}>
      <form
        className={styles.SearchForm}
        onSubmit={e => onSubmit(e, value)}
      >
        <Button type="submit"></Button>

        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
};

// class Searchbar extends Component {
//     state={
//         value: ''
//     }
//     onInputChange = (e) => {
//         this.setState({
//             value: e.target.value
//         })
//     }
//   render() {
//     const {onSubmit} = this.props
//     return (
//       <header className={styles.Searchbar}>
//         <form className={styles.SearchForm} onSubmit={(e) => onSubmit(e, this.state.value)}>
//           <Button type="submit">

//           </Button>

//           <input
//             className={styles.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.value}
//             onChange={this.onInputChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
Searchbar.propTypes = {
  onSubmit: proptypes.func,
};
export default Searchbar;

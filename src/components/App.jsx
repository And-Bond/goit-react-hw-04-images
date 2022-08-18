import React, { useState, useEffect,useRef, useCallback } from 'react';
import Searchbar from './molecules/Searchbar/Searchbar';
import ImageGallery from './molecules/ImageGallery/ImageGallery';
import Loader from './molecules/Loader/Loader';
import galleryFetch from '../api';
import Modal from './organism/Modal/Modal';

export const App = () => {
  const [content, setContent] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalLargeImage, setModalLargeImage] = useState('');
  const [loader, setLoader] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputValue, setInputValue] = useState('a');
  
  const onSubmit = (e, currentInputValue) => {
    e.preventDefault();
    setLoader(true);
    setInputValue(currentInputValue);
  };
  
  const firstCall = useRef(true)
 
const makeRender = useCallback((content) => {
  if (pageNumber === 1) {
    setContent(content.hits);
    setSubmitted(true);
    setLoader(false);
  } else {
    setContent(prevContent => {
      return [...prevContent, ...content.hits];
    });
    setSubmitted(true);
    setLoader(false);
  }
},[pageNumber])

  useEffect(() => {
    if(!firstCall.current){
      console.log(firstCall.current)
      galleryFetch(inputValue, pageNumber, 12).then(makeRender);
    }
    if(firstCall.current){
      console.log(firstCall.current)
      firstCall.current = false
    }
    
  }, [inputValue, pageNumber, makeRender]);

  const onModalClick = largeImage => {
    setModalLargeImage(largeImage);
    setModal(true);
  };
  const onEspClick = () => {
    setModalLargeImage('');
    setModal(false);
  };
  const onOverlayClick = () => {
    setModalLargeImage('');
    setModal(false);
  };
  const onLoadMoreClick = () => {
    setPageNumber(prevPageNumber => {
      return prevPageNumber + 1;
    });
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      {loader ? (
        <Loader />
      ) : (
        <ImageGallery
          onLoadMoreClick={onLoadMoreClick}
          onClick={onModalClick}
          content={content}
          submitted={submitted}
        />
      )}
      {modal && (
        <Modal
          largeImage={modalLargeImage}
          onEspClick={onEspClick}
          onOverlayClick={onOverlayClick}
          modal={modal}
        />
      )}
    </div>
  );
};
// export class App extends Component {
//   state = {
//     content: [],
//     submitted: false,
//     modal: false,
//     modalLargeImage: '',
//     loader: false,
//     pageNumber: 1,
//     inputValue: '',
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.inputValue !== this.state.inputValue ||
//       prevState.pageNumber !== this.state.pageNumber
//     ) {
//       return galleryFetch(
//         this.state.inputValue,
//         this.state.pageNumber,
//         12
//       ).then(this.makeRender);
//     }
//   }
//   onSubmit = (e, currentInputValue) => {
//     e.preventDefault();
//     this.setState({
//       loader: true,
//       inputValue: currentInputValue,
//     });
//   };
//   makeRender = content => {
//     if (this.state.pageNumber === 1) {
//       this.setState({ content: content.hits, submitted: true, loader: false });
//     } else {
//       this.setState((prevState) => {
//         return { content: [...prevState.content,...content.hits], submitted: true, loader: false };
//       });
//     }
//   };
//   onModalClick = largeImage => {
//       this.setState({
//         modalLargeImage: largeImage,
//         modal: true,
//       });
//   };
//   onEspClick = () => {
//       this.setState({
//         modalLargeImage: '',
//         modal: false,
//       });
//   };
//   onOverlayClick = () => {
//     this.setState({
//       modalLargeImage: '',
//       modal: false,
//     });
//   };
//   onLoadMoreClick = () => {
//     this.setState(prevState => {
//       return { pageNumber: prevState.pageNumber + 1 };
//     });
//   };

//   render() {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.onSubmit} />
//         {this.state.loader ? (
//           <Loader />
//         ) : (
//           <ImageGallery
//             onLoadMoreClick={this.onLoadMoreClick}
//             onClick={this.onModalClick}
//             content={this.state.content}
//             submitted={this.state.submitted}
//           />
//         )}
//         {this.state.modal && (
//           <Modal
//             largeImage={this.state.modalLargeImage}
//             onEspClick={this.onEspClick}
//             onOverlayClick={this.onOverlayClick}
//             modal={this.state.modal}
//           />
//         )}
//       </div>
//     );
//   }
// }

const APIKEY = '28208261-0bc11edd4d19a6096716e39e6'
async function PixabaySearchFun(searchQuary, pageNumber, pageAmount){
    const defaultUrl = 'https://pixabay.com/api/?'
     return await fetch(`${defaultUrl}q=${searchQuary}&page=${pageNumber}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=${pageAmount}`).then(r => r.json())
}

export default PixabaySearchFun
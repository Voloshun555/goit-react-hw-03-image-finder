import axios from 'axios';



export default async function imgApiService(inputValue, page) {
  const perPage = 12;
  const url = 'https://pixabay.com/api/';
  const API_KEY = '34849127-969aa955091248fba76eeb517';

  const responsive = await axios.get(`${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
      return responsive.data
}